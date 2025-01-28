const express = require('express');
const admin = require('firebase-admin');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4500;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key.replace(/\\n/g, '\n'), // Fix for private key formatting
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: 'googleapis.com',
  }),
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint to send notifications
app.post('/send-notification', async (req, res) => {
  const { recipientToken , title, message } = req.body;

  // Validate request body
  if (!recipientToken || !message) {
    return res.status(400).send('Missing required fields: recipientToken or message');
  }

  const payload = {
    notification: {
      title: title, 
      body: message,
    },
    token: recipientToken,
  };

  try {
    await admin.messaging().send(payload);
    res.status(200).send('Notification sent successfully ✅');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send(`Failed to send notification ⛔: ${error.message}`);
  }
});

app.get("/", (req, res) =>
  res.send("Email OTP server running successfully ✅")
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});