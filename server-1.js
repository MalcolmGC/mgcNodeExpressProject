//Step 2. Create a server.js file and add the base route:
var express = require('express'),
  app = express(),
  // axios = require('axios'),
  port = process.env.PORT || 3000;
// require('dotenv').config();
// var options = {
//   headers: {
//     'User-Agent': 'MalcolmGC',
//     Authorization: 'token ' + process.env.GITHUB_TOKEN
//   }
// };
// Server:
app.listen(port, function() {
  console.log("Server running on port", port);
});
// Routes:
// app.get('/', function(req, res) {
//   res.render('home', { title: "Malcolm's Site" });
//   // res.send("Howdy y'all");
// });
app.get('/', function (req, res) {
  var favoriteLetters = ['a', 'b', 'c']; // TODO: Make my favorites here.
//   res.render('home', {
//     title: "Malcolm's Site",
//     favorites: favoriteLetters
//   });
// });

  var favoriteLinks = [
    { text: 'Apple', url: 'http://apple.com' },
    { text: 'Facebook', url: 'http://facebook.com' }
  ];
  res.render('home', {
    title: "Malcolm's Site",
    favorites: favoriteLetters,
    links: favoriteLinks
  });
});

app.get('/projects', function (req, res) {
  // var options = {
  //   headers: {
  //   'User-Agent': 'MalcolmGC'
  //   }
  // };
  // axios.get('https://api.github.com/users/MalcolmGC', options)
  // githubService.getBio()
  //   .then(function (results) {
  //   console.log(results.data.bio); // Then, render in template.
  //   // res.render('projects', {title: "Malcolm's Projects", bio: results.data.bio});
  //   // console.log(results.data); // Then, render in template.
  //   res.render('projects', {title: "Malcolm's Projects", bio: results.data});
  // });
  githubService.getRepos()
    .then(function (results) {
      // console.log(results[0]); // undefined
      // console.log(results.data[0]); // First repo.
      // console.log(results.data[0].full_name); // MalcolmGC/2015_0504_Sandbox
      // console.log(results.data[1].full_name); // MalcolmGC/2015_0504_Sandbox
    var out = [];
    results.data.map(function(elem, index) {
      console.log(index);
      out.push(index + '. id: ' + elem.id + '  full_name: ' + elem.full_name);
      // res.render('projects', {title: "Malcolm's Projects", repo: out});
    });
    console.log(out);
    res.render('projects', {title: "Malcolm's Projects", repo: out});
    // console.log(results.data); // Then, render in template.
    // res.render('projects', {title: "Malcolm's Projects", repo: out[0]});
  });  
});

var exphbs = require('express-handlebars');
var githubService = require('./services/githubService.js');
var port = process.env.PORT || 3000;
// =======================
// middleware & config
// =======================
app.set('views', 'views');
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './views/layouts',
  helpers: { // Added in Step 9.
    json: function (context) {
      return JSON.stringify(context);
    }
  }
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));