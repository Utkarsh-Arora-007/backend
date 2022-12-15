const axios = require("axios");


module.exports = params => {
    let url = "https://weatherbit-v1-mashape.p.rapidapi.com/";
    url +=params.queryType;
    const options = {
        method: 'GET',
        url: url,
        params: params.location,
        headers: {
          'X-RapidAPI-Key': '5a065a3659mshb15050009ae4d44p1da3c2jsne642bb6d310e',
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
      };
    return axios.request(options).then(res => res.data)
}
