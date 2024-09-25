const express = require('express');
const app = express();

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

const morgan = require('morgan')
// Logging
if (!process.env.IS_TEST_ENV) {
  app.use(morgan('short'));
}

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );

//Static files
app.use(express.static('build'));


const apiRouter = express.Router();

//Setup routers
const notifyRouter = require('./modules/webNotification');
const smsRouter = require('./modules/smsNotification');
const emailRouter = require('./modules/email');
apiRouter.use('/notify', notifyRouter);
apiRouter.use('/message', smsRouter);
apiRouter.use('/email', emailRouter);


module.exports = {apiRouter, app};