const axios = require('axios');

module.exports = params => {
  let url = 'https://weatherbit-v1-mashape.p.rapidapi.com/';
  url += params.queryType;
  const options = {
    method: 'GET',
    url: url,
    params: params.location,
    headers: {
      'X-RapidAPI-Key': '54680d66dcmshce45f33e8bfa913p126abejsn8c5c19073558',
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
    },
  };
  return axios.request(options).then(res => res.data);
};
