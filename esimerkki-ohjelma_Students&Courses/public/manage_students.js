var my_students = [];
var gender = ['male', 'female'];
var port = 3000

function findAllAndCreateTable_forStudents() {
    document.querySelector("#errors").innerHTML = "";
    axios.get('http://localhost:'+port+'/students')
        .then(function (response) {
            my_students = response.data
            createTable_forStudents(my_students)
        })
        .catch(function (error) {
            console.log("error in fetching the students", error)
            document.getElementById("students_table").innerHTML = "";
        });
}

function createTable_forStudents (items) {
    // CREATE A TABLE.
    var table = document.createElement('table');
    table.setAttribute('id', 'students_table');     // SET TABLE ID.
    createHeaders_forStudents(table)

    // Adds all the data and buttons by looping all the authors
    items.forEach(function (item, index){
        var tr = table.insertRow(-1);
        // Adds the data
        addData_forStudents(tr, item)
        addButtons_forStudents(tr, index)
    });

    // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).
    addEmptyRow_forStudents(table)

    // Adds the new table to div
    var div = document.getElementById('container');
    // var div = document.querySelector("#container");
    div.innerHTML = '';
    div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
};

function createHeaders_forStudents(table) {
   // Luodaan rivi taulukon alkuun (header)
   var tr = table.insertRow(-1)
   // Määritellään taulukon headerit
   var col = ["id", "student number", "First name", "Last name", "email", "gender"];
   // ADD TABLE HEADERS.
   col.forEach(function(val){
       var th = document.createElement('th')
       th.innerHTML = val
       tr.appendChild(th)
   })
}

function addData_forStudents(tr, student) {
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = student['_id']

    tabCell = tr.insertCell(-1)
    tabCell.innerHTML = student.student_number
    //tabCell.style.display = "none"

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = student.first_name

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = student.last_name

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = student.email

    tabCell = tr.insertCell(-1);
    tabCell.innerHTML = student.gender
}


function addButtons_forStudents(tr, index) {
    var td = document.createElement('td');

    // *** CANCEL
    var lblCancel = document.createElement('label');
    lblCancel.innerHTML = "X"
    lblCancel.setAttribute('onclick', 'Cancel_students(this)');
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
    btSave.setAttribute('onclick', 'Save_students(this)');       // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btSave);

    // *** UPDATE.
    var btUpdate = document.createElement('input');
    btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
    btUpdate.setAttribute('value', 'Update');
    btUpdate.setAttribute('id', 'Edit' + index);
    btUpdate.setAttribute('style', 'background-color:#44CCEB;');
    btUpdate.setAttribute('onclick', 'Update_students(this)');   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btUpdate);
    tr.appendChild(td)

    // *** DELETE.
    td = document.createElement('th');
    tr.appendChild(td)
    var btDelete = document.createElement('input');
    btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
    btDelete.setAttribute('value', 'Delete');
    btDelete.setAttribute('style', 'background-color:#ED5650;');
    btDelete.setAttribute('onclick', 'Delete_students(this)');   // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btDelete);
}

function addEmptyRow_forStudents(table) {
    var tr = table.insertRow(-1);           // CREATE THE LAST ROW.

    var newCell = tr.insertCell(-1);  // EMPTY CELL FIRST

    for (var i = 0; i <3; i++) {
      // CREATE AND ADD A TEXTBOX.
      newCell = tr.insertCell(-1);
      var tBox = document.createElement('input');
      tBox.setAttribute('type', 'text');
      tBox.setAttribute('value', '');
      newCell.appendChild(tBox);
    }

    // CREATE AND ADD A TEXTBOX.
    newCell = tr.insertCell(-1);
    var tBox = document.createElement('input');
    tBox.setAttribute('type', 'email');
    tBox.setAttribute('value', '');
    newCell.appendChild(tBox);

    // CREATE AND ADD A DROPDOWN LIST.
    newCell = tr.insertCell(-1);
    var select = document.createElement('select');
    select.innerHTML = '<option value=""></option>';
    gender.forEach(function(gender_name) {
        select.innerHTML +=
            '<option value="' + gender_name + '">' + gender_name + '</option>';
    })
    newCell.appendChild(select);

    td = document.createElement('td');
    tr.appendChild(td);

    var newCell = tr.insertCell(-1);
    var btNew = document.createElement('input');
    btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
    btNew.setAttribute('value', 'Create');
    btNew.setAttribute('id', 'New');
    btNew.setAttribute('style', 'background-color:#207DD1;');
    btNew.setAttribute('onclick', 'CreateNew_students(this)');       // ADD THE BUTTON's 'onclick' EVENT.
    td.appendChild(btNew);
}
// ****** OPERATIONS START.

