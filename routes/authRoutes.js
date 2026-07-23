// ==========================================
// Student Management System
// routes/authRoutes.js
// ==========================================

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../db");

// ==========================================
// Student Registration
// POST /api/auth/register
// ==========================================

router.post("/register", async (req, res) => {

    try {

        const {
            fullname,
            email,
            mobile,
            rollno,
            department,
            password
        } = req.body;

        // Validation
        if (
            !fullname ||
            !email ||
            !mobile ||
            !rollno ||
            !department ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Check Email
        const [emailExists] = await db.query(
            "SELECT id FROM students WHERE email = ?",
            [email]
        );

        if (emailExists.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Check Roll Number
        const [rollExists] = await db.query(
            "SELECT id FROM students WHERE rollno = ?",
            [rollno]
        );

        if (rollExists.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Roll Number already exists."
            });
        }

        // Encrypt Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert Student
        await db.query(
            `INSERT INTO students
            (fullname,email,mobile,rollno,department,password)
            VALUES (?,?,?,?,?,?)`,
            [
                fullname,
                email,
                mobile,
                rollno,
                department,
                hashedPassword
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Student Registered Successfully"
        });

    } catch (err) {

        console.error("REGISTER ERROR:");
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });

    }

});


// ==========================================
// Student Login
// POST /api/auth/login
// ==========================================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required."
            });

        }

        const [rows] = await db.query(
            "SELECT * FROM students WHERE email=?",
            [email]
        );

        if (rows.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            });

        }

        const student = rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            student.password
        );

        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            {
                id: student.id,
                email: student.email
            },
            process.env.JWT_SECRET || "student_secret_key",
            {
                expiresIn: "7d"
            }
        );

        return res.json({

            success: true,
            message: "Login Successful",
            token,

            student: {
                id: student.id,
                fullname: student.fullname,
                email: student.email,
                mobile: student.mobile,
                rollno: student.rollno,
                department: student.department,
                photo: student.photo,
                profile_image: student.profile_image
            }

        });

    } catch (err) {

        console.error("LOGIN ERROR:");
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });

    }

});

module.exports = router;
