var my_players = [];
var port = 3000;
var headersForPlayers = [
  "_id",
  "player_number",
  "first_name",
  "last_name",
  "position",
  "maalit",
  "syotot",
  "laukaukset",
  "blokkaukset",
  "taklaukset",
  "tehotilasto"
];
var headersForGoalkeepers = [
  "_id",
  "player_number",
  "first_name",
  "last_name",
  "position",
  "maalit",
  "syotot",
  "torjunnat",
  "paastetyt_maalit"
]

function findAllAndCreateTable_forAllPlayers() {
    document.querySelector("#errors").innerHTML = "";
    axios.get('http://localhost:'+port+'/allplayers')
        .then(function (response) {
            my_players = response.data
            // jakaa pelaajia kenttäpelaajiin ja maalivahteihin
            var maalivahdit = [];
            for (var i = 0; i < my_players.length; i++) {
              if (my_players[i]["position"] === "Goalkeeper") {
                maalivahdit.push(my_players[i]);
                my_players.splice(i, 1);
                i--;
              }
            }
            console.log(my_players);
            console.log(maalivahdit);
            createTable_forAllPlayers(my_players)
            createTable_forAllGoalkeepers(maalivahdit)
        })
        .catch(function (error) {
            console.log("error in fetching the players", error)
            document.getElementById("allplayers_table").innerHTML = "";
            document.getElementById("allgoalkeepers_table").innerHTML = "";
        });
}

function createTable_forAllPlayers (items) {
    var table = document.createElement('table');
    table.setAttribute('id', 'allplayers_table');     // SET TABLE ID.
    createHeaders_forAllPlayers(table, headersForPlayers)
    items.forEach(function (item){
        var tr = table.insertRow(-1);
        addData_forAllPlayers(tr, item, headersForPlayers)
        addButtons_forAllPlayers(tr, 'delete_fromAllPlayers(this)')
    });

    var div = document.getElementById('container');
    div.innerHTML = '';
    div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
};

function createTable_forAllGoalkeepers (items) {
    var table = document.createElement('table');
    table.setAttribute('id', 'allgoalkeepers_table');
    createHeaders_forAllPlayers(table, headersForGoalkeepers)
    items.forEach(function (item){
        var tr = table.insertRow(-1);
        addData_forAllPlayers(tr, item, headersForGoalkeepers)
        addButtons_forAllPlayers(tr, 'delete_fromAllGoalkeepers(this)')
    });
    var div = document.getElementById('container2');
    div.innerHTML = '';
    div.appendChild(table);
};

function createHeaders_forAllPlayers(table, headers) {
   var tr = table.insertRow(-1)
   headers.forEach(function(val){
       var th = document.createElement('th')
       th.innerHTML = val
       tr.appendChild(th)
   })
}

function addData_forAllPlayers(tr, player, headers) {
    headers.forEach(function(val) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = player[val];
    })
}


function addButtons_forAllPlayers(tr, func) {
    var td = document.createElement('td');
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
    btDelete.setAttribute('value', 'Varaa');
    btDelete.classList.add("reserve_btn");
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', func);   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btDelete);
    tr.appendChild(td)
}


function delete_fromAllPlayers (oButton) {
  var activeRow = oButton.parentNode.parentNode.rowIndex;
  var tab = document.getElementById('allplayers_table').rows[activeRow];
  var td = tab.getElementsByTagName("td")[0];
  var id = td.innerHTML;
  var player = {
    "_id": id,
    "player_number" : 0,
    "first_name": "",
    "last_name": "",
    "position": "",
    "maalit": 0,
    "syotot": 0,
    "laukaukset": 0,
    "blokkaukset": 0,
    "taklaukset": 0,
    "tehotilasto": 0
  }
  var keys = Object.keys(player)
  for (var i = 0; i < keys.length; i++) {
    var fieldVal = tab.getElementsByTagName("td")[i].innerHTML
    player[keys[i]] = fieldVal
  }
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

function delete_fromAllGoalkeepers (oButton) {
  var activeRow = oButton.parentNode.parentNode.rowIndex;
  var tab = document.getElementById('allgoalkeepers_table').rows[activeRow];
  var td = tab.getElementsByTagName("td")[0];
  var id = td.innerHTML;
  var goalkeeper = {
    "_id": id,
    "player_number" : 0,
    "first_name": "",
    "last_name": "",
    "position": "",
    "maalit": 0,
    "syotot": 0,
    "torjunnat": 0,
    "paastetyt_maalit": 0
  }
  var keys = Object.keys(goalkeeper)
  for (var i = 0; i < keys.length; i++) {
    var fieldVal = tab.getElementsByTagName("td")[i].innerHTML
    goalkeeper[keys[i]] = fieldVal
  }
  console.log("goalkeeper = ", goalkeeper)
  axios.post('http://localhost:'+port+'/myteam/', goalkeeper)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("Error in putting a goalkeeper into MyTeam database" + error)
          });

  axios.delete('http://localhost:'+port+'/allplayers/' + id)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
              findAllAndCreateTable_forAllPlayers()
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("error in deleting a goalkeeper from AllPlayers database", error)
          });
  window.alert("Olet varannut maalivahdin")
};
