app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db.json"));
  //should read the db.json file and return all SAVED notes as JSON
});

//receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

// Create New Characters - takes in JSON input
app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newNote);

  characters.push(newNote);

  res.json(newNote);
});

//need to add a route to delete notes