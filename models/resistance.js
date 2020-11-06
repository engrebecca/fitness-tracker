const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
    name: String,
    weight: Number,
    sets: Number,
    reps: Number,
    resistanceDuration: Number
});

const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;