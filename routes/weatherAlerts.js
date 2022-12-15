// const cron = require('node-cron');
const axios = require("axios");
const weatherapi = require('./weatherUpdate');

const options = {
        method: 'GET',
        url: "https://backend-7vsbkiy0g-divyanshu887.vercel.app/users",
};
axios.request(options).then(res => {
    for (var key in res.data) {console.log(res.data[key].Location)};
})
