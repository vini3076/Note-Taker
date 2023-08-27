const express = require("express");
const fs = require("fs");
const app = express();
const uuid = require("uuid");
const path = require("path");
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const currentNotes = fs.readFileSync("./db/db.json", "utf-8");
  let parsedNotes = JSON.parse(currentNotes);
  const { title, text } = req.body;

    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };

    console.log("new note: ", newNote);
    // Add a new review
    parsedNotes.push(newNote);
console.log(parsedNotes);
    // Write updated notes back to the file
    fs.writeFileSync( "./db/db.json", JSON.stringify(parsedNotes));
    res.json(parsedNotes);
  } 
);

app.delete("/api/notes/:id", (req, res) => {
  const currentNotes = fs.readFileSync("./db/db.json", "utf-8");
  let parsedNotes = JSON.parse(currentNotes);
  const noteID = req.params.id;
  // Finds the note with the given id property
  const deleteNote = parsedNotes.find((note) => note.id === noteID);
  // Deletes the note with the given id property from the JSON array
  if (deleteNote) {
    parsedNotes = parsedNotes.filter(note => note.id !== noteID)

  // Writes the new note to the db.json file
  fs.writeFileSync("./db/db.json", JSON.stringify(parsedNotes, null, 4));
  // Returns the new note to the client
  res.json(parsedNotes);
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
