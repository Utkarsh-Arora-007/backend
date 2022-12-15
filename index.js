const express = require('express');
const schedule = require('node-schedule');
const app = express();
var admin = require('firebase-admin');
var fcm = require('fcm-notification');
var serviceAccount = require('./privateKey.json');
const weatherapi = require('./routes/weatherUpdate');

const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const sendPushNotification = (title, body, client_token) => {
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
const { users } = require('./routes/users');
app.get('/users', users);

app.get('/', (req, res, next) => {
  res.send('This is the express server');
});

app.post('/notify', (req, res) => {
  client_token = req.body.token;
  title = req.body.title;
  message = req.body.message;
  schdeuleTime = new Date(req.body.schedule).toISOString();
  schedule.scheduleJob(schdeuleTime, () => {
    for (var i = 0; i < client_token.length; i++)
      sendPushNotification(title, message, client_token[i]);
  });
  res.send({ success: 'notif sent' });
});

app.post('/weatherupdate', async (req, res) => {
  client_lattitude = req.body.lattitude;
  client_longitude = req.body.longitude;
  let params = { lat: client_lattitude , lon: client_longitude};
  try {
    const result = await weatherapi(params);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: err});
  }
});

const port = 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
