const {app, apiRouter} = require('./app.js');
const express = require('express');
const serverless = require("serverless-http");

const router = express.Router();

router.use('/api', apiRouter);
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);