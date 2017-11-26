"use strict";

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
// these phine numbers are defined in .env.
// Substitute with actual numbers and phone number object submited by user in production environment.
const fromNumber = process.env.FROM_NUMBER;
const toNumber = process.env.TO_NUMBER;

module.exports = () => {


  // POST Route to send SMS to restaurent owner
  router.post("/sendsms", (req, res) => {
    // capture message body from submited user form
    let messageText = `
      name: ${req.body.name}
      telephone:${req.body.telephone}
      instruction: ${req.body.description}
    `
    console.log(messageText);
    // Uncomment block below to start sending actuall SMSs
    // client.messages
    // .create({
    //   to: toNumber,
    //   from: fromNumber,
    //   body: messageText,
    // })
    // .then((message) => console.log(message.sid)); //this console logs the msg id of the text message sent to restaurent owner

    console.log("message sent");
    res.status(300).send('Your message has been sent successfully');
  })
  // End of POST route for sending SMS

  // Post route to receive SMS from restaurent owner and send response to customer
  router.post("/receivesms", (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message(`Your order will be ready in ${req.body.Body} mins`);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });
  // End of POST route for receiving SMS and sending response to customer

  return router;
}
