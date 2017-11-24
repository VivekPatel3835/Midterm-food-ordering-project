"use strict";

const express = require('express');
const router  = express.Router();
// define an object to be used as holder for all users.
// the value of this object is assigned on the Get users ajax call
let usersObject = {};

const cookieSession = require('cookie-session');

// tell app to use cookie session
router.use(cookieSession({name:"session", keys:['fhjgdjgfjgfg']}));

module.exports = (knex) => {

  // GET routes to list all users
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
        //assign results onto the usersObject object to make them accessible to the next post route
        usersObject = results;
    });
  });

  // POST route for user signup
  router.post("/",(req, res) => {
    // define variables and grab them from the request body
    let name = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    // let storedEmail = usersObject[0].email;

    //check if user already exists first
    for (let user in usersObject){
      if  (email === usersObject[user].email){
        res.status(400).send('Email already exists');
      } else {
            // insert into database the new user
          knex
          .insert({name: name, email: email, password: password})
          .into("users")
          .then(function(rows) {
            // console.log(usersObject);
            // create session cookie when user is logged in
            req.session.email = email;
            res.redirect("http://localhost:8080/")
          })
          .catch(function(error) {
            console.error(error);
          });
        }
      }
    });
    // end of POST router


  return router;
}
