const express = require('express')
const app = express()
const parser = require('body-parser')
const url = require('url')
const path = require('path')
app.use(parser.json())
app.use(express.static('../frontend'))
app.use(express.static('../style'))
const mongoose = require('mongoose')
require("./db")
const PORT = 3000
const Allplayer_model = require('./models/allplayer_player')
const Myteam_model = require('./models/myteam_player')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/../index.html'))
})

app.get('/allplayers', (req, res) => {
  Allplayer_model.find({})
  .sort({player_number: 1})
  .exec((err, result) => {
    if (err) {res.status(500).send("Error in finding players")}
    else {res.status(200).send(result)}
  })
})

app.get('/myteam', (req, res) => {
  Myteam_model.find({})
  .sort({player_number: 1})
  .exec((err, result) => {
    if (err) {res.status(500).send("Error in finding myTeam")}
    else {res.status(200).send(result)}
  })
})

app.post('/allplayers', (req, res) => {
  var new_toallplayers = req.body
  var new_toallplayers_instance = new Allplayer_model(new_toallplayers)
  new_toallplayers_instance.save(err => {
    if (err) res.status(500).send("Error in saving: " + err)
    else {res.status(201).send("Player added to all players")}
  })
})

app.post('/myteam', (req, res) => {
  var new_tomyteam = req.body
  var new_tomyteam_instance = new Myteam_model(new_tomyteam)
  new_tomyteam_instance.save(err => {
    if (err) res.status(500).send("Error in saving: " + err)
    else {res.status(201).send("New player added to my team")}
  })
})

app.delete('/allplayers/:id', (req, res) => {
  var num = req.params.id
  Allplayer_model.findByIdAndDelete(num, (err, result) => {
    if (err) res.status(500).send("An error in handling the deleteOne request")
    else if (result) {
      console.log(result)
      res.status(200).send("Deleted")
    }
    else res.status(403).send("Could not delete the player document from all players")
  })
})

app.delete('/myteam/:id', (req, res) => {
  var num = req.params.id
  Myteam_model.findByIdAndDelete(num, (err, result) => {
    if (err) res.status(500).send("An error in handling the deleteOne request")
    else if (result) {
      console.log(result)
      res.status(200).send("Deleted")
    }
    else res.status(403).send("Could not delete the player document from my team")
  })
})

app.listen(PORT, function() {
  console.log('app listening at http://localhost:'+PORT)
})
