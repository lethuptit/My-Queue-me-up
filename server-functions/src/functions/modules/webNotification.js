const express = require('express');
// const sendNotification = require('./FirebaseAdminConfig')
const router = express.Router();

const serviceAccount = require('./fcmServiceAccountKey_queue-app.json');
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



router.post('/', async (req, res) => {
  try {
    console.log("Post request: ", req.body)
    const token = req.body.tokenId;
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid FCM token provided');
    }
    const title = req.params.title;
    const body = req.params.body;

    //await sendNotification(token, mesTitle, mesBody);
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid FCM token provided');
    }
    const message = {
      notification: {
        title: title ? title : 'Queue Me Up Notification',
        body: body ? body : ' Your turn is coming',
      },

      token: token,
    };
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message: ", response);
    res.json({
      status: "success",
    });

  } catch (error) {
    console.error("Error in sending notification: ", error.message);
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
});

module.exports = router;

// app.use("/.netlify/functions/notification", router);
// module.exports.handler = serverless(app);