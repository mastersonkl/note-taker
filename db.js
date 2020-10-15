var express = require("express");
var path = require("path");
var fs = require("fs");
let db = require("./db.json");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var note = [];

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});


app.get("/api/notes", function (req, res) {
  res.json(db);
});


app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  req.body.id = Math.floor(Math.random() * 9999) + 1;
  note.push(newNote);
  res.json(newNote);
  var json = JSON.stringify(note);
  fs.writeFileSync("db.json", json, "utf8");
  console.log(req.body.id);
});


app.delete("/api/notes/:id", function (req, res) {
  const id = req.params.id;
  const deletedNote = db.splice(id);
  var json = JSON.stringify(note);
  fs.writeFileSync("db.json", json, "utf8");
  res.json(deletedNote);
});
