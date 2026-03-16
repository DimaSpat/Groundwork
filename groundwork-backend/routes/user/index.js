"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async (req, res) => {
    const result = await fastify.dbUser.query("SELECT * FROM users LIMIT 10");
    return result;
  });
};
