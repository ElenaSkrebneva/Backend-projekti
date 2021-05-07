
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
const Student_model = require('./models/student')
const Course_model = require('./models/course')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/students', (req, res) => {
  Student_model.find({})
  .sort({student_number: 1})
  .exec((err, result) => {
    if (err) {res.status(500).send("Error in finding students")}
    else {res.status(200).send(result)}
  })
})

app.get('/courses', (req, res) => {
  Course_model.find({})
  .sort({id: 1})
  .exec((err, result) => {
    if (err) {res.status(500).send("Error in finding courses")}
    else {res.status(200).send(result)}
  })
})

app.post('/students', (req, res) => {
  var new_student = req.body
  new_student["_id"] = new mongoose.Types.ObjectId();
  var new_student_instance = new Student_model(new_student)
  new_student_instance.save(err => {
    if (err) res.status(500).send("Error in saving: " + err)
    else {res.status(201).send("New student added")}
  })
})

app.post('/courses', (req, res) => {
  var new_course = req.body
  new_course["_id"] = new mongoose.Types.ObjectId();
  var new_course_instance = new Course_model(new_course)
  new_course_instance.save(err => {
    if (err) res.status(500).send("Error in saving: " + err)
    else {res.status(201).send("New course added")}
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

app.delete('/students/:student_id', (req, res) => {
  var id = req.params.student_id
  Student_model.findByIdAndDelete(id, (err, result) => {
    if (err) res.status(500).send("An error in handling the findByIdAndDelete request")
    else if (result) {
      console.log(result)
      res.status(200).send("Deleted")
    }
    else res.status(403).send("Could not delete the student document")
  })
})

app.delete('/courses/:_id', (req, res) => {
  var id = req.params._id
  Course_model.findByIdAndDelete(id, (err, result) => {
    if (err) res.status(500).send("An error in handling the findByIdAndDelete request")
    else if (result) {
      console.log(result)
      res.status(200).send("Deleted")
    }
    else res.status(403).send("Could not delete the course document")
  })
})

app.put('/students/:student_id', (req, res) => {
  var id = req.params.student_id
  var updated_student = req.body

  Student_model.findByIdAndUpdate(id, updated_student, (err, result) => {
    if (err) res.status(500).send("Error in handling the findByIdAndUpdate request")
    else if (result) res.status(200).send("Student document updated")
    else res.status(403).send("Student document not updated")
  })
})

app.put('/courses/:course_id', (req, res) => {
  var id = req.params.course_id
  var updated_course = req.body

  Course_model.findByIdAndUpdate(id, updated_course, (err, result) => {
    if (err) res.status(500).send("Error in handling the findByIdAndUpdate request")
    else if (result) res.status(200).send("Course was updated")
    else res.status(403).send("Course was not updated")
  })
})

app.listen(port, function() {
  console.log('app listening at http://localhost:'+port)
})
