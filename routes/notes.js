const notes = require("express").Router();
const { randomUUID } = require("crypto");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);

//for JSON.stringify, the parameters are the json string to parse, the null names that nothing is filtered out of the json file, and the 4 is the number of white space to include when displaying your json file.
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nSuccess`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// GET route for receiving all the tips
notes.get("/", (req, res) => {
  console.info(`${req.method} received for notes in the notes.js.`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request received for notes in the notes.js`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: randomUUID(),
      // add randomized id character here
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Addition was a success");
  } else {
    res.error("Error in adding note.");
  }
});

notes.delete("/*", (req, res) => {
  console.info(`${req.method} request received for notes in the notes.js`);
  console.info(req.params);
  const currentNote = JSON.parse(req.params);
});

module.exports = notes;
