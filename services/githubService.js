// /services/githubService.js
var axios = require('axios');
require('dotenv').config();
var githubService = function () {
  var options = {
    headers: {
      'User-Agent': 'MalcolmGC',
      Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  };
  function getBio() { // returns a promise:
    // return axios.get('https://api.github.com/users/wykhuh', options);
    return axios.get('https://api.github.com/users/MalcolmGC', options);
  }
  return { getBio: getBio };
};
module.exports = githubService();