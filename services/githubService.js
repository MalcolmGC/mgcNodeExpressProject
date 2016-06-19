// /services/githubService.js *** Looks OK.
var axios = require('axios');
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
var githubService = function () {
  var options = {
    headers: {
      'User-Agent': 'MalcolmGC',
      Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  };
  console.log('githubService: ...');
  function getBio() { // returns a promise:
    // return axios.get('https://api.github.com/users/wykhuh', options);
    console.log('githubService: -- getBio ...'); // Promise
    var axBio = axios.get('https://api.github.com/users/MalcolmGC', options);
    // console.log('githubService: axBio', axBio);
    return axBio;
  }
  function getRepos() { // Added
    console.log('githubService: -- getRepos ...');
    var axRepos = axios.get('https://api.github.com/users/MalcolmGC/repos', options);
    // console.log('githubService: axRepos', axRepos); // Promise
    return axRepos; 
  }
  function githubInfo() {
    console.log('githubService:  githubInfo -- waiting for axios.all ...');
    return axios.all([getRepos(), getBio()]) // array of promises.
      .then(function (results) { // array of data.
        console.log('githubService: githubInfo -- Promises done.*******');
        var repos = results[0].data;
        var bio = results[1].data;
        console.log('githubService: -- results:', results); // Not getting here.
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