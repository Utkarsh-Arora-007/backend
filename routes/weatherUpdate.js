const axios = require('axios');

module.exports = params => {
  let url = 'https://weatherbit-v1-mashape.p.rapidapi.com/';
  url += params.queryType;
  const options = {
    method: 'GET',
    url: url,
    params: params.location,
    headers: {
      'X-RapidAPI-Key': 'ab08f9872dmsh6b157a941a8d82bp1416cejsn0c42f829801b',
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    },
  };
  return axios.request(options).then(res => res.data);
};
