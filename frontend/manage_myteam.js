var my_players = [];
var port = 3000;
var headers = [
  "_id",
  "PlayerNumber",
  "first_name",
  "last_name",
  "Position",
  "Maalit",
  "Syotot",
  "Laukaukset",
  "Blokkaukset",
  "Takalukset",
  "Tehotilasto"
];

function findAllAndCreateTable_forMyTeam() {
    document.querySelector("#errors").innerHTML = "";
    axios.get('http://localhost:'+port+'/myteam')
        .then(function (response) {
            my_players = response.data;
            console.log(my_players);
            createTable_forMyTeam(my_players)
        })
        .catch(function (error) {
            console.log("error in fetching the players", error)
            document.getElementById("myteam_table").innerHTML = "";
        });
}

function createTable_forMyTeam (items) {
    var table = document.createElement('table');
    table.setAttribute('id', 'myteam_table');     // SET TABLE ID.
    createHeaders_forMyTeam(table)

    // Adds all the data and buttons by looping all the authors
    items.forEach(function (item){
        var tr = table.insertRow(-1);
        // Adds the data
        addData_forMyTeam(tr, item)
        addButtons_forMyTeam(tr)
    });

      // Adds the new table to div
    var div = document.getElementById('container');
    // var div = document.querySelector("#container");
    div.innerHTML = '';
    div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
};

function createHeaders_forMyTeam(table) {
   // Luodaan rivi taulukon alkuun (header)
   var tr = table.insertRow(-1)
   // ADD TABLE HEADERS.
   headers.forEach(function(val){
       var th = document.createElement('th')
       th.innerHTML = val
       tr.appendChild(th)
   })
}

function addData_forMyTeam(tr, player) {
    headers.forEach(function(val) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = player[val];
    })
}


function addButtons_forMyTeam(tr) {
    var td = document.createElement('th');
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
    btDelete.setAttribute('value', 'Vapauta');
    btDelete.classList.add("free_btn");
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', 'delete_fromMyTeam(this)');   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btDelete);
    tr.appendChild(td)
}

// DELETE DATA.
function delete_fromMyTeam (oButton) {
  var activeRow = oButton.parentNode.parentNode.rowIndex;
  var tab = document.getElementById('myteam_table').rows[activeRow];
  var player = {
    "_id": 0,
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
  console.log("player = ", player)
  axios.post('http://localhost:'+port+'/allplayers/', player)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("Error in putting a player into AllPlayers database" + error)
          });

  axios.delete('http://localhost:'+port+'/myteam/' + id)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
              findAllAndCreateTable_forMyTeam()
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("error in deleting a player from MyTeam database", error)
          });
  window.alert("Olet vapauttanut pelaajan")
};
