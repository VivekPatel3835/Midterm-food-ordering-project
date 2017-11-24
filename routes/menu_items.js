"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
    .select("*")
    .from("menu_items")
    .then((results) => {
      let cart = { quantity: 3, menu_items_id: '2', order_id: '1'};
      console.log('in the menu_items routes file: results -> ', results, cart)
        //res.json(results);
        let params = {res: results,
                      cart: cart}
        res.render("../views/menu.ejs", params);
      });
  });
      return router;
    }

