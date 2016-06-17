//Step 2. Create a server.js file and add the base route:
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
// Server:
app.listen(port, function() {
  console.log("Server running on port", port);
});
// Routes:
app.get('/', function (req, res) {
  var favoriteLetters = ['a', 'b', 'c']; // TODO: Make my favorites here.
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
// /projects
// app.get('/projects', function (req, res) {
//   githubService.githubInfo()
//   .then(function (results) {
//     res.render('projects',
//       { title: "Malcolm's Projects",
//         bio: results.bio,
//         repos: results.repos
//       }
//     );
//   })
//   .catch(function (err) {
//     console.log('err: ', err);
//   });
// });
// /projects Step 15:
app.get('/projects/:id?', function (req, res) {
  var currentProjectName = req.params.id; // id from the url.
  console.log('currentProjectName:', currentProjectName);
  res.render('projects', // view = file path of the view to render.
    { // [, locals] [, callback])
      title: "Malcolm's Projects: " + currentProjectName,
      project: { name: currentProjectName } // pass to template.
    }
  );
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