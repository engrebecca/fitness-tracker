const mongoose = require("mongoose");
const Exercise = require("./Exercise");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: String,
    name: String,
    weight: Number,
    sets: Number,
    reps: Number,
    distance: Number,
    duration: Number
});

const WorkoutSchema = new Schema({
    date: Date,
    exercises: [
        ExerciseSchema
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;