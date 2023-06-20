const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const db = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3001;

// const uuid = () => {
//   return Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// };

// Middleware
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "db/db.json"))
);

app.post("/api/notes", (req, res) => {
  console.log(req.body);

  db.push({
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  });

  fs.writeFile("./db/db.json", JSON.stringify(db, null, 4), () => {
    res.send("Writing to db.json!");
  });
});

// Route to direct users to a HTML page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
      
      if (err) throw err;
      let notes = JSON.parse(data);
      console.log(notes);
      const newNotes = notes.filter((note) => note.id !== req.params.id);

      

      fs.writeFile('./db/db.json', JSON.stringify(newNotes), () => {
          res.send('deleted sucessfully!');
      });
  });
});

app.listen(PORT, () => {
  console.log("Server is running!");
});
