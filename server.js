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
  res.send("Howdy y'all");
})