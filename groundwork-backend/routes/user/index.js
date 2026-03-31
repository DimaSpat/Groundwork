"use strict";

module.exports = async function (fastify, opts) {
  fastify.post("/register", async (req, res) => {
    const { name, email, password, phone, role, location, created_at } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !role ||
      (role === "customer" && !location) ||
      password.length < 8
    ) {
      return res.code(400).send({
        message: "Missing required fields",
      });
    }

    try {
      const existingUser =
        await fastify.dbUser`SELECT id FROM users WHERE email = ${email}`;

      if (existingUser.length > 0) {
        return res.code(409).send({
          message: "Email already registered",
        });
      }

      const result = await fastify.dbUser`
        INSERT INTO users (name, email, password, phone, role, location, created_at)
        VALUES (${name}, ${email}, ${password}, ${phone}, ${role}, ${location || null}, ${created_at})
        RETURNING id, name, email, role
      `;

      return res.code(201).send({
        message: "User registered successfully",
        user: result[0],
      });
    } catch (error) {
      fastify.log.error(error);
      return res.code(500).send({
        message: "Internal server error",
      });
    }
  });

  fastify.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.code(400).send({
        message: "Email and password are required",
      });
    }

    try {
      const result = await fastify.dbUser`
        SELECT id, name, email, password, role FROM users WHERE email = ${email}
      `;

      if (result.length === 0) {
        return res.code(401).send({
          message: "Invalid email or password",
        });
      }

      const user = result[0];

      if (user.password !== password) {
        return res.code(401).send({
          message: "Invalid email or password",
        });
      }

      return res.code(200).send({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      fastify.log.error(error);
      return res.code(500).send({
        message: "Internal server error",
      });
    }
  });
};
