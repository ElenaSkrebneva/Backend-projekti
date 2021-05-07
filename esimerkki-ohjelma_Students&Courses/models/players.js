const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Player_schema = new Schema({
  player_number: {type: Number, min: [0, "Player number cannot be smaller than 0"], max: [99, "Player number cannot be greater than 99"], required: [true, "This field is requiried"]},
  first_name: {type: String, maxlength: [50, "max length is 50 symbols"], required: [true, "This field is requiried"], trim: true},
  last_name: {type: String, maxlength: [50, "max length is 50 symbols"], required: [true, "This field is requiried"], trim: true},
  Maalit:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  Syotot:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  Laukaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  Blokkaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  Taklaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  Tehotilasto:{type: Number, min: [-99,"Cannot be smaller than -99"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},

})
var Player_model = mongoose.model('Player', Player_schema)

/*Tämä osuus jos tarvitsee luoda tietoknta
var students = [
  {
    "student_number": 1,
    "first_name": "Anetta",
    "last_name": "Penddreth",
    "email": "jpenddreth0@census.gov",
    "gender": "female"
  },
  {
    "student_number": 2,
    "first_name": "Giavani",
    "last_name": "Frediani",
    "email": "gfrediani1@senate.gov",
    "gender": "male"
  },
  {
    "student_number": 3,
    "first_name": "Noell",
    "last_name": "Bea",
    "email": "nbea2@imageshack.us",
    "gender": "female"
  },
  {
    "student_number": 4,
    "first_name": "Willard",
    "last_name": "Valek",
    "email": "wvalek3@vk.com",
    "gender": "male"
  },
  {
    "student_number": 5,
    "first_name": "Elena",
    "last_name": "Skrebneva",
    "email": "elena.skrebneva@edu.lapinamk.fi",
    "gender": "female"
  }
]
students.forEach(stud => {
  Student_model.create(stud, (err, new_instance) => {
    if (err) {console.log(err)}
    else {console.log(new_instance)}
  })
})
*/

module.exports = Player_model
