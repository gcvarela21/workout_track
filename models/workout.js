const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// worked with my tutor to fix schema objects and array
const WorkoutSchema = new Schema(
  {
    day: {type: Date,
          default:Date.now},
    exercises: [{
        type:{
          type: String,
          trim: true,
          required: 'Enter an exercise type'
        },
        name: {
          type: String,
          trim: true,
          required: 'Enter a exercise name'
        },
        duration: {
          type: Number,
          trim: true
        },
        weight: {
          type: Number,
          trim: true
        },
        reps: {
          type: Number,
          trim: true
        },
        sets: {
          type: Number,
          trim: true
        }
      }
    ]
  });

const Workouts = mongoose.model("Workouts", WorkoutSchema);

module.exports = Workouts;

// type: {
//   type: String,
//   trim: true,
//   required: 'Enter an exercise type',
// },
