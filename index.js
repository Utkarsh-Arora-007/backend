const schedule = require('node-schedule');
const pushNotification = require('./routes/sendNotif');
const weatherapi = require('./routes/weatherUpdate');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

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
      pushNotification(title, message, client_token[i]);
  });
  res.send({ success: 'notif sent' });
});

app.post('/weatherupdate', async (req, res) => {
  try {
    const result = await weatherapi(req.body);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

app.post('/useractivity', (req, res) => {
  if (req.body.activity == 'logout') {
    const result = pushNotification(
      'Session Ended',
      'You have Logged Out',
      req.body.token
    );
    res.send(result);
  } else if (req.body.activity == 'login') {
    const result = pushNotification(
      'New Session Started',
      'You have Logged In',
      req.body.token
    );
    res.send(result);
  } else if (req.body.activity == 'signup') {
    const result = pushNotification(
      'Welcome',
      'Have a Good Day',
      req.body.token
    );
    res.send(result);
  }
});

const port = 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
