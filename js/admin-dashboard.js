// ==========================================
// ADMIN DASHBOARD JAVASCRIPT
// Part 1
// ==========================================

// Dashboard Statistics

let dashboardData = {
    students: 1250,
    teachers: 85,
    departments: 12,
    courses: 48
};

// ==========================================
// Page Loaded
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    animateCounters();

    updateClock();

    setInterval(updateClock, 1000);

    initializeTheme();

    loadRecentStudents();

});

// ==========================================
// Animated Counter
// ==========================================

function animateValue(id, start, end, duration) {

    const obj = document.getElementById(id);

    if (!obj) return;

    let startTime = null;

    function animation(currentTime) {

        if (!startTime) startTime = currentTime;

        const progress = Math.min((currentTime - startTime) / duration, 1);

        obj.innerHTML = Math.floor(progress * (end - start) + start);

        if (progress < 1) {

            requestAnimationFrame(animation);

        }

    }

    requestAnimationFrame(animation);

}

function animateCounters() {

    animateValue("studentsCount", 0, dashboardData.students, 1500);

    animateValue("teachersCount", 0, dashboardData.teachers, 1500);

    animateValue("departmentCount", 0, dashboardData.departments, 1500);

    animateValue("courseCount", 0, dashboardData.courses, 1500);

}

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
// Sidebar Toggle
// ==========================================

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.querySelector(".sidebar");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("show");

    });

}

// ==========================================
// Dark Mode
// ==========================================

const themeBtn = document.getElementById("themeBtn");

function initializeTheme() {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

    }

}

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

    });

}

// ==========================================
// Search Student
// ==========================================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const rows = document.querySelectorAll("#studentTable tr");

        rows.forEach(row => {

            row.style.display = row.innerText.toLowerCase().includes(filter)
                ? ""
                : "none";

        });

    });

}
// ==========================================
// Chart.js Graphs
// ==========================================

window.addEventListener("load", () => {

    loadStudentChart();

    loadAttendanceChart();

});

