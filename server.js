// Dependencies
const express = require("express");
const path = require("path");
//Route dependencies
const apiRoutesDependency = require("./routes/apiroutes");
const htmlRoutesDependency = require("./routes/htmlroutes");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//below is a map of where to guide the server through the series of requests
apiRoutesDependency(app);
htmlRoutesDependency(app);

// Tells the server which port to listen to 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

