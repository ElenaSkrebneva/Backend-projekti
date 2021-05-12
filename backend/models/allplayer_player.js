const mongoose = require('mongoose')
const Player_schema = require('./player_schema.js')
const Allplayer_model = mongoose.model('allplayers', Player_schema)

var docs = [
  {
  "player_number": 1,
  "first_name": "Aku",
  "last_name": "Ankka",
  "position": "Forward",
  "maalit": 1,
  "syotot": 0,
  "laukaukset": 4,
  "blokkaukset": 3,
  "taklaukset": 2,
  "tehotilasto": -1
  },
  {
   "player_number": 2,
    "first_name": "Ines",
    "last_name": "Ankka",
    "position": "Forward",
    "maalit": 0,
    "syotot": 1,
    "laukaukset": 1,
    "blokkaukset": 4,
    "taklaukset": 2,
    "tehotilasto": 0
  },
  {
    "player_number": 3,
    "first_name": "Minni",
    "last_name": "Hiiri",
    "position": "Forward",
    "maalit": 1,
    "syotot": 0,
    "laukaukset": 3,
    "blokkaukset": 0,
    "taklaukset": 1,
    "tehotilasto": 1
  },
  {
    "player_number": 4,
    "first_name": "Mikki",
    "last_name": "Hiiri",
    "position": "Forward",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 4,
    "blokkaukset": 4,
    "taklaukset": 4,
    "tehotilasto": 0
  },
  {
    "player_number": 5,
    "first_name": "Roope",
    "last_name": "Ankka",
    "position": "Forward",
    "maalit": 1,
    "syotot": 4,
    "laukaukset": 4,
    "blokkaukset": 2,
    "taklaukset": 1,
    "tehotilasto": 4
  },
  {
    "player_number": 6,
    "first_name": "Hannu",
    "last_name": "Hanhi",
    "position": "Forward",
    "maalit": 0,
    "syotot": 3,
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
    "maalit": 1,
    "syotot": 1,
    "laukaukset": 1,
    "blokkaukset": 1,
    "taklaukset": 1,
    "tehotilasto": 1
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
    "taklaukset": 3,
    "tehotilasto": -3
  },
  {
    "player_number": 9,
    "first_name": "Hupu",
    "last_name": "Ankka",
    "position": "Defender",
    "maalit": 1,
    "syotot": 0,
    "laukaukset": 1,
    "blokkaukset": 0,
    "taklaukset": 4,
    "tehotilasto": 0
  },
  {
    "player_number": 10,
    "first_name": "Lupu",
    "last_name": "Ankka",
    "position": "Defender",
    "maalit": 0,
    "syotot": 3,
    "laukaukset": 3,
    "blokkaukset": 1,
    "taklaukset": 1,
    "tehotilasto": 2
  },
  {
    "player_number": 11,
    "first_name": "Milla",
    "last_name": "Magia",
    "position": "Goalkeeper",
    "syotot": 0,
    "maalit": 0,
    "torjunnat": 30,
    "paastetyt_maalit": -1,
  },
  {
    "player_number": 12,
    "first_name": "Kroisos",
    "last_name": "Pennonen",
    "position": "Goalkeeper",
    "torjunnat": 20,
    "paastetyt_maalit": -5,
    "syotot": 1,
    "maalit": 0
  }
];
/*
// Jos tarvii lisätä pelaajat, tämä lisää kaikki kokoelmaan "allplayers" "project2" tietokantaan. Tätä tiedostoa ei tarvi käynnistää erikseen. Avaat kommennon ja app.js vain pyörimään
docs.forEach(doc => {
  Allplayer_model.create(doc, (err, new_instance) => {
    if (err) {console.log(err)}
    else {console.log(new_instance)}
  })
})
*/
module.exports = Allplayer_model
