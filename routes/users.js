"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select()
      .where('food_type', 'italian')
      .from("restaurants")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
