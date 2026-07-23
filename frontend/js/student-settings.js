// ==========================================
// Student Settings JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadTheme();

    loadStudentData();

    profileImagePreview();

    saveSettings();

    passwordValidation();

    logout();

    setInterval(updateClock, 1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.innerHTML = now.toLocaleString();

}

// ==========================================
// Admin Controlled Dark Mode
// ==========================================

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }

}

// Refresh theme every 2 seconds
setInterval(loadTheme, 2000);

// ==========================================
// Load Student Data
// ==========================================

function loadStudentData() {

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) return;

    document.getElementById("studentName").value =
        student.name || "";

    document.getElementById("studentEmail").value =
        student.email || "";

    document.getElementById("studentPhone").value =
        student.phone || "";

    if (student.id) {

        document.getElementById("studentId").innerHTML =
            student.id;

    }

    if (student.profileImage) {

        document.getElementById("profilePreview").src =
            student.profileImage;

    }

}

// ==========================================
// Profile Image Preview
// ==========================================

function profileImagePreview() {

    const file = document.getElementById("profileImage");

    if (!file) return;

    file.addEventListener("change", function () {

        if (!this.files.length) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById("profilePreview").src =
                e.target.result;

        };

        reader.readAsDataURL(this.files[0]);

    });

}

// ==========================================
// Password Validation
// ==========================================

function passwordValidation() {

    const confirm = document.getElementById("confirmPassword");

    if (!confirm) return;

    confirm.addEventListener("blur", function () {

        const newPassword =
            document.getElementById("newPassword").value;

        if (this.value !== newPassword) {

            alert("New Password and Confirm Password do not match.");

            this.focus();

        }

    });

}

// ==========================================
// Save Settings
// ==========================================

function saveSettings() {

    const button = document.getElementById("saveSettings");

    if (!button) return;

    button.addEventListener("click", function () {

        const student = JSON.parse(localStorage.getItem("student")) || {};

        student.name =
            document.getElementById("studentName").value;

        student.email =
            document.getElementById("studentEmail").value;

        student.phone =
            document.getElementById("studentPhone").value;

        student.language =
            document.getElementById("language").value;

        student.emailNotification =
            document.getElementById("emailNotification").checked;

        student.smsNotification =
            document.getElementById("smsNotification").checked;

        student.noticeNotification =
            document.getElementById("noticeNotification").checked;

        student.profileImage =
            document.getElementById("profilePreview").src;

        localStorage.setItem("student",
            JSON.stringify(student));

        alert("Settings saved successfully.");

        // Future Backend API

        /*
        fetch((window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/student/settings", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)

        });

        */

    });

}

// ==========================================
// Logout
// ==========================================

function logout() {

    const logoutBtn = document.getElementById("logout");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("student");

            window.location.href = "login.html";

        }

    });

}

// ==========================================
// Auto Refresh Settings
// ==========================================

setInterval(() => {

    console.log("Checking for updated settings...");

    // Future API Call

}, 60000);

// ==========================================
// Future Express + MySQL Integration
// ==========================================

// GET Settings

/*

fetch((window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/student/settings")

.then(response => response.json())

.then(data => {

    console.log(data);

});

*/

// UPDATE Settings

/*

fetch((window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/student/settings",{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(student)

});

*/

// ==========================================
// End
// ==========================================
