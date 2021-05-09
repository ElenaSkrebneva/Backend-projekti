const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Player_schema = new Schema({
  player_number: {type: Number, min: [0, "Player number cannot be smaller than 0"], max: [99, "Player number cannot be greater than 99"], required: [true, "This field is requiried"]},
  first_name: {type: String, maxlength: [50, "max length is 50 symbols"], required: [true, "This field is requiried"], trim: true},
  last_name: {type: String, maxlength: [50, "max length is 50 symbols"], required: [true, "This field is requiried"], trim: true},
  position: {type: "String", enum: ["Forward", "Defender", "Goalkeeper"], required: [true, "Fill in the position"]},
  maalit:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  syotot:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  laukaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  blokkaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  taklaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  tehotilasto:{type: Number, min: [-99,"Cannot be smaller than -99"], max: [99, "Cannot be greater than 99"]},
  torjunnat: {type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  paastetyt_maalit: {type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
})
var Allplayer_model = mongoose.model('allplayers', Player_schema)
var Myteam_model = mongoose.model('myteam', Player_schema)

var docs = [
  {
  "player_number": 1,
  "first_name": "Aku",
  "last_name": "Ankka",
  "position": "Forward",
  "maalit": 0,
  "syotot": 0,
  "laukaukset": 0,
  "blokkaukset": 0,
  "taklaukset": 0,
  "tehotilasto": 0
  },
  {
   "player_number": 2,
    "first_name": "Ines",
    "last_name": "Ankka",
    "position": "Forward",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 3,
    "first_name": "Minni",
    "last_name": "Hiiri",
    "position": "Forward",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 4,
    "first_name": "Mikki",
    "last_name": "Hiiri",
    "position": "Forward",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 5,
    "first_name": "Roope",
    "last_name": "Ankka",
    "position": "Forward",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 6,
    "first_name": "Hannu",
    "last_name": "Hanhi",
    "maalit": 0,
    "syotot": 0,
    "position": "Forward",
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 7,
    "first_name": "Hessu",
    "last_name": "Hopo",
    "position": "Defender",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 8,
    "first_name": "Tupu",
    "last_name": "Ankka",
    "position": "Defender",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 9,
    "first_name": "Hupu",
    "last_name": "Ankka",
    "position": "Defender",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
  {
    "player_number": 10,
    "first_name": "Lupu",
    "last_name": "Ankka",
    "position": "Defender",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  },
];
/*
// Jos tarvii lisätä pelaajat, tämä lisää kaikki kokoelmaan "allplayers" "project2" tietokantaan. Tätä tiedostoa ei tarvi käynnistää erikseen. App.js vain pyörimään
docs.forEach(doc => {
  Allplayer_model.create(doc, (err, new_instance) => {
    if (err) {console.log(err)}
    else {console.log(new_instance)}
  })
})
*/
module.exports = Allplayer_model
module.exports = Myteam_model
