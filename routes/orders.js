"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  //View all orders
  router.get("/orders", (req, res) => {
    knex
      .select("*")
      .from("orders")
      .then((results) => {
        res.json(results);
    });
  });

    //AddNew Order Get request route
  router.get("/orders/new", (req, res) => {
      res.render("orders_new");
  });

  // AddNew Order POST request route
  router.post("/orders", (req, res) => {
    // Define variables to store and
    // and assign them to values of data in request body
    //validate
    // redirect to view orders page
    res.redirect("/orders");
  });



  return router;
}
