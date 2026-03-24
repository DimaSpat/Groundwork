"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async (req, res) => {
    const result = await fastify.dbUser.query("SELECT * FROM users LIMIT 10");
    return result;
  });

  fastify.post("/register", async (req, res) => {
    console.log("Body:", req.body);
    return res.code(204).send();
  });
};
