"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
    .select("*")
    .from("menu_items")
    .then((results) => {
      console.log('in the menu_items routes file: results -> ', results)
        //res.json(results);
        let params = {res: results}
        res.render("../views/menu.ejs", params);
      });
  });
      return router;
    }

