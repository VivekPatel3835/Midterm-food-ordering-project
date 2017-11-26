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

// import cookie-session
const cookieSession = require('cookie-session');
// tell app to use cookie session
app.use(cookieSession({name:"session", keys:['fhjgdjgfjgfg']}));

// Stripe Details

const keyPublishable =  'pk_test_j9hetKgNQ7lkQbWZZqJ2WYuU';
const keySecret = 'sk_test_miPE4OIO0PY1AD4gphlythyq';
const stripe = require("stripe")(keySecret);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu_items");
const cartRoutes = require("./routes/cart_items");
const checkoutRoutes = require("./routes/checkout");// Load the logger first so all (static) HTTP requests are logged to STDOUT
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
app.use("/api/users", usersRoutes(knex));
app.use("/menu_items", menuRoutes(knex));
app.use("/cart_items", cartRoutes(knex));
app.use("/checkout", checkoutRoutes(knex));

// Home page
app.get("/", (req, res) => {
  // declare and pass in user session variable (loggedInEmail) whenever index is rendered
  // This is used in the header to check if user is logged in
  //or can also be used to check this condition anywhere else by first passing templateVars
  let templateVars = {loggedInEmail: req.session.email};
  res.render("index", templateVars);
});


    //Signup Get request route
  app.get("/signup", (req, res) => {
      res.render("user_signup");
  });

  // Signup POST request route
  app.post("/signup", (req, res) => {
    // Define variables to store and
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

// Stripe Charge

app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  });
});


  //signout route
  app.post("/logout", (req, res) => {
    // clear all cookies
    req.session = null;
    // redirect to homepage
    res.redirect("/");
  });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
