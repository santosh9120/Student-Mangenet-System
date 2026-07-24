// ==========================================
// Student Courses JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadTheme();

    initializeSearch();

    initializeModal();

    animateProgressBars();

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

// Refresh theme automatically

setInterval(loadTheme, 2000);

// ==========================================
// Search Courses
// ==========================================

function initializeSearch() {

    const search = document.getElementById("searchCourse");

    if (!search) return;

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("#courseTable tbody tr");

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

}

// ==========================================
// Course Details Modal
// ==========================================

function initializeModal() {

    const modal = document.getElementById("courseModal");

    const buttons = document.querySelectorAll(".viewBtn");

    const close = document.querySelector(".close");

    const closeBtn = document.getElementById("closeModal");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            modal.style.display = "flex";

        });

    });

    if (close) {

        close.onclick = () => {

            modal.style.display = "none";

        };

    }

    if (closeBtn) {

        closeBtn.onclick = () => {

            modal.style.display = "none";

        };

    }

    window.onclick = function (event) {

        if (event.target === modal) {

            modal.style.display = "none";

        }

    };

}

// ==========================================
// Progress Bar Animation
// ==========================================

function animateProgressBars() {

    const bars = document.querySelectorAll(".progress-bar");

    bars.forEach(bar => {

        const target = parseInt(bar.innerText);

        bar.style.width = "0%";

        let current = 0;

        const interval = setInterval(() => {

            if (current >= target) {

                clearInterval(interval);

            } else {

                current++;

                bar.style.width = current + "%";

                bar.innerText = current + "%";

            }

        }, 15);

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

            window.location.href = "login.html";

        }

    });

}

// ==========================================
// Load Student Information
// ==========================================

function loadStudentData() {

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) return;

    const heading = document.querySelector(".topbar p");

    if (heading) {

        heading.innerHTML = "Welcome back, " + student.name + " 👋";

    }

}

loadStudentData();

// ==========================================
// Highlight Active Course
// ==========================================

const rows = document.querySelectorAll("#courseTable tbody tr");

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        row.style.background = "#eef5ff";

    });

    row.addEventListener("mouseleave", () => {

        row.style.background = "";

    });

});

// ==========================================
// Future Backend API Integration
// ==========================================

// fetch((window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/student/courses")
// .then(res => res.json())
// .then(data => {
//
// console.log(data);
//
// })
// .catch(err => console.log(err));

// ==========================================
// End
// ==========================================
