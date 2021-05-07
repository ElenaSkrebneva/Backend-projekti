const mongoose = require('mongoose')
const Schema = mongoose.Schema

var MyTeam_schema = new Schema({
  id: Number,
  course_name: {type: String, maxlength: [50, "max length is 50 symbols"], required: [true, "This field is requiried"], trim: true},
  credits: {type: Number, min: [1, "Min length is 1 credit"], max: [20, "Max length is 20 credits"], required: [true, "This field is required"]},
  study_year: {type: Number, min: [0, "Study year must be 0 or later"], max: [5, "Study year cannot be over 5"], required: [true, "This field is required"]},
  teacher: {type: String, maxlength: [50, "max length is 50 symbols"], trim: true}
})
var MyTeam_model = mongoose.model('Myteam', MyTeam_schema)

//Tämä osuus jos tarvitsee luoda tietoknta
/*
const doc = [
  {
  "id": 1,
  "course_name": "Maths",
  "credits": 2,
  "study_year": 0,
  "teacher": "Edwin"
  },
  {
  "id": 2,
  "course_name": "Physics",
  "credits": 12,
  "study_year": 2,
  "teacher": "Patsy"
  },
  {
  "id": 3,
  "course_name": "Chemistry",
  "credits": 6,
  "study_year": 0,
  "teacher": "Annie"
  },
  {
  "id": 4,
  "course_name": "Programming 1",
  "credits": 8,
  "study_year": 1,
  "teacher": "Michelle"
  },
  {
  "id": 5,
  "course_name": "Programming 2",
  "credits": 8,
  "study_year": 0,
  "teacher": "Sandra"
  },
  {
  "id": 6,
  "course_name": "Electronics",
  "credits": 11,
  "study_year": 3,
  "teacher": "Virginia"
  },
  {
  "id": 7,
  "course_name": "English",
  "credits": 5,
  "study_year": 2,
  "teacher": "Jacob"
  },
  {
  "id": 8,
  "course_name": "Swedish",
  "credits": 8,
  "study_year": 0,
  "teacher": "Ben"
  },
  {
  "id": 9,
  "course_name": "Game programming",
  "credits": 12,
  "study_year": 3,
  "teacher": "Louise"
  },
  {
  "id": 10,
  "course_name": "Leadership",
  "credits": 0,
  "study_year": 1,
  "teacher": "Marshall"
  }
]
doc.forEach(course => {
  Course_model.create(course, (err, new_instance) => {
    if (err) {console.log(err)}
    else {console.log(new_instance)}
  })
})
*/

module.exports = MyTeam_model
