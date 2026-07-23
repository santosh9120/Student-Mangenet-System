// ==========================================
// Student Attendance JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadTheme();

    initializeSearch();

    initializeChart();

    animateProgressBars();

    loadStudent();

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
// Load Student Name
// ==========================================

function loadStudent() {

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) return;

    const heading = document.querySelector(".topbar p");

    if (heading) {

        heading.innerHTML = "Welcome, " + student.name;

    }

}

// ==========================================
// Admin Controlled Theme
// ==========================================

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

    }

    else {

        document.body.classList.remove("dark-mode");

    }

}

// Refresh Theme Automatically

setInterval(loadTheme, 2000);

// ==========================================
// Search Attendance
// ==========================================

function initializeSearch() {

    const search = document.getElementById("searchAttendance");

    if (!search) return;

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("#attendanceTable tbody tr");

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

}

// ==========================================
// Attendance Chart
// ==========================================

function initializeChart() {

    const chart = document.getElementById("attendanceChart");

    if (!chart) return;

    new Chart(chart, {

        type: "doughnut",

        data: {

            labels: [

                "Present",

                "Absent"

            ],

            datasets: [

                {

                    data: [

                        184,

                        16

                    ],

                    backgroundColor: [

                        "#2563eb",

                        "#ef4444"

                    ]

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

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

            }

            else {

                current++;

                bar.style.width = current + "%";

                bar.innerHTML = current + "%";

            }

        }, 15);

    });

}

// ==========================================
// Highlight Table Rows
// ==========================================

const rows = document.querySelectorAll("#attendanceTable tbody tr");

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

const logout = document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("student");

            window.location.href = "student-login.html";

        }

    });

}

// ==========================================
// Export Attendance (Future)
// ==========================================

function exportAttendance() {

    alert("PDF Export will be available soon.");

}

// ==========================================
// Backend Integration Ready
// ==========================================

// fetch("http://localhost:5000/api/student/attendance")
// .then(response => response.json())
// .then(data => {
//
// console.log(data);
//
// })
// .catch(error => {
//
// console.log(error);
//
// });

// ==========================================
// Auto Refresh Attendance
// ==========================================

setInterval(() => {

    console.log("Attendance data refreshed.");

    // Future API call

}, 60000);

// ==========================================
// End
// ==========================================