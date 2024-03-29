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
    document.querySelector("#points_together").innerHTML = "";
    axios.get('http://localhost:'+port+'/allplayers')
        .then(function (response) {
            var my_players = response.data
            // jakaa pelaajia kenttäpelaajiin ja maalivahteihin
            var kenttapelaajat = []
            var maalivahdit = []
            for (var i = 0; i < my_players.length; i++) {
              if (my_players[i]["position"] === "Goalkeeper") {
                maalivahdit.push(my_players[i])
              }
              else {kenttapelaajat.push(my_players[i])}
            }
            createTable_forAllPlayers(kenttapelaajat)
            createTable_forAllGoalkeepers(maalivahdit)
        })
        .catch(function (error) {
            console.log("error in fetching the players. ", error)
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
   var th1 = document.createElement('th')
   th1.innerHTML = "picture"
   tr.appendChild(th1)
   headers.forEach(function(val){
       var th = document.createElement('th')
       th.innerHTML = val
       tr.appendChild(th)
   })
}

function addData_forAllPlayers(tr, player, headers) {
    var new_cell = tr.insertCell(-1)
    new_cell.innerHTML = `<img src="player${player.player_number}.jpg" width=100 height=100 alt="${player.first_name} ${player.last_name}">`
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
    btDelete.setAttribute('onclick', func);   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btDelete);
    tr.appendChild(td)
}


function delete_fromAllPlayers (oButton) {
  axios.get('http://localhost:'+port+'/myteam')
      .then(function (response) {
          var myteam_players = response.data
          console.log("Myplayers team length is" + myteam_players.length)
          // jakaa pelaajia kenttäpelaajiin ja maalivahteihin
          if (myteam_players.length < 6) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('allplayers_table').rows[activeRow];
            var td = tab.getElementsByTagName("td")[1];
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
              var fieldVal = tab.getElementsByTagName("td")[i+1].innerHTML
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
                        console.log("Error in putting a player into MyTeam database." + error)
                    });

            axios.delete('http://localhost:'+port+'/allplayers/' + id)
                    .then(function (response) {
                        //console.log(response.data)
                        console.log("Response = ", response.status)
                        findAllAndCreateTable_forAllPlayers()
                    })
                    .catch(function (error) {
                        document.querySelector("#errors").innerHTML = error
                        console.log("error in deleting a player from AllPlayers database. ", error)
                    });
            window.alert("Olet varannut pelaajan")
          }
          else {
            window.alert("Sinulla on jo 6 pelaajaa joukkueessasi. Sinun pitää vapauttaa pelaaja ennen kuin voit varata uuden")
          }
      })
      .catch(function (error) {
          document.querySelector("#errors").innerHTML = error
          console.log("error in fetching the playersfrom myteam. ", error)
      });

};

function delete_fromAllGoalkeepers (oButton) {
  axios.get('http://localhost:'+port+'/myteam')
      .then(function (response) {
          var myteam_players = response.data
          var myteam_maalivahdit = []
          for (var i = 0; i < myteam_players.length; i++) {
            if (myteam_players[i]["position"] === "Goalkeeper") {
              myteam_maalivahdit.push(myteam_players[i]);
            }
          }
          console.log("Myplayers team length is" + myteam_players.length)
          console.log("My goalkeepers length is" + myteam_maalivahdit.length)
          // jakaa pelaajia kenttäpelaajiin ja maalivahteihin
          if (myteam_players.length >= 6) {
            window.alert("Sinulla on jo 6 pelaajaa joukkueessasi. Sinun pitää vapauttaa pelaaja ennen kuin voit varata uuden")
          }
          else if (myteam_maalivahdit.length > 0) {
            window.alert("Sinulla on jo maalivahti")
          }
          else {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('allgoalkeepers_table').rows[activeRow];
            var td = tab.getElementsByTagName("td")[1];
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
              var fieldVal = tab.getElementsByTagName("td")[i+1].innerHTML
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
                        console.log("Error in putting a goalkeeper into MyTeam database. " + error)
                    });

            axios.delete('http://localhost:'+port+'/allplayers/' + id)
                    .then(function (response) {
                        //console.log(response.data)
                        console.log("Response = ", response.status)
                        findAllAndCreateTable_forAllPlayers()
                    })
                    .catch(function (error) {
                        document.querySelector("#errors").innerHTML = error
                        console.log("error in deleting a goalkeeper from AllPlayers database. ", error)
                    });
            window.alert("Olet varannut maalivahdin")
          }
      })
      .catch(function (error) {
          document.querySelector("#errors").innerHTML = error
          console.log("error in fetching the players from myteam. ", error)
      });
};
