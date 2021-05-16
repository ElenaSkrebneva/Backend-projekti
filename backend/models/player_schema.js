const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Player_schema = new Schema({
  player_number: {type: Number, min: [0, "Player number cannot be smaller than 0"], max: [99, "Player number cannot be greater than 99"], required: [true, "This field is requiried"]},
  first_name: {type: String, maxlength: [50, "max length is 50 symbols"], required: [true, "This field is requiried"], trim: true},
  last_name: {type: String, maxlength: [50, "max length is 50 symbols"], required: [true, "This field is requiried"], trim: true},
  position: {type: String, enum: ["Forward", "Defender", "Goalkeeper"], required: [true, "Fill in the position"]},
  maalit:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  syotot:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"], required: [true, "This field is requiried"]},
  laukaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  blokkaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  taklaukset:{type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  tehotilasto:{type: Number, min: [-99,"Cannot be smaller than -99"], max: [99, "Cannot be greater than 99"]},
  torjunnat: {type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
  paastetyt_maalit: {type: Number, min: [0,"Cannot be smaller than 0"], max: [99, "Cannot be greater than 99"]},
})

module.exports = Player_schema
