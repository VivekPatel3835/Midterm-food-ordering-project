"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    const userEmail = req.session.email
    console.log('in the get cart-items request')
      //this knex query gets the order id for the user that is logged in

      let subqueryGetsUserId = knex.select('id').from('users').where('email', userEmail)
      knex.select('id').from('order_logs').where('user_id', subqueryGetsUserId).first().then((order) => {

            // console.log('orderID', order.id)

           //this knex query retrieves the items in the order cart
           knex
           .select('*')
           .from('cart_items')
           .where('order_id', '=' , order.id)
           .then((myCart) => {
                //this knex query retrieves the menu_item_id from the cart-items
                //then gets the actual details of the food items from the menu_items table
                let getMenuItemIdsForOrder = knex.select('menu_items_id').from('cart_items').where('order_id', order.id);
                knex
                .select('*')
                .from('menu_items')
                .whereIn('menu_items.id', getMenuItemIdsForOrder)
                .leftOuterJoin(('cart_items'), function() {
                  this.on('order_id', '=', order.id).on('menu_items_id', 'menu_items.id')
                })
                .then((myOrder) => {
                    // console.log('myOrder -->', myOrder
                    res.json(myOrder)
                    //when you are getting the cart items don't actually render anything
                    //just get the json object and then send it via the result (res.json(...))
                })
            })
       })
  });

  router.post("/", (req, res) => {
   const userEmail = req.session.email
   const menuItemId = req.body.menuItemId
   const subqueryGetsUserId = knex.select('id').from('users').where('email', userEmail)
   const orderQuantity = req.body.orderQuantity

      //this outer knex call first adds a order log which will then be used to create a cart item
      knex
      .insert({status: req.body.status, special_message: req.body['special_message'],
       order_phone_number: req.body['order_phone_number'], user_id: subqueryGetsUserId})
      .into('order_logs')
      .returning('*')
      .then((result) => {
        //the knex call below gets order_logs for a particular user
        knex.select('id').from('order_logs').where('user_id', subqueryGetsUserId).first().then((order) => {
          //this inner knex call now uses the order_logs returned object to get the cart_items
          //as each cart_item uses the order_logs_id as its foreign key/grouping mechanism
          knex
          .insert({quantity: orderQuantity, menu_items_id: menuItemId, order_id: order.id})
          .into('cart_items')
          .returning('*')
          .then((results) => {
           res.json(results)
        });
      })
    })
 })
      // **the above knex insert returns the order_logs primary key aka id so you can
      // use it to set the order_id foreign key in the cart_items table
      return router;
    }

