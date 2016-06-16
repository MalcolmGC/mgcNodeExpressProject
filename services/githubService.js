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
  function getRepos() { // Added
    return axios.get('https://api.github.com/users/MalcolmGC/repos', options);
  }

  function githubInfo() {
    return axios.all([getRepos(), getBio()]) // array of promises.
      .then(function (results) { // array of data.
        var repos = results[0].data;
        var bio = results[1].data;
        return { repos: repos, bio: bio }; // object with repos and bio data.
      }
    );
  }

  return {
    getBio: getBio,
    getRepos: getRepos,
    githubInfo: githubInfo // Added
  };







};

module.exports = githubService();