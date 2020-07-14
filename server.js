// Dependencies
const express = require("express");
const path = require("path");
const storedData = require("./db/db.json");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



//API Routes
app.get("/api/notes", (req, res) => {
  res.json(storedData);
});

app.post("/api/notes", (req, res) => {
  const newTask = req.body;
  if (storedData === "") {
    newTask.id = 1;
  } else {
    newTask.id = storedData.length;
  }

  storedData.push(newTask);

  fs.writeFile("db/db.json", JSON.stringify(storedData), (error) => {
    if (error) throw error;
  });
  res.send(storedData);
});

//need to add an API route to delete notes
app.delete("/api/notes/:id", (req, res) => {
  const newTask = req.params.id;

  storedData.splice(newTask, 1);

  fs.writeFile("db/db.json", JSON.stringify(storedData), (error) => {
    if (error) throw error;

    if (!storedData === undefined || !storedData.length === 0) {
      for (let i = 0; i < storedData.length; i++) {
        storedData[i].id = i;
      }
    }
  });
  res.send(storedData);
});

// HTML Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Tells the server which port to listen to
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
