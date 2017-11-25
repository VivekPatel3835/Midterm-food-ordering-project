"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    //this knex query prints the menu items for a particular restaurant
    knex
    .select("*")
    .from("menu_items")
    .then((results) => {
      //this knex query retrieves the items in the corder cart
      knex
      .select('*')
      .from('cart_items')
      .where('order_id', '23')
      .then((myCart) => {
        //this knex query retrieves the menu_item_id from the cart-items
        //then gets the actual details of the food items from the menu_items table
        let subquery = knex.select('menu_items_id').from('cart_items').where('order_id', '23');
        knex
        .select('*')
        .from('menu_items')
        .whereIn('menu_items.id', subquery)
        .leftOuterJoin('cart_items', function() {
            this.on('order_id', '=', 23).on('menu_items_id', 'menu_items.id')
        })
        .then((myOrder) => {
            console.log()
            let params = {results: results,
            myOrder: myOrder,
            myCart : myCart,
            loggedInEmail: req.session.email
            }
            console.log(myOrder);
            res.render("../views/menu.ejs", params);
        })
    })
  });
});
  return router;
}

// select * from menu_items where id in (select menu_items_id from cart_items where (order_id = 23));

// knex.select('*').from('users').leftOuterJoin('accounts', function() {
//   this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
// })
