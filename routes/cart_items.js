"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {

  });

  router.post("/", (req, res) => {
      //this outer knex call first adds a order log which will then be used to create a cart item
      console.log('inside the router.post /cart_items request cart_items.js file')


      knex
        .insert({status: req.body.status, special_message: req.body['special_message'],
          order_phone_number: req.body['order_phone_number'], user_id: req.body['user_id']})
        .into('order_logs')
        .returning('*')
        .then((result) => {
          //this inner knex call now uses the order_logs returned object to create the cart_item
          //as the cart_item uses the order_logs_id as its foreign key to group cart items
          console.log(result);
          console.log('this is supposed ot be the order_logs_id --> ', result[0].id)
          knex
          .insert({quantity: 3, menu_items_id: '2', order_id: result[0].id})
          .into('cart_items')
          .returning('*')
          .then((results) => {
            console.log('in the cart_items routes file add to cart actions: results -> ', results)
          //res.json(results);
          });
        });
      })

      // **the above knex insert returns the order_logs primary key aka id so you can
      // use it to set the order_id foreign key in the cart_items table




      return router;
    }

