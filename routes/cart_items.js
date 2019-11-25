"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    const userEmail = req.session.email;
    //this knex query gets the order id for the user that is logged in
    let subqueryGetsUserId = knex.select('id').from('users').where('email', userEmail);

    knex.select('id').from('order_logs').where('user_id', subqueryGetsUserId).first().then((order) => {
      if (order === undefined) {
        console.log('cannot get cart items as the order log doesnt exist yet')
      } else {
        //this knex query retrieves the items in the order cart
        knex
          .select('*')
          .from('cart_items')
          .where('order_id', '=', order.id)
          .then((myCart) => {
            //this knex query retrieves the menu_item_id from the cart-items
            //then gets the actual details of the food items from the menu_items table
            let getMenuItemIdsForOrder = knex.select('menu_items_id').from('cart_items').where('order_id', order.id);
            knex
              .select('*')
              .from('menu_items')
              .whereIn('menu_items.id', getMenuItemIdsForOrder)
              .leftOuterJoin(('cart_items'), function () {
                this.on('order_id', '=', order.id).on('menu_items_id', 'menu_items.id')
              })
              .then((myOrder) => {
                res.json(myOrder);
                //when you are getting the cart items don't actually render anything
                //just get the json object and then send it via the result (res.json(...))
              })
          })
      }
    })
  });

  router.post("/", (req, res) => {
    const userEmail = req.session.email;
    const menuItemId = Number(req.body.menuItemId);
    const subqueryGetsUserId = knex.select('id').from('users').where('email', userEmail);
    const orderQuantity = req.body.orderQuantity;
    console.log("cart item added", userEmail)
    //knex query below gets the order id for a specific user
    knex
      .select('*')
      .from('order_logs')
      .where('user_id', subqueryGetsUserId)
      .first()
      .then((orderLog) => {
        if (!orderLog) {
          //no order log exists yet - create new one without searching through the database
          return knex.insert([{
            created_at: knex.fn.now(),
            special_message: 'not entered yet',
            status: 'new order log created',
            user_id: subqueryGetsUserId,
            order_phone_number: '00000000'
          }])
            .into('order_logs')
            .returning('*')
        } else {
          //order_log exists - returns the order promise from the enclosing then statement
          console.log('order log exists');
          return [orderLog] //do not remove this array literal as the remainder of the code expects an array.
          //Cannot convert everything to an object as the original select('*').from('order_logs') doesnt work without .first()
        }
      })
      .then((order) => {
        knex
          .distinct('menu_items_id')
          .select('menu_items_id')
          .from('cart_items')
          .where('order_id', '=', order[0].id) //problem here when no log exists becasue it is giving array
          .then((items) => {
            let myMenuItems = items.map((itemNum) => {
              //gets unique menu item ids for a specific order id
              return itemNum.menu_items_id
            });
            if (myMenuItems.indexOf(menuItemId) !== -1) {
              //doesn't add the menu_item as the item is already in the order cart
              console.log('Item was not added as it already exists in the the client\'s order cart')
            } else {
              //insert the menut item to the cart as it doesn't exist in the cart
              knex
                .insert({quantity: orderQuantity, menu_items_id: menuItemId, order_id: order[0].id})
                .into('cart_items')
                .returning('*')
                .then((results) => {
                  res.json(results)
                });
            }
          })
      })
  });

  router.delete('/', (req, res) => {
    const cartItemToDelete = Number(req.body.cart_item_id);
    knex('cart_items')
      .where('cart_items.id', cartItemToDelete)
      .del()
      .returning('*')
      .then((result) => {
        //do not remove this then statement. The delete button will not work without it
      });
    res.json({result: true})
  });
  // **the above knex insert returns the order_logs primary key aka id so you can
  // use it to set the order_id foreign key in the cart_items table
  return router;
};

