var admin = require('firebase-admin');
var fcm = require('fcm-notification');
var serviceAccount = require('../privateKey.json');
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);


module.exports  = (title, body, client_token) => {
    try {
      let message = {
        android: {
          notification: {
            title: title,
            body: body,
          },
          ttl: 10,
        },
        token: client_token,
      };
  
      FCM.send(message, function (err, res) {
        if (err) {
          throw err;
        } else {
          console.log('Successfully sent notification');
        }
      });
    } catch (err) {
      throw err;
    }
  };