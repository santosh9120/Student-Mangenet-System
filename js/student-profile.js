// ==========================================
// Student Profile JavaScript
// ==========================================

// Page Loaded
window.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadProfile();

    loadTheme();

    setInterval(updateClock, 1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (clock) {

        clock.innerHTML = new Date().toLocaleString();

    }

}

// ==========================================
// Load Theme (Admin Controlled)
// ==========================================

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }

}

// ==========================================
// Profile Image Upload Preview
// ==========================================

const uploadPhoto = document.getElementById("uploadPhoto");

if (uploadPhoto) {

    uploadPhoto.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById("profileImage").src = e.target.result;

            localStorage.setItem("studentPhoto", e.target.result);

        };

        reader.readAsDataURL(file);

    });

}

// ==========================================
// Load Profile
// ==========================================

function loadProfile() {

    document.getElementById("name").value =
        localStorage.getItem("studentName") || "Santosh";

    document.getElementById("email").value =
        localStorage.getItem("studentEmail") || "santosh@gmail.com";

    document.getElementById("phone").value =
        localStorage.getItem("studentPhone") || "9876543210";

    document.getElementById("dob").value =
        localStorage.getItem("studentDOB") || "";

    document.getElementById("gender").value =
        localStorage.getItem("studentGender") || "Male";

    document.getElementById("blood").value =
        localStorage.getItem("studentBlood") || "O+";

    document.getElementById("address").value =
        localStorage.getItem("studentAddress") || "";

    const image = localStorage.getItem("studentPhoto");

    if (image) {

        document.getElementById("profileImage").src = image;

    }

}

// ==========================================
// Save Profile
// ==========================================

const saveBtn = document.getElementById("saveProfile");

if (saveBtn) {

    saveBtn.addEventListener("click", function () {

        localStorage.setItem("studentName",
            document.getElementById("name").value);

        localStorage.setItem("studentEmail",
            document.getElementById("email").value);

        localStorage.setItem("studentPhone",
            document.getElementById("phone").value);

        localStorage.setItem("studentDOB",
            document.getElementById("dob").value);

        localStorage.setItem("studentGender",
            document.getElementById("gender").value);

        localStorage.setItem("studentBlood",
            document.getElementById("blood").value);

        localStorage.setItem("studentAddress",
            document.getElementById("address").value);

        document.getElementById("studentName").innerHTML =
            document.getElementById("name").value;

        alert("Profile Updated Successfully.");

    });

}

// ==========================================
// Password Validation
// ==========================================

const newPassword = document.getElementById("newPassword");

const confirmPassword = document.getElementById("confirmPassword");

if (confirmPassword) {

    confirmPassword.addEventListener("blur", function () {

        if (newPassword.value !== confirmPassword.value) {

            alert("Passwords do not match.");

            confirmPassword.focus();

        }

    });

}

// ==========================================
// Logout
// ==========================================

const logout = document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            window.location.href = "student-login.html";

        }

    });

}

// ==========================================
// Auto Refresh Theme
// ==========================================

setInterval(() => {

    loadTheme();

}, 2000);

// ==========================================
// Future Express + MySQL Integration
// ==========================================

// fetch("http://localhost:5000/api/student/profile")
// .then(res => res.json())
// .then(data => {
//
// document.getElementById("name").value = data.name;
// document.getElementById("email").value = data.email;
// document.getElementById("phone").value = data.phone;
//
// });

// ==========================================
// End
// ==========================================