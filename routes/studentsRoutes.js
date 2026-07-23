const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

// ===============================
// GET ALL STUDENTS
// ===============================
router.get("/", async (req, res) => {
    try {
        const [students] = await db.query(
            `SELECT id, fullname, email, mobile, rollno, department
             FROM students
             ORDER BY id DESC`
        );

        res.json({
            success: true,
            students
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

// ===============================
// SEARCH STUDENT
// IMPORTANT: BEFORE /:id
// ===============================
router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = `%${req.params.keyword}%`;

        const [students] = await db.query(

            `SELECT id,fullname,email,mobile,rollno,department
             FROM students
             WHERE fullname LIKE ?
             OR email LIKE ?
             OR rollno LIKE ?
             OR department LIKE ?`,

            [keyword, keyword, keyword, keyword]

        );

        res.json({
            success: true,
            students
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ===============================
// GET ONE STUDENT
// ===============================
router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM students WHERE id=?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.json({
                success: false,
                message: "Student Not Found"
            });

        }

        res.json({
            success: true,
            student: rows[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ===============================
// ADD STUDENT
// ===============================
router.post("/", async (req, res) => {

    try {

        const {
            fullname,
            email,
            mobile,
            rollno,
            department,
            password
        } = req.body;

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

        const [emailExists] = await db.query(
            "SELECT id FROM students WHERE email=?",
            [email]
        );

        if (emailExists.length > 0) {

            return res.json({
                success: false,
                message: "Email already exists."
            });

        }

        const [rollExists] = await db.query(
            "SELECT id FROM students WHERE rollno=?",
            [rollno]
        );

        if (rollExists.length > 0) {

            return res.json({
                success: false,
                message: "Roll Number already exists."
            });

        }

        const hash = await bcrypt.hash(password, 10);

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
                hash
            ]

        );

        res.json({
            success: true,
            message: "Student Added Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ===============================
// UPDATE STUDENT
// ===============================
router.put("/:id", async (req, res) => {

    try {

        const {
            fullname,
            email,
            mobile,
            rollno,
            department
        } = req.body;

        await db.query(

            `UPDATE students
             SET fullname=?,
                 email=?,
                 mobile=?,
                 rollno=?,
                 department=?
             WHERE id=?`,

            [
                fullname,
                email,
                mobile,
                rollno,
                department,
                req.params.id
            ]

        );

        res.json({
            success: true,
            message: "Student Updated Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ===============================
// DELETE STUDENT
// ===============================
router.delete("/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM students WHERE id=?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Student Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;