// ===============================
// Student Management System
// Add Student JavaScript
// ===============================

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const photo = document.getElementById("photo").files[0];

    // Validation

    if(name === ""){
        alert("Please Enter Student Name");
        return;
    }

    if(roll === ""){
        alert("Please Enter Roll Number");
        return;
    }

    if(email === ""){
        alert("Please Enter Email");
        return;
    }

    if(mobile.length != 10){
        alert("Mobile Number Must be 10 Digits");
        return;
    }

    if(password.length < 6){
        alert("Password Must Contain At Least 6 Characters");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords Do Not Match");
        return;
    }

    const student = {

        name:name,
        roll:roll,
        email:email,
        mobile:mobile,
        department:department,
        year:year,
        password:password,
        photo: photo ? photo.name : ""

    };

    console.log(student);

    alert("Student Added Successfully");

    studentForm.reset();

});


// ===============================
// Image Preview
// ===============================

const photoInput = document.getElementById("photo");

photoInput.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        console.log("Selected Image :", file.name);

    }

});


// ===============================
// Email Validation
// ===============================

document.getElementById("email").addEventListener("blur", function(){

    const email = this.value;

    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(email != ""){

        if(!pattern.test(email)){

            alert("Invalid Email Address");

            this.focus();

        }

    }

});


// ===============================
// Mobile Validation
// ===============================

document.getElementById("mobile").addEventListener("keypress", function(e){

    if(e.key < '0' || e.key > '9'){

        e.preventDefault();

    }

});


// ===============================
// Reset Button
// ===============================

studentForm.addEventListener("reset", function(){

    const confirmReset = confirm("Clear the Form?");

    if(!confirmReset){

        event.preventDefault();

    }

});


// ===============================
// Welcome Message
// ===============================

window.onload = function(){

    console.log("Add Student Page Loaded");

}
