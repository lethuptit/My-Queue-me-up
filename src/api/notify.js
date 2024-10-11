import axios from 'axios';
import emailjs from 'emailjs-com';

const remoteUrl = 'https://node-server-1.netlify.app/.netlify/functions/api'
const baseURL = process.env.REACT_APP_SERVER_URL||remoteUrl;
//const baseURL = 'http://localhost:5000';
export async function pushNotification(mesTokenId, title, body) {
  try {
    if (!mesTokenId || typeof mesTokenId !== 'string') {
      // throw new Error('Invalid FCM token provided');
      console.error('Invalid FCM token provided')
    }

    console.log("Sending web notification")
    title = title || "Queue Me Up Notification"
    body = body || 'Your turn is up, please check in with a volunteer.'
    // const response = await get(baseURL,{tokenId: mesTokenId, title, body});
    const response = await axios.post(`${baseURL}/api/notify`, { tokenId: mesTokenId, title, body });
    if (response) {
      console.log(response)
    }
  } catch (error) {
    console.log("Error in sending notification to guest:", error.message);
    // throw new Error(error)

  }
};

export async function sendSMSNotification(queueName, phone, name) {
  const message = `Hello ${name}. You are waiting for the event ${queueName}. Your turn is up. Please come and check in with a volunteer.`;
  try {
    const response = await axios.post(`${baseURL}/api/message`, { to: phone, body: message })
    if (response) {
      console.log(`Sent sms to ${name} successfully.`, response)
    }
  } catch (error) {
    console.log("Error in sending sms: ", error.message)
  }
}


export async function sendEmail({ queueId, toEmail, toName, subject, message, fromName, fromEmail }) {

  try {
    console.log("Sending email....")
    const response = await axios.post(`${baseURL}/api/email`, { toEmail, toName, subject, message, fromName, fromEmail })
    if (response) {
      console.log(`Sent email to ${toName} successfully.`)
    }
  } catch (error) {
    console.log("Error in sending email: ", error.message)
    //throw new Error(error)
  }
}

export async function sendEmail_1({ queueId, toEmail, toName, subject, message, fromName, fromEmail }) {

  try {
    console.log("Sending email....")
    const templateParams = {
      name: toName,
      message: message,
      toEmail:toEmail

    };

    emailjs.send('service_yd12c44', 'template_1j30hf7', templateParams, '9EzXHbXO26Bv9w36q')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  } catch (error) {
    console.log("Error in sending email: ", error.message)
    //throw new Error(error)
  }
}
