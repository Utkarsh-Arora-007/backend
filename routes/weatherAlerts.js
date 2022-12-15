// const cron = require('node-cron');
const axios = require("axios");
const weatherapi = require('./weatherUpdate');
const sendNotification = require('./sendNotif')
const cron = require('node-cron');


const options = {
        method: 'GET',
        url: "https://backend-gr89nbzq0-divyanshu887.vercel.app/users",
};



const sendAlerts = async () => {
    var res = await axios.request(options);
    res = res.data
    console.log(res,"h");
    for (var key in res)
        {
            let params ={
                "queryType":"current",
                "location":{
                    "lat":res[key].Location.lat,
                    "lon":res[key].Location.long,
                }
            }

            
            let details = await weatherapi(params);
            details = details.data;
            console.log(details,"i")

            sendNotification("Weather Forecast", JSON.stringify(details), res[key].token);
        
        }
    }

cron.schedule('* * * * *', function() {
sendAlerts();
  });
