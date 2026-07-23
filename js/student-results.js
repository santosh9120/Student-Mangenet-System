// ==========================================
// Student Results JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadTheme();

    initializeSearch();

    initializeChart();

    animateProgressBars();

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

    }

    else {

        document.body.classList.remove("dark-mode");

    }

}

// Auto Refresh Theme

setInterval(loadTheme, 2000);

// ==========================================
// Search Subjects
// ==========================================

function initializeSearch() {

    const search = document.getElementById("searchSubject");

    if (!search) return;

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("#resultTable tbody tr");

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

}

// ==========================================
// Performance Chart
// ==========================================

function initializeChart() {

    const chart = document.getElementById("resultChart");

    if (!chart) return;

    new Chart(chart, {

        type: "bar",

        data: {

            labels: [

                "Java",

                "DBMS",

                "OS",

                "CN",

                "SE"

            ],

            datasets: [

                {

                    label: "Marks",

                    data: [

                        90,

                        87,

                        84,

                        92,

                        82

                    ],

                    backgroundColor: [

                        "#2563eb",

                        "#10b981",

                        "#f59e0b",

                        "#ef4444",

                        "#8b5cf6"

                    ],

                    borderRadius: 8

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100

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

        const value = parseFloat(bar.textContent);

        const percentage = Math.round((value / 10) * 100);

        bar.style.width = "0%";

        let current = 0;

        const animation = setInterval(() => {

            if (current >= percentage) {

                clearInterval(animation);

            }

            else {

                current++;

                bar.style.width = current + "%";

            }

        }, 15);

    });

}

// ==========================================
// Download Marksheet
// ==========================================

function initializeDownload() {

    const btn = document.getElementById("downloadMarksheet");

    if (!btn) return;

    btn.addEventListener("click", function () {

        alert("Marksheet download feature will be connected to the server.");

        // Future Backend
        // window.location.href =
        // "http://localhost:5000/api/student/download-result";

    });

}

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

            window.location.href = "student-login.html";

        }

    });

}

// ==========================================
// Hover Effect
// ==========================================

const rows = document.querySelectorAll("#resultTable tbody tr");

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        row.style.background = "#eef5ff";

    });

    row.addEventListener("mouseleave", () => {

        row.style.background = "";

    });

});

// ==========================================
// Future Express + MySQL Integration
// ==========================================

// fetch("http://localhost:5000/api/student/results")
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
// Auto Refresh Result
// ==========================================

setInterval(() => {

    console.log("Checking for updated results...");

    // Future API Call

}, 60000);

// ==========================================
// End
// ==========================================