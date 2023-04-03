const express = require('express');
const path = require('path');
const fs = require("fs");

const db = require("./db/db.json")

const app = express();

const PORT = process.env.PORT || 3001;

// middleware
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// app.get("/assets/js/index.js", (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/assets/js/index.js'))
// })

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

app.post("/api/notes", (req, res) => {
  console.log(req.body)

  // const noteId = req.params.review_id;
  // for (let i = 0; i < reviews.length; i++) {
  //   const currentID = reviews[i];
  //   if (currentID.review_id === noteId) {
  //     currentID.upvotes += 1;
  //     res.status(200).json(`New upvote count is: ${currentID.upvotes}!`);
  //     return;
  //   }
  // }

  
  db.push({
    title: req.body.title,
    text: req.body.text
  })

  fs.writeFile("./db/db.json", JSON.stringify(db, null, 4), () => {

    res.send("hi")
  })
})


// Route to direct users to a HTML page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () => {
  console.log("Server is running!")
})