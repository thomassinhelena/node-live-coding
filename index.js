const express = require("express");
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilder");
const server = express().use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.err(err));

const asyncErrorHandler = (callback) => (req, res) => {
  callback(req, res).catch((err) => {
    res.status(500).json({ err })
  });
};


server.get("/", (req, res) => {
  res.send("Hello Word");
});

server.post("/api/wilder", asyncErrorHandler (wilderController.create));
server.get("/api/wilder", asyncErrorHandler (wilderController.get));
server.put("/api/wilder/:id", asyncErrorHandler (wilderController.update));
server.delete("/api/wilder/:id", asyncErrorHandler (wilderController.delete))
  

server.listen(5000, () => console.log("Server started on port 3000"));