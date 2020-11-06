const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to deployed database or to localhost database called populatedb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// Routes
// =============================================================

// Route for adding exercise

// Route for adding workout

// Route for getting last workout to continue
app.get("/", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(workouts => {
      let lastWorkout = workouts[workouts.length - 1]
      res.json(lastWorkout);
    })
})

// Route for getting workouts in range/ all workout data
// /api/workouts/range

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
