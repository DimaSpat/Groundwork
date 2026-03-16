"use strict";

const fp = require("fastify-plugin");
const { neon } = require("@neondatabase/serverless");

module.exports = fp(async (fastify, opts) => {
  const sql = neon(process.env.DATABASE_URL);
  fastify.decorate("dbUser", sql);
});
