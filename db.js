
var express = require("express");
var path = require("path");
var fs = require("fs");
let db = require("./db.json");


var app = express();
var PORT = 3000;
var PORT = process.env.PORT || 3000;

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
    res.json(db);
});

app.get("/api/notes/:title", function (req, res) {
    fs.writeFileSync("db.json").push(newNote);


});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    var json = JSON.stringify(newNote);

    fs.writeFileSync("db.json", json, "utf8");
});