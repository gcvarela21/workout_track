
 const router = require("express").Router();
 const db = require("../models/workout.js");
//// this wont work without the aggregate >.< or must have Find()
 router.get("/api/workouts", (req, res) => {
  db.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }
  ])
    .then(dbWorkouts => {
      res.json(dbWorkouts);
      /// above does the find function({})respwan by showing me the db. this is what shows up in the page
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
})


 router.post("/api/workouts", ( { body },res)=>{
    console.log(body);
    db.create(body)
    .then(dbWorkouts =>{
      res.json(dbWorkouts)
    })
    .catch(err =>{
      res.json(err);
    });
  })

  router.put("/api/workouts/:id", (req,res)=>{
    db.findOneAndUpdate (
      { _id: req.params.id
      },
      {
        $push: { exercises: req.body  }
      }, 
      { new: true, upsert: true })
      .then(dbWorkouts =>{
        res.json(dbWorkouts)
      })
      .catch(err =>{
        res.json(err);
      });   
  });
 

  router.get('/api/workouts/range', (req, res) => {
    db.find({}).limit(7)
      .then(sevenWorkouts => {
        console.log("7-up");
        res.json(sevenWorkouts);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  })
  module.exports = router;
    
 
















// const router = require("express").Router();
// const db = require("../models/workout.js");
// const path = require("path");
// // const workout = require("../models/workout.js");

// module.exports = function(app){

//     app.get("/api/workouts", (req, res) => {
//         db.find({})
//             .then(dbWorkouts => {
//                 res.json(dbworkouts);
//             })
//             .catch(err => {
//                 res.json(err);
//                 console.log("you can't get none! no no no! ur find don't seem to wok lol");
    
//             });
//     });
    
//     app.post("api/workouts", ({ body }, res) => {
        
//         db.create(body)
//             .then(dbWorkouts => {
//                 res.json(dbWorkouts);
//             })
//             .catch(err => {
               
//                 res.json(err);
//             });
//     });
    
//     app.put("/api/workouts/:id", (req, res) => { 
//         db.findOneAndUpdate (
//                 {
//                     _id: req.params.id
//                 },
//                 {
//                     $push: { exercises: req.body }
//                 },
//                 { new: true, upsert: true})
//                 .then(dbWorkouts => {
//                     res.json(dbWorkouts)
//                 })
//                 .catch(err => {
//                     res.json(err);
//                 });
//             });
    
//     app.get("/api/workouts/range", (req,res) => {
//         db.find({}).limit(7)
//         .then(sevenWorkouts => {
//             console.log(sevenWorkouts);
//             res.json(sevenWorkouts);
//         })
//         .catch(err => {
//             console.log("range error api");
//             console.log(err);
//             res.json(err);
//         });
//     });
    
    
//    router.get("/api/workouts", (req,res)=>{
//     db.aggregate( [
//       {
//         $addFields: {
//           totalDuration: { $sum: "$exercises.duration" } 
//         }
//       }
//    ] ).then(dbWorkouts =>{
//          console.log (dbWorkouts)
//         res.json(dbWorkouts)
//       })
//       .catch(err =>{
//         res.json(err);
//       });
//     });


// };

