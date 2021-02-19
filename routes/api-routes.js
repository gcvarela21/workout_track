const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

router.put("/api/workouts/:id", (req, res) => {
    if (req.body.type === "cardio") {
        Workout.updateOne(
            {
                _id: req.params.id
            },
            {
                type: req.body.type,
                name: req.body.name,
                distance: req.body.distance,
                duration: req.body.duration

            },
            (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(data);
                }
            }
        );
    } else if (req.body.type === "resistance") {
        Workout.updateOne(
            {
                _id: req.params.id
            },
            {
                type: req.body.type,
                name: req.body.name,
                weight: req.body.weight,
                sets: req.body.sets,
                reps: req.body.reps,
                duration: req.body.duration
            },
            (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(data);
                }
            }
        );
    }
    
});

router.get("/api/workouts/range", (req, res) => {

});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/stats.html"));
});

router.get("/exercise", (req, res) => {
    // New Workout
    res.sendFile(path.join(__dirname, "/../public/exercise.html"));
});

router.get("/exercise?", (req, res) => {
    // Continue Workout
});

module.exports = router;