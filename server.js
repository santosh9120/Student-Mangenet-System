// ==========================================
// Student Management System
// server.js
// ==========================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const studentsRoutes = require("./routes/studentsRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const resultRoutes = require("./routes/resultRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const noticeRoutes = require("./routes/noticeRoutes");





const app = express();

// ==========================================
// Middleware
// ==========================================

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Static Files
// ==========================================

// Frontend Folder
app.use(express.static(path.join(__dirname, "frontend")));

// Upload Folder
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// ==========================================
// API Routes
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/notices", noticeRoutes);





// ==========================================
// Home Route
// ==========================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ==========================================
// Health Check
// ==========================================

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Student Management System API Running Successfully",
    });
});

// ==========================================
// 404 Handler
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

// ==========================================
// Error Handler
// ==========================================

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ==========================================
// Start Server
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("====================================");
    console.log(" Student Management System");
    console.log("====================================");
    console.log(` Server Running : http://localhost:${PORT}`);
    console.log(` Environment    : ${process.env.NODE_ENV || "development"}`);
    console.log("====================================");
});
