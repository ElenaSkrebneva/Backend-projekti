var my_players = [];
import {PORT as port, HEADERS as headers} from './constants.js';

function findAllAndCreateTable_forAllPlayers() {
    document.querySelector("#errors").innerHTML = "";
    axios.get('http://localhost:'+port+'/allplayers')
        .then(function (response) {
            my_players = response.data
            createTable_forAllPlayers(my_players)
        })
        .catch(function (error) {
            console.log("error in fetching the players", error)
            document.getElementById("allplayers_table").innerHTML = "";
        });
}

function createTable_forAllPlayers (items) {
    var table = document.createElement('table');
    table.setAttribute('id', 'allplayers_table');     // SET TABLE ID.
    createHeaders_forAllPlayers(table)

    // Adds all the data and buttons by looping all the authors
    items.forEach(function (item){
        var tr = table.insertRow(-1);
        // Adds the data
        addData_forAllPlayers(tr, item)
        addButtons_forAllPlayers(tr)
    });

    // Adds the new table to div
    var div = document.getElementById('container');
    // var div = document.querySelector("#container");
    div.innerHTML = '';
    div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
};

function createHeaders_forAllPlayers(table) {
   // Luodaan rivi taulukon alkuun (header)
   var tr = table.insertRow(-1)
   // ADD TABLE HEADERS.
   headers.forEach(function(val){
       var th = document.createElement('th')
       th.innerHTML = val
       tr.appendChild(th)
   })
}

function addData_forAllPlayers(tr, player) {
    headers.forEach(function(val) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = player[val];
    })
}


function addButtons_forAllPlayers(tr) {
    var td = document.createElement('td');
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
    btDelete.setAttribute('value', 'Varaa');
    btDelete.classList.add("reserve_btn");
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', 'Delete_fromAllPlayers(this)');   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btDelete);
    tr.appendChild(td)
}

// DELETE DATA.
Delete_fromAllPlayers = function (oButton) {
  var activeRow = oButton.parentNode.parentNode.rowIndex;
  var tab = document.getElementById('allplayers_table').rows[activeRow];
  var player = {
    "PlayerNumber" : 0,
    "first_name": "",
    "last_name": "",
    "Position": "",
    "Maalit": 0,
    "Syotot": 0,
    "Laukaukset": 0,
    "Blokkaukset": 0,
    "Takalukset": 0,
    "Tehotilasto": 0
  }
  var keys = Object.keys(player)
  for (var i = 0; i < keys.length; i++) {
    var fieldVal = tab.getElementsByTagName("td")[i].innerHTML
    player[keys[i]] = fieldVal
  }
  var id = tab.getElementsByTagName("td")[0].innerHTML
  console.log("player = ", player)
  axios.post('http://localhost:'+port+'/myteam/', player)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("Error in putting a player into MyTeam database" + error)
          });

  axios.delete('http://localhost:'+port+'/allplayers/' + id)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
              findAllAndCreateTable_forAllPlayers()
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("error in deleting a player from AllPlayers database", error)
          });
  window.alert("Olet varannut pelaajan")
};