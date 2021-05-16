const mongoose = require('mongoose')
const Player_schema = require('./player_schema.js')
const Myteam_model = mongoose.model('myteam', Player_schema)

module.exports = Myteam_model
