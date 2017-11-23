"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/restaurants", usersRoutes(knex));


// Home page
app.get("/", (req, res) => {
  res.render("index");
});


    //Signup Get request route
  app.get("/signup", (req, res) => {
      res.render("user_signup");
  });

  // Signup POST request route
  app.post("/signup", (req, res) => {
    // and assign them to values of data in request body
    // Define variables to store and
    // hash the password variable using bcrypt before storing it
    //validate
    // set cookies
    // redirect to home page with user session started
    res.redirect("/");
  });

  //Signin GET request route
  app.get("/signin", (req, res) => {
    // render signin page
    res.render("user_signin");
  });

  //Signin POST request route
  app.post("/signin", (req, res) => {
    // define email and password variables and assign nalues to them from req.body
    // hash the password using bcrypt
    // check if email exists and If email doesnt exist in database, throw error
    //set cookie session
    // redirect to page with signed in user
    res.redirect("/");
    // else, send 404 error
  });


  //signout route
  app.post("/signout", (req, res) => {
    // clear all cookies
    // redirect to homepage
    res.redirect("/signin");
  });


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
