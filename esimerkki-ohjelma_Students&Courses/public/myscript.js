function chooseTag() {
  var hashTag = window.location.hash
  switch(hashTag)
  {
     case "#/students":
        findAllAndCreateTable_forStudents()
        document.getElementsByTagName('h1')[0].innerText = "Managing students"
        break;
     case "#/courses":
        findAllAndCreateTable_forCourses()
        document.getElementsByTagName('h1')[0].innerText = "Managing courses"
        break;

    default:
  }
}

window.addEventListener('DOMContentLoaded', (event) => {chooseTag()});
window.onhashchange = function() {chooseTag()}