// CANCEL.

Cancel_students = function (oButton) {

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
    var tab = document.getElementById('students_table').rows[activeRow];
    tab.getElementsByTagName("td")[1].innerHTML = my_students[(activeRow - 1)]["student_number"];
    tab.getElementsByTagName("td")[2].innerHTML = my_students[(activeRow - 1)]["first_name"];
    tab.getElementsByTagName("td")[3].innerHTML = my_students[(activeRow - 1)]["last_name"];
    tab.getElementsByTagName("td")[4].innerHTML = my_students[(activeRow - 1)]["email"];
    tab.getElementsByTagName("td")[5].innerHTML = my_students[(activeRow - 1)]["gender"];
}

// EDIT DATA.
Update_students = function(oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    console.log("Active row = " + activeRow)
    var tab = document.getElementById('students_table').rows[activeRow];

    // First cell [0] is for id and this is not edited
    for (i = 1; i < 6; i++) {
        // SHOW A DROPDOWN LIST WITH A LIST OF GENDERS.
        if (i == 5) {
            var td = tab.getElementsByTagName("td")[i];
            var ele = document.createElement('select');      // DROPDOWN LIST.
            ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
            for (k = 0; k < gender.length; k++) {
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + gender[k] + '">' + gender[k] + '</option>';
            }
            td.innerText = '';
            td.appendChild(ele);
        }
        else {
            var td = tab.getElementsByTagName("td")[i];
            var ele = document.createElement('input');      // TEXTBOX.
            ele.setAttribute('type', 'text');
            ele.setAttribute('value', td.innerText);
            td.innerText = '';
            td.appendChild(ele);
        }
    }

    var lblCancel = document.getElementById('lbl' + (activeRow - 1));
    lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

    var btSave = document.getElementById('Save' + (activeRow - 1));
    btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

    // HIDE THIS BUTTON.
    oButton.setAttribute('style', 'display:none;');
};


// DELETE DATA.
Delete_students = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('students_table').rows[activeRow];

    var td = tab.getElementsByTagName("td")[0];
    var id = td.innerHTML;
    console.log("ID = ", id)

    axios.delete('http://localhost:'+port+'/students/' + id)
            .then(function (response) {
                //console.log(response.data)
                console.log("Response = ", response.status)
                findAllAndCreateTable_forStudents()
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("error in deleting the students", error)
            });
    // TODO
    /*
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    my_students.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
    createTable();                         // REFRESH THE TABLE.
    */
};

// SAVE DATA.
Save_students = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('students_table').rows[activeRow];

    var id = tab.getElementsByTagName("td")[0].innerHTML

    var td = tab.getElementsByTagName("td")[1];
    var student_number = td.childNodes[0].value;
    console.log("student number = ", student_number)

    td = tab.getElementsByTagName("td")[2];
    var studentFName = td.childNodes[0].value;
    console.log("firstname = ", td)

    td = tab.getElementsByTagName("td")[3];
    var studentLName = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[4];
    var studentEmail = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[5];
    var studentGender = td.childNodes[0].value;

    var student = {
        student_number: student_number,
        first_name:studentFName,
        last_name: studentLName,
        email: studentEmail,
        gender: studentGender
    }

    console.log("Student = ", student)
    console.log("URL = " + 'http://localhost:'+port+'/students/' + id)
    axios.put('http://localhost:'+port+'/students/' + id, student)
            .then(function (response) {
                //console.log(response.data)
                console.log("Response = ", response.status)
                findAllAndCreateTable_forStudents()
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("Error: " + error)
            });
}

// CREATE NEW.
CreateNew_students = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('students_table').rows[activeRow];


    var td = tab.getElementsByTagName("td")[1];
    var student_number = td.childNodes[0].value;
    console.log("student number = ", student_number)

    td = tab.getElementsByTagName("td")[2];
    var studentFName = td.childNodes[0].value;
    console.log("firstname = ", td)

    td = tab.getElementsByTagName("td")[3];
    var studentLName = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[4];
    var studentEmail = td.childNodes[0].value;

    td = tab.getElementsByTagName("td")[5];
    var studentGender = td.childNodes[0].value;

    var student = {
        student_number: student_number,
        first_name:studentFName,
        last_name: studentLName,
        email: studentEmail,
        gender: studentGender
    }

    axios.post('http://localhost:'+port+'/students/', student)
            .then(function (response) {
                console.log("Response = ", response.status)
                findAllAndCreateTable_forStudents()
            })
            .catch(function (error) {
                document.querySelector("#errors").innerHTML = error
                console.log("error in saving the students", error)
            });
}