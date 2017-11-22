"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

    //Signup Get request route
  router.get("/signup", (req, res) => {
      res.render("user_signup");
  });

  // Signup POST request route
  router.post("/signup", (req, res) => {
    // Define variables to store and
    // and assign them to values of data in request body
    // hash the password variable using bcrypt before storing it
    //validate
    // set cookies
    // redirect to home page with user session started
    res.redirect("/");
  });

  //Signin GET request route
  router.get("/signin", (req, res) => {
    // render signin page
    res.render("user_signin");
  });

  //Signin POST request route
  router.post("/signin", (req, res) => {
    // define email and password variables and assign nalues to them from req.body
    // hash the password using bcrypt
    // check if email exists and If email doesnt exist in database, throw error
    //set cookie session
    // redirect to page with signed in user
    // else, send 404 error
  });


  //signout route
  router.post("/signout", (req, res) => {
    // clear all cookies
    // redirect to homepage
    res.redirect("/signin");
  });



  return router;
}