function loadStudentChart() {

    const canvas = document.getElementById("studentChart");

    if (!canvas) return;

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [
                "Computer",
                "Mechanical",
                "Civil",
                "Electrical",
                "IT"
            ],

            datasets: [{

                label: "Students",

                data: [320, 210, 180, 140, 260],

                backgroundColor: [

                    "#2563eb",
                    "#16a34a",
                    "#f59e0b",
                    "#dc2626",
                    "#7c3aed"

                ],

                borderRadius: 8

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}

// ==========================================
// Attendance Chart
// ==========================================

function loadAttendanceChart() {

    const canvas = document.getElementById("attendanceChart");

    if (!canvas) return;

    new Chart(canvas, {

        type: "line",

        data: {

            labels: [

                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"

            ],

            datasets: [{

                label: "Attendance",

                data: [

                    88,
                    90,
                    93,
                    95,
                    92,
                    97

                ],

                fill: true,

                borderColor: "#2563eb",

                backgroundColor: "rgba(37,99,235,.15)",

                tension: .4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}

// ==========================================
// Recent Students
// ==========================================

function loadRecentStudents() {

    const table = document.getElementById("studentTable");

    if (!table) return;

    const students = [

        {
            id:1,
            name:"Santosh",
            department:"Computer",
            email:"santosh@gmail.com",
            status:"Active"
        },

        {
            id:2,
            name:"Rahul",
            department:"IT",
            email:"rahul@gmail.com",
            status:"Active"
        },

        {
            id:3,
            name:"Priya",
            department:"Civil",
            email:"priya@gmail.com",
            status:"Active"
        },

        {
            id:4,
            name:"Amit",
            department:"Mechanical",
            email:"amit@gmail.com",
            status:"Inactive"
        }

    ];

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.email}</td>

            <td>

                <span class="${student.status==="Active"
                ?"active-status"
                :"inactive-status"}">

                ${student.status}

                </span>

            </td>

        </tr>

        `;

    });

}

// ==========================================
// Notifications
// ==========================================

function showNotification(message) {

    let box = document.getElementById("notificationBox");

    if (!box) {

        box = document.createElement("div");

        box.id = "notificationBox";

        box.style.position = "fixed";
        box.style.top = "20px";
        box.style.right = "20px";
        box.style.background = "#2563eb";
        box.style.color = "#fff";
        box.style.padding = "15px 20px";
        box.style.borderRadius = "10px";
        box.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";
        box.style.zIndex = "9999";

        document.body.appendChild(box);

    }

    box.innerHTML = message;

    box.style.display = "block";

    setTimeout(() => {

        box.style.display = "none";

    }, 3000);

}

// ==========================================
// Welcome Notification
// ==========================================

setTimeout(() => {

    showNotification("Welcome Admin 👋");

}, 1200);

// ==========================================
// Card Animation
// ==========================================

const cards = document.querySelectorAll(".card");

cards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    setTimeout(()=>{

        card.style.transition=".6s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },index*200);

});

// ==========================================
// Auto Refresh Dashboard
// ==========================================

setInterval(()=>{

    console.log("Dashboard Refreshed");

    // Future API Call

    // loadDashboard();

},30000);
// ==========================================
// Logout
// ==========================================

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            localStorage.clear();
            sessionStorage.clear();

            window.location.href = "admin-login.html";

        }

    });

}

// ==========================================
// Loading Spinner
// ==========================================

function showLoader() {

    let loader = document.getElementById("loader");

    if (!loader) {

        loader = document.createElement("div");

        loader.id = "loader";

        loader.innerHTML = `
            <div class="loader"></div>
        `;

        loader.style.position = "fixed";
        loader.style.top = "0";
        loader.style.left = "0";
        loader.style.width = "100%";
        loader.style.height = "100%";
        loader.style.background = "rgba(255,255,255,.6)";
        loader.style.display = "flex";
        loader.style.justifyContent = "center";
        loader.style.alignItems = "center";
        loader.style.zIndex = "99999";

        document.body.appendChild(loader);

    }

    loader.style.display = "flex";

}

function hideLoader() {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

}

// ==========================================
// Toast Message
// ==========================================

function showToast(message, color = "#16a34a") {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "25px";
        toast.style.right = "25px";
        toast.style.padding = "15px 20px";
        toast.style.color = "#fff";
        toast.style.borderRadius = "10px";
        toast.style.fontWeight = "600";
        toast.style.boxShadow = "0 10px 20px rgba(0,0,0,.2)";
        toast.style.zIndex = "99999";

        document.body.appendChild(toast);

    }

    toast.style.background = color;
    toast.innerHTML = message;
    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 3000);

}

// ==========================================
// Dashboard API Integration
// ==========================================

const API = "https://student-mangenet-system.onrender.com/api/admin/dashboard";

async function loadDashboard() {

    try {

        showLoader();

        const response = await fetch(API);

        if (!response.ok) {

            throw new Error("Unable to connect to server.");

        }

        const data = await response.json();

        if (data.success) {

            dashboardData.students = data.totalStudents || 0;
            dashboardData.teachers = data.totalTeachers || 0;
            dashboardData.departments = data.totalDepartments || 0;
            dashboardData.courses = data.totalCourses || 0;

            animateCounters();

        }

        hideLoader();

    } catch (error) {

        hideLoader();

        console.log(error);

        showToast("Server Connection Failed", "#ef4444");

    }

}

// ==========================================
// Refresh Dashboard
// ==========================================

function refreshDashboard() {

    loadDashboard();

    loadRecentStudents();

    showToast("Dashboard Updated");

}

// ==========================================
// Keyboard Shortcut
// Press F5 to Refresh Dashboard
// ==========================================

document.addEventListener("keydown", function (e) {

    if (e.key === "F5") {

        e.preventDefault();

        refreshDashboard();

    }

});

// ==========================================
// Welcome Message
// ==========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast("Welcome to Student Management System");

    }, 1000);

});

// ==========================================
// Dashboard Information
// ==========================================

console.log("===================================");

console.log("Student Management System");

console.log("Professional Admin Dashboard Loaded");

console.log("Version : 1.0");

console.log("===================================");

// ==========================================
// Future Features
// ==========================================

// Notifications API
// Student Analytics
// Department Statistics
// Attendance API
// Results API
// Activity Logs
// Calendar Integration
// Export Reports
// Excel Download
// PDF Reports

// ==========================================
// End of File
// ==========================================

