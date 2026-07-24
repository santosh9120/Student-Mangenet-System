// ==========================================
// Student Notices JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadTheme();

    initializeSearch();

    initializeModal();

    loadStudentInfo();

    initializeDownload();

    initializeLogout();

    setInterval(updateClock, 1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (clock) {

        const now = new Date();

        clock.innerHTML = now.toLocaleString();

    }

}

// ==========================================
// Load Student Information
// ==========================================

function loadStudentInfo() {

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) return;

    const heading = document.querySelector(".topbar p");

    if (heading) {

        heading.innerHTML = "Welcome, " + student.name + " 👋";

    }

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

// Auto Refresh Theme
setInterval(loadTheme, 2000);

// ==========================================
// Search Notice
// ==========================================

function initializeSearch() {

    const search = document.getElementById("searchNotice");

    if (!search) return;

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("#noticeTable tbody tr");

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

}

// ==========================================
// Notice Modal
// ==========================================

function initializeModal() {

    const modal = document.getElementById("noticeModal");

    const viewButtons = document.querySelectorAll(".viewBtn");

    const close = document.querySelector(".close");

    viewButtons.forEach(button => {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            const title = row.cells[2].innerText;
            const date = row.cells[0].innerText;
            const publisher = row.cells[3].innerText;

            modal.querySelector("h2").innerHTML = title;

            modal.querySelector("p").innerHTML =
                "<strong>Date :</strong> " + date +
                "<br><br>" +
                "<strong>Published By :</strong> " + publisher +
                "<br><br>" +
                "This is the official notice issued by the administration. Please download the attachment for complete details.";

            modal.style.display = "flex";

        });

    });

    if (close) {

        close.onclick = function () {

            modal.style.display = "none";

        };

    }

    window.onclick = function (e) {

        if (e.target == modal) {

            modal.style.display = "none";

        }

    };

}

// ==========================================
// Download Notice
// ==========================================

function initializeDownload() {

    const btn = document.getElementById("downloadNotice");

    if (!btn) return;

    btn.addEventListener("click", function () {

        alert("Notice PDF download will be connected to the server.");

        // Future Backend
        // window.location.href =
        // (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/student/download-notice";

    });

}

// ==========================================
// Highlight Table Rows
// ==========================================

const rows = document.querySelectorAll("#noticeTable tbody tr");

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        row.style.background = "#eef5ff";

    });

    row.addEventListener("mouseleave", () => {

        row.style.background = "";

    });

});

// ==========================================
// Logout
// ==========================================

function initializeLogout() {

    const logout = document.getElementById("logout");

    if (!logout) return;

    logout.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("student");

            window.location.href = "login.html";

        }

    });

}

// ==========================================
// Auto Refresh Notices
// ==========================================

setInterval(() => {

    console.log("Checking for new notices...");

    // Future API Call

}, 60000);

// ==========================================
// Future Express + MySQL Integration
// ==========================================

// fetch((window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/student/notices")
// .then(response => response.json())
// .then(data => {
//
//     console.log(data);
//
// })
// .catch(error => {
//
//     console.log(error);
//
// });

// ==========================================
// End
// ==========================================
