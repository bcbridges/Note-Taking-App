const express = require("express");
const path = require("path");
// fs to read/write files
const fs = require("fs");
// util methods can create promise objs
const util = require("util");

// Assigns port number to either the Heroku port or local 3001
const PORT = process.env.PORT || 3001;

const app = express();

// Turns the fs read file method into one that returns as a promise obj.
const readFromFile = util.promisify(fs.readFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sends user's to the homepage upon open
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  readFromFile("./db/db.json").then((data) => console.log(JSON.parse(data)));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
