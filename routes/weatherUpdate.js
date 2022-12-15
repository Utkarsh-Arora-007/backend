const axios = require("axios");



// .then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

module.exports = params => {
    const options = {
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: params,
        headers: {
          'X-RapidAPI-Key': 'bc65df8011msh743163aa8215daap143b8ejsnb48c09086d14',
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      };
    return axios.request(options).then(res => res.data)
}