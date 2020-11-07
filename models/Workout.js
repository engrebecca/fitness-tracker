const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Exercise
const ExerciseSchema = new Schema({
    type: String,
    name: String,
    weight: Number,
    sets: Number,
    reps: Number,
    distance: Number,
    duration: Number
}, {
    _id: false
});

// Schema Workout which includes the Exercise schema as an array called exercises
const WorkoutSchema = new Schema({
    day: { type: Date, default: () => new Date() },
    exercises: [
        ExerciseSchema
    ]
}, {
    toJSON: { virtuals: true }
});

// Calculate the sum duration of all exercises for anything that belongs to Workout schema
WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((sum, exercise) => sum + exercise.duration, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;