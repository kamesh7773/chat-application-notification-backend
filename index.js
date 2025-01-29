const express = require("express");
const admin = require("firebase-admin");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4500;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "chat-app-38a98",
    "private_key_id": "fc45907df68b5002fb10c05e994989ab0bf5f1e3",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYkXnrH5GsuaGt\nJb2wb+GDrEmY6Vb2vY89e12jPOOCt6i97Lt81ALcQc7GTGPSPRQvGvMSiCW0s/zz\ntGRmL4hYBdjnKc89vOyM8WbcDM9oynURz1TA091lYR/8SiEOlLrdySIVEGnMzNYj\nQ8l++iLw4ZS2VNijG0VkJ1hgPa500Qy9jEn1qKw7M3w1uEogmEGrxx3NPgSkoc3a\n13fNi5KiXqXyDT+BfFCdEiVupdcyAotKNHJEI9xG8p789RTY9LSli6inpYq3hiRF\nUmEWZttT0CaFUGiYEYEbh8i+l8COYzFsurdMphs/S6jI8v6pRKHUQBs/K85cv+0F\nvUuzJPdDAgMBAAECggEACXcTrcBrzLVIMFJEQOhyq1+/wc1OzbL36n63UfO/7PGm\nSyt0fEDjm9+MoPpx7O6eIcgAZtjBzMKn1u9iP9auFOvpR3oYDIKmgvNNCCor9JqE\nMHfWOw+fJMrQQwTO+opunL4oL6Sw3k73mqt6GjcRfjPjLSakDrEX7n05uzVzF8sc\ngQypfSsgiOPx4GaGjSWCEwfMa6moNHmIayaaXL4sfm+3zcVII1BuE2WKM9Amuwvz\nHCCxORUzhHxvOpFNNw+bXnb0a/LIKziBps24sbxoHmsAVK2Mcu+7vaCYehqznNqO\n8I5TtpFA3Tr4KmFYGNcnJW/+ZystlKG+Q59/EbC3GQKBgQDLOWtLKWn+gl9szTtf\n1psb/E77wKfbkqnJk818vNtzAPl+jIJbOHbrbnnDow9vjMt+SNkqD7dd2JAh55da\nnS7ktYZz5ciBcqDqTWPpWuxfTLNnK9+rTWVOkLgSAFHCviO/U+sOyfDZg2ai3CPH\n4ebkN2Y7hxetV+kZaQX3YOsFOQKBgQDAMGMdg4kRZHgAO69Xd7/Of82hXT+qxxRY\nu1Tlb7VdugrmuR8ahb7MgYLc+Ni+sNS7zFfUFRVIZYKGC5AXVYEs+6NDPrqJAwjp\n9suw3TXM2k5Y4rgp7RDKs+0vTmLYvs59xP1aW7bwq1BswRdMYnuIqj43dZLGeoIq\n/kXDICb8WwKBgH5AG6HEBq8wOywSi9JMNmw6YK8RzrYf9Q7fnYbipMpbTqQJkmot\nN+Om7EpXoJ1CMKExjIgO33GTumb1wxduEtXO18pkdB3HIqSsk2dDLxk9Qy7TGM8I\n8+jNCy1TuXdsPDT+Y0b6uX/HnBmM/UWN16zrpb1RfaoYtR0uG6DFOvwxAoGAICk4\nvNyhGFb+udNDEVkJsO20JHetSs/LuNmIaGicKhYS8u8xpEeTWTenBYFjC+4de1vD\nqsroZ9gM0o+myjDV0AhAFuWtY3YtjLFu/qbV9PTnPXqbJPD16WXYoBz275xmg6du\nWiuU3otchwZ89pxYXdNXXAKB0FL562XnmLKNs5cCgYAlAF/YQ1a79bxZewpb3beN\n0Zu8zzw9csFxCC+iTPxCHn7tzybBVZ2n7OlML80an1XX6lD3z+8W7xOmkZ3G+c20\nYLjnAxBxbA8z4fpbu8K6YzmWr2z26+UGjOW/vTOApCtAJb5WxPYoNGTr8Qq0Bpnw\ntiuKaJQ2x4yQZOllWTW1Bw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-n8amw@chat-app-38a98.iam.gserviceaccount.com",
    "client_id": "101679827910673273877",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n8amw%40chat-app-38a98.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }),
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint to send notifications
app.post("/send-notification", async (req, res) => {
  const { recipientToken, message } = req.body;

  const payload = {
    notification: {
      title: "New Message",
      body: message,
    },
    token: recipientToken,
  };

  try {
    await admin.messaging().send(payload);
    res.status(200).send("Notification sent successfully ✅");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Failed to send notification ❌");
  }
});

app.get("/", (req, res) =>
  res.send("Notification server running successfully ✅")
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
