
var express = require("express");
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var notes = [];


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

app.get("/api/notes", function (req, res) {
    return res.json(notes);
  });