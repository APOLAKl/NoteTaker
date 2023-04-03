const express = require("express");
const path = require("path")

const app = express();

// routes
app.get("/hello", (req, res) => {
  res.send("hi")
})

app.get("/goodbye", (req, res) => {
  res.send("see you later")
})

app.get("/", (req, res) => {
  // res.send("hello world")
  res.sendFile(path.join(__dirname, "./mypage.html"))
})


app.listen(3001, function() {
  console.log("Server is running")
})

