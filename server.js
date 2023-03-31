const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3001;


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Route to direct users to a HTML page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);