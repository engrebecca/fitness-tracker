const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to deployed database or to localhost database called populatedb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
// =============================================================

// Route for adding exercise
app.put("/api/workouts/:id", (req, res) => {
  const { id } = req.params
  db.Workout.findByIdAndUpdate(id, { $push: { exercises: req.body } })
    .then(workout => {
      res.json(workout);
    })
})

// Route for adding workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then(workouts => {
      res.json(workouts);
    })
})

// Route for getting last workout to continue
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}).sort({ day: -1 })
    .then(workouts => {
      res.json(workouts);
    })
})

// Route for getting workouts in range/ all workout data
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({ day: { $gte: new Date().setDate(new Date().getDate() - 7) } }).sort({ day: -1 })
    .then(workouts => {
      res.json(workouts);
    })
})

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"))
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/exercise.html"))
});

app.get("/stats", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/stats.html"))
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
