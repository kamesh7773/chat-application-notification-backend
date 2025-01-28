const express = require('express');
const admin = require('firebase-admin');
const serviceAccountKey = require("./config/chat-app-38a98-firebase-adminsdk-n8amw-e764c9aa3b.json");
const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
const serviceAccount = serviceAccountKey;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint to send notifications
app.post('/send-notification', async (req, res) => {
  const { recipientToken, message } = req.body;

  const payload = {
    notification: {
      title: 'New Message',
      body: message,
    },
    token: recipientToken,
  };

  try {
    await admin.messaging().send(payload);
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Failed to send notification');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});