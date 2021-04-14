  var btnz = document.getElementsByClassName("free_btn")
  for (var i = 0; i < btnz.length; i++) {
    btnz[i].addEventListener('click', function() {
      window.alert("Olet vapauttanut pelaajan")
    })
  }
