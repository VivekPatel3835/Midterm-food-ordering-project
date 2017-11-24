"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // router.get("/", (req, res) => {
  // //   console.log('in the get cart-items request')
  // // let menu_items = knex
  // // .select("*")
  // // .from("menu_items")
  // // .then((results) => {
  // //   knex
  // //   .select('*')
  // //   .from('cart_items')
  // //   .where('order_id', '1')
  // //   .then((cart) => {
  // //     console.log('*', results, cart, '*')
  // //     res.render('../views/menu.ejs', results)
  // //     });
  // //   });
  // });

  router.post("/", (req, res) => {
    //this outer knex call first adds a order log which will then be used to create a cart item
    knex
    .insert({status: req.body.status, special_message: req.body['special_message'],
      order_phone_number: req.body['order_phone_number'], user_id: req.body['user_id']})
    .into('order_logs')
    .returning('*')
    .then((result) => {
        //this inner knex call now uses the order_logs returned object to create the cart_item
        //as the cart_item uses the order_logs_id as its foreign key to group cart items
        knex
        .insert({quantity: 3, menu_items_id: '5', order_id: '23'})
        .into('cart_items')
        .returning('*')
        .then((results) => {
          res.redirect('http://localhost:8080/menu_items')
        //res.json(results);
      });
    });
  })


      // **the above knex insert returns the order_logs primary key aka id so you can
      // use it to set the order_id foreign key in the cart_items table
      return router;
    }

