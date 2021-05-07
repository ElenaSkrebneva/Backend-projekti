var players = document.getElementsByTagName("tr");
for (var i = 0; i < players.length; i++) {
  if (players[i].classList.contains("reserved")) {
    players[i].style.opacity = "50%";
    players[i].getElementsByClassName("reserve_btn")[0].disabled = true;
  }
}
