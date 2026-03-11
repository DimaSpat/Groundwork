"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (req, res) {
    return res.code(204).send();
  });
};
