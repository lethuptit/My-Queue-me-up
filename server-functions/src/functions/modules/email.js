const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const express = require('express');
const router = express.Router();

const GMAIL_CLIENT_ID = '1019556721777-iirv53l10b9ecbifapjke1666meresd0.apps.googleusercontent.com'
const GMAIL_CLIENT_SECRET = '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'
const GMAIL_ACCESS_TOKEN = 'ya29.a0AcM612wzgHmQ9Tc1aMdRS5NQu9NSb1owbS-lre9P4tIGIxi393cOdmq1TxwFghTAE7YmmucJZpt31l7mqBjZoOjtpqL5MSbi1cSTQkynQjOq4WE53sn-0OoQkbgQpgbA5jY_6jrU7JuMftHRaYuoi6ZrIrrhkhLusuSzRgaCaCgYKAbkSARASFQHGX2Mi7FMEW7RhxUzNSuR3u8SDuQ0175'
const GMAIL_REFRESH_TOKEN = '1//04APIg7MMcu9mCgYIARAAGAQSNwF-L9IryPChUsw1RYxEBHv2Z79yMxTfvb9QXybevRPEEX92JZA_jf0NIRpSqzU9akR3s2BpaQo'

router.post('/', async (req, res) => {
    const toEmail = req.body.toEmail;
    const fromEmail = req.body.fromEmail;
    const fromName = req.body.fromName;
    const subject = req.body.subject;
    const message = req.body.message;

    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: "queuemeupteam@gmail.com",
            // pass: "WIT_queuemeup",
            clientId: process.env.GMAIL_CLIENT_ID || GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET || GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN || GMAIL_REFRESH_TOKEN
        }
    });

    let content = message;

    const mailOptions = {
        from: `${fromName} <${fromEmail}>`,       
        to: toEmail,
        subject: subject,
        text: content,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                status: 'fail',
                error: error.message,
            });
        } else {
            console.log("Email sent: " + info.response);
            res.send(JSON.stringify({ status: "success" }));
        }
    });

});

module.exports = router;