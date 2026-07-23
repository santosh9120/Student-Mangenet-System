// =======================================
// Edit Student JavaScript
// Student Management System
// =======================================

const editForm = document.getElementById("editStudentForm");

// ============================
// Form Submit
// ============================

editForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;

    if(name === ""){

        alert("Student Name is Required");
        return;

    }

    if(roll === ""){

        alert("Roll Number is Required");
        return;

    }

    if(email === ""){

        alert("Email is Required");
        return;

    }

    if(mobile.length !== 10){

        alert("Enter Valid Mobile Number");
        return;

    }

    alert("Student Updated Successfully");

    console.log({

        Name:name,
        Roll:roll,
        Email:email,
        Mobile:mobile,
        Department:department,
        Year:year

    });

});

// ============================
// Email Validation
// ============================

document.getElementById("email").addEventListener("blur", function(){

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(this.value)){

        alert("Invalid Email Address");
        this.focus();

    }

});

// ============================
// Mobile Validation
// ============================

document.getElementById("mobile").addEventListener("keypress", function(e){

    if(e.key < '0' || e.key > '9'){

        e.preventDefault();

    }

});

// ============================
// Image Preview
// ============================

const fileInput = document.querySelector("input[type='file']");

if(fileInput){

    fileInput.addEventListener("change", function(){

        if(this.files.length > 0){

            alert("Selected File : " + this.files[0].name);

        }

    });

}

// ============================
// Reset Confirmation
// ============================

editForm.addEventListener("reset", function(e){

    if(!confirm("Cancel all changes?")){

        e.preventDefault();

    }

});

// ============================
// Auto Uppercase Roll Number
// ============================

document.getElementById("roll").addEventListener("keyup", function(){

    this.value = this.value.toUpperCase();

});

// ============================
// Current Date
// ============================

const today = new Date();

console.log("Today :", today.toLocaleDateString());

// ============================
// Page Loaded
// ============================

window.onload = function(){

    console.log("Edit Student Page Loaded Successfully");

};

// ============================
// Future API
// ============================

// fetch("http://localhost:5000/api/students/update",{
//     method:"PUT",
//     headers:{
//         "Content-Type":"application/json"
//     },
//     body:JSON.stringify(studentData)
// });
