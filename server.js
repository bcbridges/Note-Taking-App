const express = require("express");
const path = require("path");
// fs to read/write files
const fs = require("fs");
// util methods can create promise objs
const util = require("util");

// Assigns port number to either the Heroku port or local 3001
const PORT = process.env.PORT || 3001;

const app = express();

//Sends user's to the homepage upon open
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
