
const express = require('express')
const app = express()
const parser = require('body-parser')
const url = require('url')
const path = require('path')
app.use(parser.json())
app.use(express.static('public'))
const mongoose = require('mongoose')
require("./models/db")



const port = 3000
module.exports = port
const Players_model = require('./models/players')
const MyTeam_model = require('./models/MyTeam')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/players', (req, res) => {
  Players_model.find({})
  .sort({player_number: 1})
  .exec((err, result) => {
    if (err) {res.status(500).send("Error in finding players")}
    else {res.status(200).send(result)}
  })
})

app.get('/MyTeam', (req, res) => {
  MyTeam_model.find({})
  .sort({id: 1})
  .exec((err, result) => {
    if (err) {res.status(500).send("Error in finding myTeam")}
    else {res.status(200).send(result)}
  })
})

app.post('/players', (req, res) => {
  var new_players = req.body
  new_players["_id"] = new mongoose.Types.ObjectId();
  var new_players_instance = new Players_model(new_players)
  new_players_instance.save(err => {
    if (err) res.status(500).send("Error in saving: " + err)
    else {res.status(201).send("New players added")}
  })
})

app.post('/MyTeam', (req, res) => {
  var new_MyTeam = req.body
  new_MyTeam["_id"] = new mongoose.Types.ObjectId();
  var new_MyTeam_instance = new MyTeam_model(new_MyTeam)
  new_MyTeam_instance.save(err => {
    if (err) res.status(500).send("Error in saving: " + err)
    else {res.status(201).send("New MyTeam added")}
  })
})

/*
app.get('/students/:student_number', (req, res) => {
  var sn = req.params.student_number
  Student_model.findOne({student_number: sn}, (err, result) => {
    if (err) {
      console.log("Student number error")
      res.status(500).send("Error in findOne request")
    }
    else if (result) {res.status(200).send(result)}
    else {res.status(404).send("Could not find the student by number")}
  })
})

app.get('/courses/:course_id', (req, res) => {
  var course_id = req.params.course_id
  Course_model.findOne({id: course_id}, (err, result) => {
    if (err) {
      console.log("Course id error")
      res.status(500).send("Error in findOne request")
    }
    else if (result) {res.status(200).send(result)}
    else {res.status(404).send("Could not find the course by id")}
  })
})
*/

app.delete('/players/:player_id', (req, res) => {
  var id = req.params.player_id
  Players_model.findByIdAndDelete(id, (err, result) => {
    if (err) res.status(500).send("An error in handling the findByIdAndDelete request")
    else if (result) {
      console.log(result)
      res.status(200).send("Deleted")
    }
    else res.status(403).send("Could not delete the players document")
  })
})

app.delete('/MyTeam/:_id', (req, res) => {
  var id = req.params._id
  MyTeam_model.findByIdAndDelete(id, (err, result) => {
    if (err) res.status(500).send("An error in handling the findByIdAndDelete request")
    else if (result) {
      console.log(result)
      res.status(200).send("Deleted")
    }
    else res.status(403).send("Could not delete the MyTeam document")
  })
})

// app.put('/students/:student_id', (req, res) => {
//   var id = req.params.student_id
//   var updated_student = req.body

//   Student_model.findByIdAndUpdate(id, updated_student, (err, result) => {
//     if (err) res.status(500).send("Error in handling the findByIdAndUpdate request")
//     else if (result) res.status(200).send("Student document updated")
//     else res.status(403).send("Student document not updated")
//   })
// })

// app.put('/courses/:course_id', (req, res) => {
//   var id = req.params.course_id
//   var updated_course = req.body

//   Course_model.findByIdAndUpdate(id, updated_course, (err, result) => {
//     if (err) res.status(500).send("Error in handling the findByIdAndUpdate request")
//     else if (result) res.status(200).send("Course was updated")
//     else res.status(403).send("Course was not updated")
//   })
// })

app.listen(port, function() {
  console.log('app listening at http://localhost:'+port)
})
