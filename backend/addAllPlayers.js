var mongo = require('mongodb').MongoClient;
var address = "mongodb://localhost:27017/";

mongo.connect(address, function(err, db) {
  if (err) throw err;
  var dbo = db.db("project2");
  dbo.createCollection("allplayers", function(err, res) {
    if (err) throw err;
    console.log("collection allplayers created!");
  });
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
    {
      "player_number": 11,
      "first_name": "Milla",
      "last_name": "Magia",
      "position": "Goalkeeper",
      "syotot": 0,
      "maalit": 0,
      "torjunnat": 0,
      "paastetyt_maalit": 0,
    },
    {
      "player_number": 12,
      "first_name": "Kroisos",
      "last_name": "Pennonen",
      "position": "Goalkeeper",
      "torjunnat": 0,
      "paastetyt_maalit": 0,
      "syotot": 0,
      "maalit": 0
    }
  ];
  const options = {ordered: true}
  dbo.collection("allplayers").insertMany(docs, options, function(err, res) {
    if (err) throw err
  })
  dbo.createCollection("myteam", function(err, res) {
    if (err) throw err;
    console.log("collection myteam created!");
    db.close()
  });
});
