"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // GET routes to list all users
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  // POST route for user signup
  router.post("/",(req, res) => {
    // define variables and grab them from the request body
    let name = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    // insert into database the new user
    knex
    .insert({name: name, email: email, password: password})
    .into("users")
    .then(function(rows) {
      res.redirect("http://localhost:8080/")
    })
    .catch(function(error) {
      console.error(error);
    });
  });

  return router;
}
