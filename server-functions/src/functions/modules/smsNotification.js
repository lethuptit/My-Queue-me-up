require("dotenv").config();
const express = require('express');

const TWILIO_ACCOUNT_SID = 'AC6e9ab5217038d9d45ee2e8fb7ceeb45f'
const TWILIO_AUTH_TOKEN = 'cba5426f7edc8ab05f5ed816de8cc4f2'
const TWILIO_PHONE_NUMBER = '+17624224677'

const router = express.Router();

router.post('/', (req, res) => {

  const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID || TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN || TWILIO_AUTH_TOKEN
  );
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER || TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ status: 'sucess' }));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: "fail",
        error: error.message,
      });
    });
});


module.exports = router;
