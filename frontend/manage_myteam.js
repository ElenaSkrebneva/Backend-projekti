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

function findAllAndCreateTable_forMyTeam() {
    document.querySelector("#errors").innerHTML = "";
    axios.get('http://localhost:'+port+'/myteam')
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
            createTable_forMyTeam(my_players)
            createTable_forMyGoalkeepers(maalivahdit)
        })
        .catch(function (error) {
            console.log("error in fetching the players", error)
            document.getElementById("myteam_table").innerHTML = "";
            document.getElementById("mygoalkeepers_table").innerHTML = "";
        });
}

function createTable_forMyTeam (items) {
    var table = document.createElement('table');
    table.setAttribute('id', 'myteam_table');     // SET TABLE ID.
    createHeaders_forMyTeam(table, headersForPlayers)
    items.forEach(function (item){
        var tr = table.insertRow(-1);
        addData_forMyTeam(tr, item, headersForPlayers)
        addButtons_forMyTeam(tr, 'delete_fromMyTeam(this)')
    });

    var div = document.getElementById('container');
    div.innerHTML = '';
    div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
};

function createTable_forMyGoalkeepers (items) {
    var table = document.createElement('table');
    table.setAttribute('id', 'mygoalkeepers_table');
    createHeaders_forMyTeam(table, headersForGoalkeepers)
    items.forEach(function (item){
        var tr = table.insertRow(-1);
        addData_forMyTeam(tr, item, headersForGoalkeepers)
        addButtons_forMyTeam(tr, 'delete_fromMyGoalkeepers(this)')
    });
    var div = document.getElementById('container2');
    div.innerHTML = '';
    div.appendChild(table);
};

function createHeaders_forMyTeam(table, headers) {
   var tr = table.insertRow(-1)
   headers.forEach(function(val){
       var th = document.createElement('th')
       th.innerHTML = val
       tr.appendChild(th)
   })
}

function addData_forMyTeam(tr, player, headers) {
    headers.forEach(function(val) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = player[val];
    })
}


function addButtons_forMyTeam(tr, func) {
    var td = document.createElement('td');
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
    btDelete.setAttribute('value', 'Vapauta');
    btDelete.classList.add("reserve_btn");
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', func);   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btDelete);
    tr.appendChild(td)
}


function delete_fromMyTeam (oButton) {
  var activeRow = oButton.parentNode.parentNode.rowIndex;
  var tab = document.getElementById('myteam_table').rows[activeRow];
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
  axios.post('http://localhost:'+port+'/allplayers/', player)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("Error in putting a player into allplayers database" + error)
          });

  axios.delete('http://localhost:'+port+'/myteam/' + id)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
              findAllAndCreateTable_forMyTeam()
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("error in deleting a player from myteam database", error)
          });
  window.alert("Olet vapauttanut pelaajan")
};

function delete_fromMyGoalkeepers (oButton) {
  var activeRow = oButton.parentNode.parentNode.rowIndex;
  var tab = document.getElementById('mygoalkeepers_table').rows[activeRow];
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
  axios.post('http://localhost:'+port+'/allplayers/', goalkeeper)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("Error in putting a goalkeeper into allplayers database" + error)
          });

  axios.delete('http://localhost:'+port+'/myteam/' + id)
          .then(function (response) {
              //console.log(response.data)
              console.log("Response = ", response.status)
              findAllAndCreateTable_forMyTeam()
          })
          .catch(function (error) {
              document.querySelector("#errors").innerHTML = error
              console.log("error in deleting a goalkeeper from myteam database", error)
          });
  window.alert("Olet vapauttanut maalivahdin")
};
