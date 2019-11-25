"use strict";

const express = require('express');
const router = express.Router();
// define an object to be used as holder for all users.
// the value of this object is assigned on the Get users ajax call
let usersObject = {};

const cookieSession = require('cookie-session');

// tell app to use cookie session
router.use(cookieSession({name: "session", keys: ['fhjgdjgfjgfg']}));

//import bcrypt - used to hash plain text password
//received from user into hashed password to be stored in the database
const bcrypt = require('bcrypt');

module.exports = (knex) => {

  // GET routes to list all users
  router.get("/", (req, res) => {
    knex
      .select()
      .from("users")
      .then((results) => {
        res.json(results);
        //assign results onto the usersObject object to make them accessible to the next post route
        usersObject = results;
      });
  });

  // POST route for user signup
  router.post("/", (req, res) => {
    // define variables and grab them from the request body
    let name = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    // hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    let passWordExists = false;
    //check if user already exists first
    for (let user in usersObject) {
      if (email === usersObject[user].email) {
        passWordExists = true;
        res.status(400).send('Email already exists');
      }
    }
    if (!passWordExists) {
      // insert into database the new user
      knex
        .insert({name: name, email: email, password: hashedPassword})
        .into("users")
        .then(function (rows) {
          // console.log(usersObject);
          // create session cookie when user is logged in
          req.session.email = email;
          res.redirect("http://localhost:8080/")
        })
        .catch(function (error) {
          console.error(error);
        });
    }

  });
  // end of POST router

  //Get login route
  router.get("/login", (req, res) => {
    res.redirect("http://localhost:8080/");
  });

  //POST login route
  router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let loggedEmail = "";
    // const hashedPassedword = bcrypt.hashSync(password, 10);
    let found = false;
    // If email doesnt exist in database, throw error
    for (let user in usersObject) {
      if (email === usersObject[user].email && bcrypt.compareSync(password, usersObject[user].password)) {
        loggedEmail = usersObject[user].email;
        found = true;
      }
    }
    if (found) {
      req.session.email = loggedEmail;
      // console.log("successfully logged in")
      res.redirect("http://localhost:8080/");
    } else {
      res.status(404).send('Wrong Credentials!');
    }
  });
  // End of Login route


  return router;
};
