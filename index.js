const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const app = express();
const cors = require("cors");
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "chat-app-38a98",
    "private_key_id": "fbd90ac93621ae8fdb12f19ecf21cca08b434364",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3i+jrE9A01TXI\nACcZjuLDavvuLblzT15TPtZmugWRVXJRwuugoTzCYEKFraK3USVc0yUKD9KZ3yXZ\nndpjb9/MPfGtwyjcX0xlIPaVypQTDjc57jCvMFO9rNUmdrFW8VQqqkKqSlIavwOQ\naU8QYuaH1a2E2L7S9uXmbTQBM6RkPnb0ClBG9leTnrfMmHSq2lIUDqSTIMPZyqZI\nTnK9ODoUOn9AMMueym4QxVtV+scQ87881gkuJK8nyJtcUDjDxV0+MG/6/R4qLK4Q\n5/3PJIea+mXDf+3iOzC9qusrFhtN/4GhlPviJ9UZNQoh3VxZ5Jlr0vXmXsofS61Y\nyuScOhirAgMBAAECggEASXPpM2JLeUk166L8AsNmxlOjHG8Z/yZtFh1YieW54q5y\nQHwj9bVw7ky9cmfJbVlA/YPWF8+7NS7TI+KDCjY0NrU3aZVnXcGZfgMSC2H1niab\nPUiwHPvXF1n6Nxla4PNU/noCkcmKT//POlSaenFJ1mRRu49N1nlOCcf7/tse16pk\nstynfRlAWNd3LPp/biijI/lRF5m5pw+Sav2IL/dWjkSPRQ1YIkP3nRr9xS2xNQY+\nw7n6FgEozQDW2IJpPm1RiiPdvX1Ez7yjKg2LhGrcGwPpfsVM+lsdARMOpjM/cPWL\nQ4P/MUm1gg7zKnGcPetX+vYFCBkjvaX285HamT18eQKBgQD4NyhQ12gHUR+nV6Mw\nd+Ys8WouhfYWsOm3qL8ihSKadO1ZsC0WXkgQmcp11vIpyGVJuWY211/ne5YQZY8i\n1DnK3nCXvJJ9jFUdNuoWniRibJZwc0ykK7Pe511mxrjnQkYa1Imi+DAMHGDFlyeV\nTCRVI5rnQcAQiF1GwTQjk204XQKBgQC9TYvQqe3H5grotL08Ek/+FetiKNI66Pi7\n/2Il1Q3+wZSj6+/cuqCWDFYBmKbOWroXrA34WSNgBQuCpOgDwy+fxXRQ1jBuBo2P\nNHf/PiKWIs3XAjjkptKGLuR2gm3C56DhQtOz/YyfLw3xYnVKRkfY2a0owJzaOPIz\noAYz5m5kpwKBgCrAlVkXQPvBpUoVdi4q+KJVEozg1foijp7rmcBAXi1sZlVEWv+3\nTYJOeujBFQTNV2TTYh+gCQy95KL+WyEMnMeseIgqGrE1MpPNmZQ7uNibC25i7Zh5\nToneH+BL6h0q9Rg581r2lJABc0mVN2QnsTpY351lXcd7NVWygWB/TBihAoGAIVDa\ngHjHnlzAIsBcZYwbg+47pOTmSvPhgsSpc1sRwXo0PL0zU7eMt5uoL1O8V6jkA3KG\nauTVMvrwUafQJYleglHv7KIll9eTZlann8ZBtAagD20Wsjch6feqwaimxJybVcm7\nFHxVGVbgr1DSr6W601FMBlYPxOAs0CUjslKlrxUCgYEAhz2Iqt7dK24ufd0Oywri\nYSkCv9Pe9+ht5tWOW6K1SmhyzzCHjlumLAcYhSGHXbpn32cxwq9SeuDXadLztmRd\n4G1L0mF083VPlgpYqSeTJTmmcVpjEXaRH4VQFOjoznKcyd+iauM1M8JidGmJq5oe\n0OIdoz1MsLlqE64Eqp4h9SU=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-n8amw@chat-app-38a98.iam.gserviceaccount.com",
    "client_id": "101679827910673273877",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n8amw%40chat-app-38a98.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
  ),
});


app.use(bodyParser.json());

// allow all url's
app.use(cors({ origin: "*" }));

app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).send("Token, title, body are required");
  }

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    res.status(200).send("Notification sent successfully ✅");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Error sending notification ⚠️");
  }
});

app.get("/", (req, res) =>
  res.send("FCM notification server running successfully ✅")
);

app.listen(4500, () => {
  console.log("Server started successfully ✅");
});
