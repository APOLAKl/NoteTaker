const express = require('express');
const path = require('path');
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

const db = require("./db/db.json")

const app = express();

const PORT = process.env.PORT || 3001;

// const uuid = () => {
//   return Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);
// };


// middleware
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

app.post("/api/notes", (req, res) => {
  console.log(req.body)


  db.push({
    noteId: uuidv4(),
    title: req.body.title,
    text: req.body.text
  })

  fs.writeFile("./db/db.json", JSON.stringify(db, null, 4), () => {

    res.send("Writing to db.json!")
  })
})


// Route to direct users to a HTML page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.delete('/api/notes/:noteId', (req, res) => res.json(`DELETE route`));

app.listen(PORT, () => {
  console.log("Server is running!")
})