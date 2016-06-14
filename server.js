//Step 2. Create a server.js file and add the base route:
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
// Server:
app.listen(port, function() {
  console.log("Server running on port", port);
});
// Routes:
app.get('/', function(req, res) {
  res.render('home', { title: "Malcolm's Site" });
  // res.send("Howdy y'all");
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
  layoutsDir: './views/layouts'
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));