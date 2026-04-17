"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES = "7d";

module.exports = async function (fastify, opts) {
  fastify.post("/register", async (req, res) => {
    const { name, email, password, phone, role, location } = req.body;

    if (!name || !email || !password || !phone || !role) {
      return res.code(400).send({ message: "Missing required fields" });
    }

    if (password.length < 8) {
      return res
        .code(400)
        .send({ message: "Password must be at least 8 characters" });
    }

    try {
      const existingUser = await fastify.dbUser`
        SELECT id FROM users WHERE email = ${email}
      `;

      if (existingUser.length > 0) {
        return res.code(409).send({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const [newUser] = await fastify.dbUser`
        INSERT INTO users (name, email, password, phone, role, location, created_at)
        VALUES (${name}, ${email}, ${hashedPassword}, ${phone}, ${role}, ${location || null}, NOW())
        RETURNING id, name, email, role
      `;

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES },
      );

      return res.code(201).send({
        message: "Registration successful",
        token,
        user: newUser,
      });
    } catch (error) {
      fastify.log.error(error);
      return res.code(500).send({ message: "Internal server error" });
    }
  });

  fastify.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.code(400).send({ message: "Email and password are required" });
    }

    try {
      const result = await fastify.dbUser`
        SELECT id, name, email, password, role
        FROM users
        WHERE email = ${email}
      `;

      if (result.length === 0) {
        return res.code(401).send({ message: "Invalid credentials" });
      }

      const user = result[0];
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.code(401).send({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES },
      );

      return res.code(200).send({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      fastify.log.error(error);
      return res.code(500).send({ message: "Internal server error" });
    }
  });
};
