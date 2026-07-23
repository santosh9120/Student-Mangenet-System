// ==========================================
// Teacher Routes
// backend/routes/teacherRoutes.js
// ==========================================

const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const db = require("../db");

// ==========================================
// GET ALL TEACHERS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const [teachers] = await db.query(`
            SELECT
                id,
                fullname,
                email,
                mobile,
                department
            FROM teachers
            ORDER BY id DESC
        `);

        res.json({
            success: true,
            teachers
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ==========================================
// SEARCH TEACHERS
// ==========================================

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = `%${req.params.keyword}%`;

        const [teachers] = await db.query(`
            SELECT
                id,
                fullname,
                email,
                mobile,
                department
            FROM teachers
            WHERE
                fullname LIKE ?
                OR email LIKE ?
                OR department LIKE ?
        `, [keyword, keyword, keyword]);

        res.json({
            success: true,
            teachers
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ==========================================
// GET SINGLE TEACHER
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM teachers WHERE id=?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.json({
                success: false,
                message: "Teacher not found"
            });

        }

        res.json({
            success: true,
            teacher: rows[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ==========================================
// ADD TEACHER
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            fullname,
            email,
            mobile,
            department,
            password
        } = req.body;

        if (
            !fullname ||
            !email ||
            !mobile ||
            !department ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const [exists] = await db.query(
            "SELECT id FROM teachers WHERE email=?",
            [email]
        );

        if (exists.length > 0) {

            return res.json({
                success: false,
                message: "Teacher already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(`
            INSERT INTO teachers
            (
                fullname,
                email,
                mobile,
                department,
                password
            )
            VALUES
            (?, ?, ?, ?, ?)
        `,
        [
            fullname,
            email,
            mobile,
            department,
            hashedPassword
        ]);

        res.json({
            success: true,
            message: "Teacher Added Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ==========================================
// UPDATE TEACHER
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const {
            fullname,
            email,
            mobile,
            department
        } = req.body;

        await db.query(`
            UPDATE teachers
            SET
                fullname=?,
                email=?,
                mobile=?,
                department=?
            WHERE id=?
        `,
        [
            fullname,
            email,
            mobile,
            department,
            req.params.id
        ]);

        res.json({
            success: true,
            message: "Teacher Updated Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ==========================================
// DELETE TEACHER
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM teachers WHERE id=?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Teacher Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;