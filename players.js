var mongo = require('mongodb').MongoClient;
var address = "mongodb://localhost:27017/";

mongo.connect(address, function(err, db) {
  if (err) throw err;
  var dbo = db.db("project2");
  dbo.createCollection("all_players", function(err, res) {
    if (err) throw err;
    console.log("players created!");
  });
  const doc = [
    {
    "PlayerNumber": 1,
    "first_name": "Aku",
    "last_name": "Ankka",
    "Position": "Forward",
    "Maalit": 0,
    "Syotot": 0,
    "Laukaukset": 0,
    "Blokkaukset": 0,
    "Takalukset": 0,
    "Tehotilasto": 0
    },
    {
     "PlayerNumber": 2,
        "first_name": "Ines",
        "last_name": "Ankka",
        "Position": "Forward",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 3,
        "first_name": "Minni",
        "last_name": "Hiiri",
        "Position": "Forward",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 4,
        "first_name": "Mikki",
        "last_name": "Hiiri",
        "Position": "Forward",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 5,
        "first_name": "Roope",
        "last_name": "Ankka",
        "Position": "Forward",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 6,
        "first_name": "Hannu",
        "last_name": "Hanhi",
        "Maalit": 0,
        "Syotot": 0,
        "Position": "Forward",
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 7,
        "first_name": "Hessu",
        "last_name": "Hopo",
        "Position": "Defender",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 8,
        "first_name": "Tupu",
        "last_name": "Ankka",
        "Position": "Defender",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 9,
        "first_name": "Hupu",
        "last_name": "Ankka",
        "Position": "Defender",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 10,
        "first_name": "Lupu",
        "last_name": "Ankka",
        "Position": "Defender",
        "Maalit": 0,
        "Syotot": 0,
        "Laukaukset": 0,
        "Blokkaukset": 0,
        "Takalukset": 0,
        "Tehotilasto": 0
    },
    {
        "PlayerNumber": 11,
        "first_name": "Milla",
        "last_name": "Magia",
        "Position": "Goalkeeper",
        "Torjunnat": 0,
        "Paastetyt_maalit": 0,
        "Syotot": 0,
        "Maalit": 0
    },
    {
        "PlayerNumber": 12,
        "first_name": "Kroisos",
        "last_name": "Pennonen",
        "Position": "Goalkeeper",
        "Torjunnat": 0,
        "Paastetyt_maalit": 0,
        "Syotot": 0,
        "Maalit": 0
    }
  ]
  const options = {ordered: true}
  dbo.collection("all_players").insertMany(doc, options, function(err, res) {
    if (err) throw err
    db.close()
  })
});