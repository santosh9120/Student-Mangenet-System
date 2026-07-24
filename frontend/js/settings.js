// ==========================================
// Settings JavaScript
// ==========================================

const settingsForm = document.getElementById("settingsForm");

const clock = document.getElementById("clock");

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.querySelector(".sidebar");

const logout = document.getElementById("logout");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadSettings();

    setInterval(updateClock,1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock(){

    if(clock){

        clock.innerHTML = new Date().toLocaleString();

    }

}

// ==========================================
// Load Settings
// ==========================================

function loadSettings(){

    document.getElementById("collegeName").value =
    localStorage.getItem("collegeName") || "";

    document.getElementById("collegeAddress").value =
    localStorage.getItem("collegeAddress") || "";

    document.getElementById("collegeEmail").value =
    localStorage.getItem("collegeEmail") || "";

    document.getElementById("collegePhone").value =
    localStorage.getItem("collegePhone") || "";

    document.getElementById("adminName").value =
    localStorage.getItem("adminName") || "";

    document.getElementById("adminEmail").value =
    localStorage.getItem("adminEmail") || "";

    document.getElementById("darkMode").checked =
    localStorage.getItem("darkMode")==="true";

    document.getElementById("notifications").checked =
    localStorage.getItem("notifications")!=="false";

    document.getElementById("emailAlerts").checked =
    localStorage.getItem("emailAlerts")!=="false";

    applyDarkMode();

}

// ==========================================
// Save Settings
// ==========================================

settingsForm.addEventListener("submit",function(e){

    e.preventDefault();

    const password =
    document.getElementById("adminPassword").value;

    const confirm =
    document.getElementById("confirmPassword").value;

    if(password!==confirm){

        alert("Passwords do not match.");

        return;

    }

    localStorage.setItem(
        "collegeName",
        document.getElementById("collegeName").value
    );

    localStorage.setItem(
        "collegeAddress",
        document.getElementById("collegeAddress").value
    );

    localStorage.setItem(
        "collegeEmail",
        document.getElementById("collegeEmail").value
    );

    localStorage.setItem(
        "collegePhone",
        document.getElementById("collegePhone").value
    );

    localStorage.setItem(
        "adminName",
        document.getElementById("adminName").value
    );

    localStorage.setItem(
        "adminEmail",
        document.getElementById("adminEmail").value
    );

    localStorage.setItem(
        "darkMode",
        document.getElementById("darkMode").checked
    );

    localStorage.setItem(
        "notifications",
        document.getElementById("notifications").checked
    );

    localStorage.setItem(
        "emailAlerts",
        document.getElementById("emailAlerts").checked
    );

    if(password!=""){

        localStorage.setItem("adminPassword",password);

    }

    applyDarkMode();

    alert("Settings Saved Successfully.");

});

// ==========================================
// Dark Mode
// ==========================================

function applyDarkMode(){

    const enabled =
    document.getElementById("darkMode").checked;

    if(enabled){

        document.body.classList.add("dark-mode");

    }

    else{

        document.body.classList.remove("dark-mode");

    }

}

// ==========================================
// Dark Mode Toggle
// ==========================================

document.getElementById("darkMode").addEventListener("change",()=>{

    applyDarkMode();

});

// ==========================================
// Sidebar Toggle
// ==========================================

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.toggle("show");

    });

}

// ==========================================
// Logout
// ==========================================

if(logout){

    logout.addEventListener("click",(e)=>{

        e.preventDefault();

        if(confirm("Are you sure you want to logout?")){

            window.location.href="admin-login.html";

        }

    });

}

// ==========================================
// Notification Toggle
// ==========================================

document.getElementById("notifications").addEventListener("change",function(){

    if(this.checked){

        alert("Notifications Enabled");

    }

    else{

        alert("Notifications Disabled");

    }

});

// ==========================================
// Email Alert Toggle
// ==========================================

document.getElementById("emailAlerts").addEventListener("change",function(){

    if(this.checked){

        alert("Email Alerts Enabled");

    }

    else{

        alert("Email Alerts Disabled");

    }

});
const darkMode = document.getElementById("darkMode");

darkMode.addEventListener("change", function () {

    if (this.checked) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }

    applyTheme();

});

function applyTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }

}

window.onload = function () {

    darkMode.checked = localStorage.getItem("theme") === "dark";

    applyTheme();

};

// ==========================================
// Future Backend API
// ==========================================

// fetch((window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/settings")
// .then(res=>res.json())
// .then(data=>console.log(data));

// ==========================================
// End
// ==========================================
