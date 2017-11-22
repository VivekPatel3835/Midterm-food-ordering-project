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


  // Delete Order POST route
  router.post("/orders/:order_id/delete", (req, res) => {
    //check if user is logged in => if not send err 500
    //define parameters from request.params
    //check if order_id exists in database => if not send err 404 status
    //delete order
    //redirect to view orders page
  });

  // View Order GET route
  router.get("/orders/:order_id", (req, res) => {
    //check if user is logged in => if not send err 500
    //define order_id from request.params
    //check if order_id exists in database => if not send err 404 status
    //ideally only the creator of the order should be able to view the order
    //redirect to view order page or just do ajax request to display order details
  });

  // Update Order POST route
  router.post("/orders/:order_id", (req, res) => {
    //check if user is logged in => if not send err 500
    //define parameters from request.params
    //check if order_id exists in database => if not send err 404 status
    //ideally only the creator of the order should be able to update the order
    //update order
    //redirect to view order page or just do ajax request to update current page
  });

  // Update Order GET route
  router.get("/orders/:order_id/update", (req, res) => {
    //check if user is logged in => if not send err 500
    //define parameters from request.params
    //check if order_id exists in database => if not send err 404 status
    //ideally only the creator of the order should be able to update the order
    //redirect to view order page or just do ajax request to display order details ready for editing
  });




  return router;
}
