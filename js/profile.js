// ==========================================
// Profile Page JavaScript
// File: js/profile.js
// ==========================================

const API_URL = "http://localhost:5000/api";

// ===============================
// Check Login
// ===============================

const token = localStorage.getItem("studentToken");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// ===============================
// Image Preview
// ===============================

const photo = document.getElementById("photo");
const preview = document.getElementById("previewImage");

if (photo) {

    photo.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {

            preview.src = URL.createObjectURL(file);

        }

    });

}

// ===============================
// Load Student Profile
// ===============================

async function loadProfile() {

    try {

        const response = await fetch(API_URL + "/profile", {

            method: "GET",

            headers: {

                Authorization: "Bearer " + token

            }

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        document.getElementById("studentName").innerHTML = data.fullname;

        document.querySelector("input[name='fullname']").value = data.fullname;

        document.querySelector("input[name='email']").value = data.email;

        document.querySelector("input[name='mobile']").value = data.mobile;

        document.querySelector("input[name='rollno']").value = data.rollno;

        document.querySelector("input[name='department']").value = data.department;

        if (data.photo) {

            preview.src = "uploads/" + data.photo;

        }

    }

    catch (err) {

        console.log(err);

    }

}

loadProfile();

// ===============================
// Save Profile
// ===============================

const form = document.getElementById("profileForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", document.querySelector("input[name='fullname']").value);

    formData.append("email", document.querySelector("input[name='email']").value);

    formData.append("mobile", document.querySelector("input[name='mobile']").value);

    formData.append("rollno", document.querySelector("input[name='rollno']").value);

    formData.append("department", document.querySelector("input[name='department']").value);

    if (photo.files.length > 0) {

        formData.append("photo", photo.files[0]);

    }

    try {

        const response = await fetch(API_URL + "/profile/update", {

            method: "PUT",

            headers: {

                Authorization: "Bearer " + token

            },

            body: formData

        });

        const data = await response.json();

        if (response.ok) {

            alert("Profile Updated Successfully");

            loadProfile();

        } else {

            alert(data.message);

        }

    }

    catch (err) {

        console.log(err);

    }

});

// ===============================
// Change Password
// ===============================

const saveButton = document.querySelector(".save-btn");

saveButton.addEventListener("click", async function () {

    const newPassword = document.querySelector("input[name='newPassword']").value;

    const confirmPassword = document.querySelector("input[name='confirmPassword']").value;

    if (newPassword == "" || confirmPassword == "") {

        return;

    }

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match");

        return;

    }

    try {

        const response = await fetch(API_URL + "/change-password", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + token

            },

            body: JSON.stringify({

                password: newPassword

            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Password Changed Successfully");

        } else {

            alert(data.message);

        }

    }

    catch (err) {

        console.log(err);

    }

});

// ===============================
// Logout
// ===============================

function logout() {

    if (confirm("Do you want to Logout?")) {

        localStorage.removeItem("studentToken");

        localStorage.removeItem("studentName");

        window.location.href = "login.html";

    }

}

// ===============================
// Live Clock
// ===============================

function updateClock() {

    const clock = document.getElementById("clock");

    if (clock) {

        clock.innerHTML = new Date().toLocaleString();

    }

}

setInterval(updateClock, 1000);

// ===============================
// Dark Mode
// ===============================

const darkBtn = document.getElementById("darkMode");

if (darkBtn) {

    darkBtn.onclick = function () {

        document.body.classList.toggle("dark-mode");

    }

}