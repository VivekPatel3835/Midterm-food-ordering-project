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
      let params = {
        results: results,
        loggedInEmail: userEmail
      }
      res.render("../views/menu.ejs", params);

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




