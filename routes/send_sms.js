"use strict";

// const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').load();
const router  = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
// require twillio for response
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// Twilio Credentials defined in .env
const authToken = process.env.AUTH_TOKEN;
const accountSid = process.env.ACCOUNT_SID;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);
const fromNumber = process.env.FROM_NUMBER;
const toNumber = process.env.TO_NUMBER;

module.exports = () => {

  router.post("/", (req, res) => {
    let messageText = `
      name: ${req.body.name}
      telephone:${req.body.telephone}
      instruction: ${req.body.description}
    `
    console.log(messageText);

    client.messages
    .create({
      to: toNumber,
      from: fromNumber,
      body: messageText,
    })
    .then((message) => console.log(message.sid));

    console.log("message sent");
    res.status(300).send('Your message has been sent successfully');
  })

  return router;
}
