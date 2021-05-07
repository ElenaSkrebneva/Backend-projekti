function chooseTag() {
  var hashTag = window.location.hash
  switch(hashTag)
  {
     case "#/myteam":
        findAllAndCreateTable_forMyTeam()
        document.getElementsByTagName('h1')[0].innerText = "Minun joukkue"
        break;
     case "#/allplayers":
        findAllAndCreateTable_forAllPlayers()
        document.getElementsByTagName('h1')[0].innerText = "Kaikki pelaajat"
        break;

    default:
  }
}

window.addEventListener('DOMContentLoaded', (event) => {chooseTag()});
window.onhashchange = function() {chooseTag()}
