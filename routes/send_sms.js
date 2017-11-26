"use strict";

// const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').load();
const router  = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const fromNumber = process.env.FROM_NUMBER;
const toNumber = process.env.TO_NUMBER;

module.exports = () => {

  router.post("/", (req, res) => {
    let messageText = {
      name: req.body.name,
      telephone:req.body.telephone,
      instruction: req.body.description
    };
    console.log(messageText);
    console.log("message sent");
    res.status(300).send('Your message has been sent successfully');
  })

  return router;
}
