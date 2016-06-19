// services/projectInfoService.js ** Looks OK
var fs = require('fs'),
    path = require('path');
var projectInfoService = function () {
  function readFile(repoName, callback) {
    var filePath = path.join(__dirname, '../data', repoName + '.html');
    console.log('Reading filePath: ', filePath);
    return fs.readFile(filePath, function (error, data) {
        callback(error, data);
    });
  }
  function fileExists(repoName) { // Step 17 ...
    var filePath = path.join(__dirname, '../data', repoName + '.html');
    try {
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  } // ... Step 17.
  return {
     readFile: readFile,
     fileExists: fileExists // Step 17.
  };
};
module.exports = projectInfoService();
// access: readFile(repoName, callback(err, data));