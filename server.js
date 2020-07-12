// Dependencies
const express = require("express");
const path = require("path");
const storedData = require("/db/db");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create "dummy" data as a test
const fakeTasks = [
    {
        task1: "make coffee",
        task2: "eat breakfast"
    }
];

//API Routes
    //reads the db.json file and return all SAVED notes as JSON
app.get("/api/notes", (req, res) => {
    res.json(storedData);
  });
  
  //receive a new note to save on the request body, add it to the db.json file, 
  //and then return the new note to the client.
  // Create New Characters - takes in JSON input
app.post("/api/notes", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newTask = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTask);
  
    fakeTasks.push(newTask);
  
    res.json(newTask);
  });
  //need to add a route to delete notes

  // HTML Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });



// Tells the server which port to listen to 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

