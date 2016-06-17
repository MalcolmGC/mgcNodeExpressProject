// wildCardRoutes.js
// Ref: http://modernweb.com/2014/04/07/the-basics-of-express-routes/
var express = require('express'),
  app = express(),
  port = 3000;
app.listen(port, function() {
  console.log("Server running on port", port);
});
//===========================================================================
// Express allows using a wildcard within a route path using *. 
// For example, the path defined below can be accessed using
// anything that follows the base URL.
// (a “catch all” that captures routes not previously defined).
app.get('/*',function(req,res)
{
    // console.log(req.params);
    var reqParms = req.params[0] || 'root';
    // console.log(reqParms);
    res.send("I am Wild about using this " + reqParms + ' route.');
 });
//The following URL will be caught by this route on port 3000:
// localhost:3000/a/b/1/2
// I am Wild about using this a/b/1/2 route.
//--------------
// Without the '*', using just '/', any path beyond the root will not work.
// app.get('/',function(req,res)
// {
//     res.send("Testing /");
//  });
// localhost:3000/any parameter
// Cannot GET /any%20parameter
// Note: '/*' displays I am Wild about using this any parameter route.
// --------------------------------------------------------------------------
// Using optional id approach allows none or one parameter only -- no more:
// app.get('/:id?',function(req,res)
// {
//     console.log(req.params);
//     var reqParms = req.params.id || 'root';
//     console.log(reqParms);
//     res.send("I selected this " + reqParms + ' route.');
//  });
//The following URL examples will be caught by this route on port 3000:
// http://localhost:3000
// I selected this root route.
// http://localhost:3000/p1
// I selected this p1 route.
//The following URL examples will be not by this route on port 3000:
// http://localhost:3000/p1/p2
// Cannot GET /p1/p2

