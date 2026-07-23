// ==========================================
// Student Management System
// students.js
// Part 1
// ==========================================

console.log("students.js loaded");

// ==========================================
// API URL
// ==========================================

const API_URL = (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/students";

// ==========================================
// Elements
// ==========================================

const studentTable = document.getElementById("studentTable");
const studentForm = document.getElementById("studentForm");
const studentModal = document.getElementById("studentModal");
const modalTitle = document.getElementById("modalTitle");

const searchBox = document.getElementById("search");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const logoutBtn = document.getElementById("logout");
const clock = document.getElementById("clock");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    loadStudents();

    startClock();

    initializeTheme();

});

// ==========================================
// Live Clock
// ==========================================

function startClock() {

    updateClock();

    setInterval(updateClock, 1000);

}

function updateClock() {

    if (!clock) return;

    clock.innerHTML = new Date().toLocaleString();

}

// ==========================================
// Theme
// ==========================================

function initializeTheme() {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");

    }

}

// ==========================================
// Sidebar Toggle
// ==========================================

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("show");

    });

}

// ==========================================
// Loader
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
        loader.style.background = "rgba(255,255,255,.4)";
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
// Toast
// ==========================================

function showToast(message, color = "#16a34a") {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.padding = "15px 20px";
        toast.style.color = "#fff";
        toast.style.borderRadius = "10px";
        toast.style.fontWeight = "600";
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
// Load Students
// ==========================================

async function loadStudents() {

    try {

        showLoader();

        const response = await fetch(API_URL);

        const data = await response.json();

        hideLoader();

        studentTable.innerHTML = "";

        if (!data.success || data.students.length === 0) {

            studentTable.innerHTML = `

                <tr>

                    <td colspan="7">

                        No Students Found

                    </td>

                </tr>

            `;

            return;

        }

        data.students.forEach(student => {

            studentTable.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.fullname}</td>

                <td>${student.email}</td>

                <td>${student.mobile}</td>

                <td>${student.rollno}</td>

                <td>${student.department}</td>

                <td>

                    <button
                        class="btn btn-primary"
                        onclick="editStudent(${student.id})">

                        <i class="fas fa-edit"></i>

                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteStudent(${student.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (error) {

        hideLoader();

        console.log(error);

        showToast("Unable to connect to server", "#ef4444");

    }

}
// ==========================================
// Open Add Student Modal
// ==========================================

window.openAddStudent = function () {

    studentForm.reset();

    document.getElementById("studentId").value = "";

    modalTitle.innerHTML = "Add Student";

    studentModal.style.display = "flex";

};

// ==========================================
// Close Modal
// ==========================================

window.closeModal = function () {

    studentModal.style.display = "none";

};

// ==========================================
// Save / Update Student
// ==========================================

studentForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const id = document.getElementById("studentId").value;

    const student = {

        fullname: document.getElementById("fullname").value.trim(),

        email: document.getElementById("email").value.trim(),

        mobile: document.getElementById("mobile").value.trim(),

        rollno: document.getElementById("rollno").value.trim(),

        department: document.getElementById("department").value.trim(),

        password: document.getElementById("password").value

    };

    if (
        !student.fullname ||
        !student.email ||
        !student.mobile ||
        !student.rollno ||
        !student.department
    ) {

        showToast("Please fill all fields", "#ef4444");

        return;

    }

    if (!id && student.password === "") {

        showToast("Password is required", "#ef4444");

        return;

    }

    try {

        showLoader();

        const response = await fetch(

            id ? `${API_URL}/${id}` : API_URL,

            {

                method: id ? "PUT" : "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(student)

            }

        );

        const data = await response.json();

        hideLoader();

        if (!data.success) {

            showToast(data.message, "#ef4444");

            return;

        }

        showToast(data.message);

        closeModal();

        loadStudents();

    }

    catch (error) {

        hideLoader();

        console.log(error);

        showToast("Server Error", "#ef4444");

    }

});

// ==========================================
// Edit Student
// ==========================================

window.editStudent = async function (id) {

    try {

        showLoader();

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        hideLoader();

        if (!data.success) {

            showToast(data.message, "#ef4444");

            return;

        }

        const student = data.student;

        document.getElementById("studentId").value = student.id;

        document.getElementById("fullname").value = student.fullname;

        document.getElementById("email").value = student.email;

        document.getElementById("mobile").value = student.mobile;

        document.getElementById("rollno").value = student.rollno;

        document.getElementById("department").value = student.department;

        document.getElementById("password").value = "";

        modalTitle.innerHTML = "Update Student";

        studentModal.style.display = "flex";

    }

    catch (error) {

        hideLoader();

        console.log(error);

        showToast("Unable to load student", "#ef4444");

    }

};

// ==========================================
// Delete Student
// ==========================================

window.deleteStudent = async function (id) {

    const ok = confirm("Delete this student?");

    if (!ok) return;

    try {

        showLoader();

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        hideLoader();

        if (!data.success) {

            showToast(data.message, "#ef4444");

            return;

        }

        showToast("Student Deleted Successfully");

        loadStudents();

    }

    catch (error) {

        hideLoader();

        console.log(error);

        showToast("Delete Failed", "#ef4444");

    }

};
// ==========================================
// Search Students
// ==========================================

if (searchBox) {

    searchBox.addEventListener("keyup", async function () {

        const keyword = this.value.trim();

        if (keyword === "") {

            loadStudents();
            return;

        }

        try {

            const response = await fetch(
                `${API_URL}/search/${encodeURIComponent(keyword)}`
            );

            const data = await response.json();

            studentTable.innerHTML = "";

            if (!data.success || data.students.length === 0) {

                studentTable.innerHTML = `
                    <tr>
                        <td colspan="7">No Students Found</td>
                    </tr>
                `;

                return;

            }

            data.students.forEach(student => {

                studentTable.innerHTML += `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.fullname}</td>
                        <td>${student.email}</td>
                        <td>${student.mobile}</td>
                        <td>${student.rollno}</td>
                        <td>${student.department}</td>
                        <td>

                            <button
                                class="btn btn-primary"
                                onclick="editStudent(${student.id})">

                                <i class="fas fa-edit"></i>

                            </button>

                            <button
                                class="btn btn-danger"
                                onclick="deleteStudent(${student.id})">

                                <i class="fas fa-trash"></i>

                            </button>

                        </td>
                    </tr>
                `;

            });

        }

        catch (error) {

            console.log(error);

            showToast("Search Failed", "#ef4444");

        }

    });

}

// ==========================================
// Close Modal when Clicking Outside
// ==========================================

window.addEventListener("click", function (e) {

    if (e.target === studentModal) {

        closeModal();

    }

});

// ==========================================
// ESC Key Close Modal
// ==========================================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeModal();

    }

});

