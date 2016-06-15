//Step 2. Create a server.js file and add the base route:
var express = require('express'),
  app = express(),
  axios = require('axios'),
  port = process.env.PORT || 3000;
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
  var options = {
    headers: {
    'User-Agent': 'MalcolmGC'
    }
  };
  axios.get('https://api.github.com/users/MalcolmGC', options)
    .then(function (results) {
    // console.log(results.data.bio); // Then, render in template.
    // res.render('projects', {title: "Malcolm's Projects", bio: results.data.bio});
    console.log(results.data); // Then, render in template.
    res.render('projects', {title: "Malcolm's Projects", bio: results.data});
  });
});

var exphbs = require('express-handlebars');
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