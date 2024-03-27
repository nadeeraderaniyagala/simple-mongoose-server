const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;
const studSchema = new Schema({
  name: { type: String, required: true },
  studentID: { type: String, required: true },
});

const StudModel = mongoose.model("w24students", studSchema);
// create a new student object
const studObj = new StudModel({
  name: "Nadeera Deraniyagala",
  studentID: "300364263",
});

// This Activitry creates the collection called activitimodels

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/", async (req, res) => {
  // get the data from the form
  const mongodbUri = req.body.myuri;
  console.log("MongoDB URI:", mongodbUri);

  // connect to the database and log the connection
  mongoose
    .connect(mongodbUri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });

  // add the data to the database
  studObj
    .save()
    .then(() => console.log("Data added!"))
    .catch((err) => console.error("Error: ", err));

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
