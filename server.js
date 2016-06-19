//Step 2. Create a server.js file and add the base route:
var express = require('express'),
  app = express(),
  exphbs = require('express-handlebars'),
  githubService = require('./services/githubService.js'),
  projectInfoService = require('./services/projectInfoService.js'), // New.
  port = process.env.PORT || 3000;
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
    //},
    //formatDate: function (date, format) {
    //  return moment(date).format(format);
    }
  }
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));

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
  console.log('Render home first link:', favoriteLinks[0].url);
  res.render('home', {
    title: "Malcolm's Site",
    favorites: favoriteLetters,
    links: favoriteLinks
  });
});
//projects [Broken, but probably not here.]
app.get('/projects', function (req, res) {
  console.log("server: In '/projects' ..."); // OK.
  githubService.githubInfo()
  .then(function (results) {
    var repos = results.repos;
    console.log('server: repos:'); // Not shwowing.
    console.log(repos);
    repos.forEach(function (repo, index) {
      repos[index].hasPost = projectInfoService.fileExists(repo.name);
    });
    console.log('server: results:'. results);
    console.log('server: results.bio:'. results.bio);
    res.render('projects',
      { title: "Malcolm's Projects", // view = file path of the view to render.
                              //   { // [, locals] [, callback])
        bio: results.bio,
        repos: results.repos
      }
    );
  })
  .catch(function (err) {
    console.log('server: /projects err ... Getting results:');
    console.log('server: console.log(results); not working');
    console.log(results); // Not showing.
    console.log('server: Getting error 401'); // Not logging.
    // console.log('err: ', err);
  });
});
// /project Step 15:
app.get('/projects/:id', function (req, res) {
  var currentProjectName = req.params.id; // id from the url.
  console.log('In get for /projects/:id - currentProjectName:', currentProjectName);
  var currentProject = {}; // New Step 16 ...
  projectInfoService.readFile(currentProjectName, function (err, results) {
    if (err) {
      currentProject = {
        post: currentProjectName + ' is invalid project name.'
      };
    } else {
      //console.log('readFile results: ', results); // Buffer?
      currentProject = {
        name: currentProjectName,
        post: results,
        url: 'https://github.com/MalcolmGC/' + currentProjectName
      };
    }
    //console.log('projectInfoService.readFile results:' , results ); // Buffer?
    console.log('currentProject.name:' ,currentProject.name );
    // console.log('currentProject.post:' ,currentProject.post ); // Buffer?
    console.log('currentProject.url:' ,currentProject.url );
    res.render('project', { // view = file path of the view to render.
                    // [, locals]
      title: "Malcolm's Project: " + currentProjectName, 
      project: currentProject // pass to template.
    });  // [, callback]
  }); // End New.
  // res.render('project',
  //   {
  //     title: 'My Projects: ' + currentProjectName,
  //     project: { name: currentProjectName }
  //   }
  // );
});