// ==========================================
// Logout
// ==========================================

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
// Auto Refresh Student List
// ==========================================

setInterval(() => {

    loadStudents();

}, 60000);

// ==========================================
// Refresh Shortcut (F5 Override)
// ==========================================

document.addEventListener("keydown", function (e) {

    if (e.key === "F5") {

        e.preventDefault();

        loadStudents();

        showToast("Student List Refreshed");

    }

});

// ==========================================
// Welcome Notification
// ==========================================

setTimeout(() => {

    showToast("Welcome to Student Management");

}, 1000);

// ==========================================
// Console Information
// ==========================================

console.log("====================================");
console.log("Student Management System");
console.log("Students Module Loaded");
console.log("Version 1.0");
console.log("====================================");
// ==========================================
// Part 4
// Student Management System
// ==========================================

// ==========================================
// Dark / Light Mode
// ==========================================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';

        }

    });

}

// ==========================================
// Student Statistics
// ==========================================

async function updateStatistics() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        if (!data.success) return;

        console.log("Total Students :", data.students.length);

    }

    catch (err) {

        console.log(err);

    }

}

updateStatistics();

// ==========================================
// Export CSV
// ==========================================

window.exportStudents = async function () {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        if (!data.success) {

            showToast("Export Failed", "#ef4444");

            return;

        }

        let csv =
            "ID,Full Name,Email,Mobile,Roll No,Department\n";

        data.students.forEach(student => {

            csv += `${student.id},${student.fullname},${student.email},${student.mobile},${student.rollno},${student.department}\n`;

        });

        const blob = new Blob([csv], {

            type: "text/csv"

        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "students.csv";

        a.click();

        URL.revokeObjectURL(url);

        showToast("CSV Downloaded");

    }

    catch (err) {

        console.log(err);

    }

};

// ==========================================
// Print Table
// ==========================================

window.printStudents = function () {

    window.print();

};

// ==========================================
// Refresh
// ==========================================

window.refreshStudents = function () {

    loadStudents();

    showToast("Student List Updated");

};

// ==========================================
// Row Hover Effect
// ==========================================

studentTable.addEventListener("mouseover", function (e) {

    const row = e.target.closest("tr");

    if (row) {

        row.style.background = "#f3f4f6";

    }

});

studentTable.addEventListener("mouseout", function (e) {

    const row = e.target.closest("tr");

    if (row) {

        row.style.background = "";

    }

});

// ==========================================
// Auto Refresh Every Minute
// ==========================================

setInterval(() => {

    loadStudents();

}, 60000);

// ==========================================
// Online / Offline Detection
// ==========================================

window.addEventListener("online", () => {

    showToast("Internet Connected");

});

window.addEventListener("offline", () => {

    showToast("Internet Disconnected", "#ef4444");

});

// ==========================================
// Keyboard Shortcut
// Ctrl + N = Add Student
// ==========================================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key === "n") {

        e.preventDefault();

        openAddStudent();

    }

});

// ==========================================
// Footer
// ==========================================

console.log("====================================");
console.log("Student Management System");
console.log("Students Module Loaded Successfully");
console.log("CRUD Ready");
console.log("Express API Connected");
console.log("Version 2.0");
console.log("====================================");
