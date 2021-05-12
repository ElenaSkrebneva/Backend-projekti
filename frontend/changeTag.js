function chooseTag() {
  var hashTag = window.location.hash
  switch(hashTag)
  {
     case "#/myteam":
        findAllAndCreateTable_forMyTeam()
        document.getElementsByTagName('h1')[0].innerText = "Oma jääkiekkojoukkueesi koostuu seuraavista pelaajista"
        break;
     case "#/allplayers":
        findAllAndCreateTable_forAllPlayers()
        document.getElementsByTagName('h1')[0].innerText = "Valitse pelaajat omaan joukkueeseen"
        break;

    default:
  }
}

window.addEventListener('DOMContentLoaded', (event) => {chooseTag()});
window.onhashchange = function() {chooseTag()}
