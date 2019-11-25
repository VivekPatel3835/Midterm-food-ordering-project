"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    const templateVars = {
      loggedInEmail: req.session.email
    };
    res.render("checkout", templateVars);
  });

  router.post("/", (req, res) => {
    const userEmail = req.session.email;
    let subqueryGetsUserId = knex.select('id').from('users').where('email', userEmail);
    knex('order_logs')
      .where('id', '=', 322)
      .update({
        status: req.body.status,
        special_message: req.body.special_message,
        order_phone_number: req.body.order_phone_number
      })
      .finally();
    res.json({result: true})
  });
  return router;
};




