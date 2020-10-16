var express = require('express');
var path = require('path');
var fs = require('fs');
var db = require('./db.json');


var PORT = process.env.PORT || 3000;
var app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


var notes = [];


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// index page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// displays all notes
app.get("/api/notes", function (req, res) {
  let json = getJson();
  res.json(json);
});

// id for note
const id = () => {
  return Math.floor(Math.random() * 200);
};

// new note 
app.post("/api/notes", function (req, res) {
  const data = fs.readFileSync("./db.json", "utf8");

  notes = JSON.parse(data);

  // sets newNote equal to request.body
  var newNote = req.body;

  // sets newNote.id equal to a randomly generated ID
  newNote.id = id();

  // pushes the note object into the notes array
  notes.push(newNote);

  // sends a json response with the notes to the API
  res.json(newNote);

  const json = JSON.stringify(notes);


  fs.writeFileSync("db.json", json, "utf8");
});

// delete note
app.delete("/api/notes/:id", function (req, res) {
  notes = fs.readFileSync("./db.json", "utf-8");
  notes = JSON.parse(notes)


  const deletedNote = req.params.id;


  notes = notes.filter((note) => {
    return note.id != deletedNote;
  });


  const permaNotes = JSON.stringify(notes);

  fs.writeFileSync("./db.json", permaNotes, "utf8", (err) => {
    if (err) throw err;
  });


  res.json(permaNotes);
});

function getJson() {
  let data = fs.readFileSync(__dirname + "/db.json");
  let json = JSON.parse(data);
  return json;
}