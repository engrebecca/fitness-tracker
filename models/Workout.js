const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const WorkoutSchema = new Schema({
    day: { type: Date, default: () => new Date() },
    exercises: [
        ExerciseSchema
    ]
}, {
    toJSON: { virtuals: true }
});

WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((sum, exercise) => sum + exercise.duration, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;