var all_courses = [];
var port = 3000

function findAllAndCreateTable_forCourses() {
    document.querySelector("#errors").innerHTML = "";
    axios.get('http://localhost:'+port+'/courses')
        .then(function (response) {
            all_courses = response.data
            createTable_forCourses(all_courses)
        })
        .catch(function (error) {
            console.log("error in fetching the courses", error)
            document.getElementById("courses_table").innerHTML = "";
        });
}

function createTable_forCourses (items) {
    // CREATE A TABLE.
    var table = document.createElement('table');
    table.setAttribute('id', 'courses_table');     // SET TABLE ID.
    createHeaders_forCourses(table)

    // Adds all the data and buttons by looping all the authors
    items.forEach(function (item, index){
        var tr = table.insertRow(-1);
        // Adds the data
        addData_forCourses(tr, item)
        addButtons_forCourses(tr, index)
    });

    // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).
    addEmptyRow_forCourses(table)

    // Adds the new table to div
    var div = document.getElementById('container');
    // var div = document.querySelector("#container");
    div.innerHTML = '';
    div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
};

function createHeaders_forCourses(table) {
   // Luodaan rivi taulukon alkuun (header)
   var tr = table.insertRow(-1)
   // Määritellään taulukon headerit
   var col = ["database id", "school id", "course_name", "credits", "study_year", "teacher"];
   // ADD TABLE HEADERS.
   col.forEach(function(val){
       var th = document.createElement('th')
       th.innerHTML = val
       tr.appendChild(th)
   })
}

function addData_forCourses(tr, course) {
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = course['_id']

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = course.id
    //tabCell.style.display = "none"

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = course.course_name

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = course.credits

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = course.study_year

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = course.teacher
}


function addButtons_forCourses(tr, index) {
    var td = document.createElement('td');

    // *** CANCEL
    var lblCancel = document.createElement('label');
    lblCancel.innerHTML = "X"
    lblCancel.setAttribute('onclick', 'Cancel_courses(this)');
    lblCancel.setAttribute('style', 'display:none;');
    lblCancel.setAttribute('title', 'Cancel');
    lblCancel.setAttribute('id', 'lbl' + index);
    td.appendChild(lblCancel);

        // *** SAVE.
    var btSave = document.createElement('input');
    btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
    btSave.setAttribute('value', 'Save');
    btSave.setAttribute('id', 'Save' + index);
    btSave.setAttribute('style', 'display:none;');
    btSave.setAttribute('onclick', 'Save_courses(this)');       // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btSave);

    // *** UPDATE.
    var btUpdate = document.createElement('input');
    btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
    btUpdate.setAttribute('value', 'Update');
    btUpdate.setAttribute('id', 'Edit' + index);
    btUpdate.setAttribute('style', 'background-color:#44CCEB;');
    btUpdate.setAttribute('onclick', 'Update_courses(this)');   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btUpdate);
    tr.appendChild(td)

    // *** DELETE.
    td = document.createElement('th');
    tr.appendChild(td)
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
    btDelete.setAttribute('value', 'Delete');
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', 'Delete_courses(this)');   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btDelete);
}

function addEmptyRow_forCourses(table) {
    var tr = table.insertRow(-1);           // CREATE THE LAST ROW.

    var newCell = tr.insertCell(-1);  // EMPTY CELL FIRST

    for (var i = 0; i <5; i++) {
      // CREATE AND ADD A TEXTBOX.
      newCell = tr.insertCell(-1);
      var tBox = document.createElement('input');
      tBox.setAttribute('type', 'text');
      tBox.setAttribute('value', '');
      newCell.appendChild(tBox);
    }

    td = document.createElement('td');
    tr.appendChild(td);
    var newCell = tr.insertCell(-1);
    var btNew = document.createElement('input');
    btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
    btNew.setAttribute('value', 'Create');
    btNew.setAttribute('id', 'New');
    btNew.setAttribute('style', 'background-color:#207DD1;');
    btNew.setAttribute('onclick', 'CreateNew_courses(this)');       // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btNew);
}
// ****** OPERATIONS START.

// CANCEL.

