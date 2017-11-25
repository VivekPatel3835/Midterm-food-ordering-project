"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    const userEmail = req.session.email
    knex
    .select("*")
    .from('menu_items')
    .then((results) => {
      // if(req.session.email === undefined) {
      //   throw new Error(403)
      // }
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
                // console.log('myCart -->', myCart)
                //this knex query retrieves the menu_item_id from the cart-items
                //then gets the actual details of the food items from the menu_items table
                let getMenuItemIdsForOrder = knex.select('menu_items_id').from('cart_items').where('order_id', order.id);
                knex
                .select('*')
                .from('menu_items')
                .whereIn('menu_items.id', getMenuItemIdsForOrder)
                .leftOuterJoin('cart_items', function() {
                  this.on('order_id', '=', order.id).on('menu_items_id', 'menu_items.id')
                })
                .then((myOrder) => {
                    // console.log('myOrder -->', myOrder)
                  let params = {results: results,
                    myOrder: myOrder,
                    myCart : myCart,
                    loggedInEmail: req.session.email
                    }
                    res.render("../views/menu.ejs", params);
                })
            })
       })
  })
    .catch((err) => {
      console.error(err)
      res.send('Please log in')
          // redirect to login or show message to login
      })
});
  return router;
}

// sql query:
// select order_logs.id from order_logs where order_logs.user_id in
// (select users.id from users where email in ('alice@doe.com'));

// same query in knex:
    // let subqueryGetsUserId = knex.select('id').from('users').where('email', req.session.email)
    // knex.select('id').from('order_logs').where('user_id', subqueryGetsUserId).then((orderNumber) => {
    //   console.log('myOrderNumber-->', orderNumber)
    // })




