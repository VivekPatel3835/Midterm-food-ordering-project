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

