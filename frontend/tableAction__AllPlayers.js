var players = document.getElementsByTagName("tr");
for (var i = 0; i < players.length; i++) {
  if (players[i].classList.contains("reserved")) {
    players[i].style.opacity = "50%";
    players[i].getElementsByClassName("reserve_btn")[0].disabled = true;
  }
}
var btnz = document.getElementsByClassName("reserve_btn")
for (var i = 0; i < btnz.length; i++) {
  btnz[i].addEventListener('click', function() {
    window.alert("Olet varannut pelaajan")
  })
}
