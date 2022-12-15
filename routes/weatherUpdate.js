const axios = require("axios");


module.exports = params => {
    let url = "https://weatherbit-v1-mashape.p.rapidapi.com/";
    url +=params.queryType;
    const options = {
        method: 'GET',
        url: url,
        params: params.location,
        headers: {
          'X-RapidAPI-Key': 'bc65df8011msh743163aa8215daap143b8ejsnb48c09086d14',
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      };
    return axios.request(options).then(res => res.data)
}