const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;

// Import the workout model from models folder
const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to deployed database or to localhost database called workout
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });

// API Routes
// =============================================================

// Route for adding exercise, from exercise.js front end
app.put("/api/workouts/:id", (req, res) => {
  // Get workout id from req.params
  const { id } = req.params
  // Find requested id in the Workout collection
  // Update the corresponding document and add new exercise info to the exercise array
  db.Workout.findByIdAndUpdate(id, { $push: { exercises: req.body } })
    .then(workout => {
      res.json(workout);
    })
})

// Route for adding workout, from exercise.js front end
app.post("/api/workouts", (req, res) => {
  // Create a new document in the Workout collection based on the info in the object of req.body
  db.Workout.create(req.body)
    .then(workouts => {
      res.json(workouts);
    })
})

// Route for getting last workout to continue, from index.js front end
app.get("/api/workouts", (req, res) => {
  // Find all workouts in the Workout collection, then sort in descending order by day
  db.Workout.find({}).sort({ day: -1 })
    .then(workouts => {
      res.json(workouts);
    })
})

// Route for getting workouts in range/ all workout data, fron stats.js front end
app.get("/api/workouts/range", (req, res) => {
  // Find all workouts for the past week and sort in descending order by day
  db.Workout.find({ day: { $gte: new Date().setDate(new Date().getDate() - 7) } }).sort({ day: -1 })
    .then(workouts => {
      res.json(workouts);
      console.log("Workouts: " + workouts)
    })
})

// HTML Routes
// =============================================================
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