Cancel_courses = function (oButton) {

    // HIDE THIS BUTTON.
    oButton.setAttribute('style', 'display:none; float:none;');

    var activeRow = oButton.parentNode.parentNode.rowIndex;

    // HIDE THE SAVE BUTTON.
    var btSave = document.getElementById('Save' + (activeRow - 1));
    btSave.setAttribute('style', 'display:none;');

    // SHOW THE UPDATE BUTTON AGAIN.
    var btUpdate = document.getElementById('Edit' + (activeRow - 1));
    btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

    // Fetch the old data back to the table
    var tab = document.getElementById('courses_table').rows[activeRow];
    tab.getElementsByTagName("td")[1].innerHTML = all_courses[(activeRow - 1)]["id"];
    tab.getElementsByTagName("td")[2].innerHTML = all_courses[(activeRow - 1)]["course_name"];
    tab.getElementsByTagName("td")[3].innerHTML = all_courses[(activeRow - 1)]["credits"];
    tab.getElementsByTagName("td")[4].innerHTML = all_courses[(activeRow - 1)]["study_year"];
    tab.getElementsByTagName("td")[5].innerHTML = all_courses[(activeRow - 1)]["teacher"];
}

// EDIT DATA.
Update_courses = function(oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    console.log("Active row = " + activeRow)
    var tab = document.getElementById('courses_table').rows[activeRow];

    // First cell [0] is for id and this is not edited
    for (i = 1; i < 6; i++) {
      var td = tab.getElementsByTagName("td")[i];
      var ele = document.createElement('input');      // TEXTBOX.
      ele.setAttribute('type', 'text');
      ele.setAttribute('value', td.innerText);
      td.innerText = '';
      td.appendChild(ele);
    }

    var lblCancel = document.getElementById('lbl' + (activeRow - 1));
    lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

    var btSave = document.getElementById('Save' + (activeRow - 1));
    btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

    // HIDE THIS BUTTON.
    oButton.setAttribute('style', 'display:none;');
};


// DELETE DATA.
Delete_courses = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('courses_table').rows[activeRow];

    var td = tab.getElementsByTagName("td")[0];
    var id = td.innerHTML;
    console.log("ID = ", id)

    axios.delete('http://localhost:'+port+'/courses/' + id)
            .then(function (response) {
                //console.log(response.data)
                console.log("Response = ", response.status)
                findAllAndCreateTable_forCourses()
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("error in deleting the courses", error)
            });
};

// SAVE DATA.
Save_courses = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('courses_table').rows[activeRow];

    var _id = tab.getElementsByTagName("td")[0].innerHTML

    var td = tab.getElementsByTagName("td")[1];
    var course_id = td.childNodes[0].value;
    console.log("course id = ", course_id)

    td = tab.getElementsByTagName("td")[2];
    var course_name = td.childNodes[0].value;
    console.log("course name = ", course_name)

    td = tab.getElementsByTagName("td")[3];
    var credits = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[4];
    var study_year = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[5];
    var teacher = td.childNodes[0].value;

    var course = {
        id: course_id,
        course_name,
        credits,
        study_year,
        teacher
    }

    console.log("course = ", course)
    console.log("URL = " + 'http://localhost:'+port+'/courses/' + _id)
    axios.put('http://localhost:'+port+'/courses/' + _id, course)
            .then(function (response) {
                //console.log(response.data)
                console.log("Response = ", response.status)
                findAllAndCreateTable_forCourses()
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("Error: " + error)
            });
}

// CREATE NEW.
CreateNew_courses = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('courses_table').rows[activeRow];

    var td = tab.getElementsByTagName("td")[1];
    var course_id = td.childNodes[0].value;
    console.log("course id = ", course_id)

    td = tab.getElementsByTagName("td")[2];
    var course_name = td.childNodes[0].value;
    console.log("course name = ", course_name)

    td = tab.getElementsByTagName("td")[3];
    var credits = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[4];
    var study_year = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[5];
    var teacher = td.childNodes[0].value;

    var course = {
        id: course_id,
        course_name,
        credits,
        study_year,
        teacher
    }

    axios.post('http://localhost:'+port+'/courses/', course)
            .then(function (response) {
                console.log("Response = ", response.status)
                findAllAndCreateTable_forCourses()
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("error in saving the courses", error)
            });
}
