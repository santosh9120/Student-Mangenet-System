// ==========================================
// Student Management System
// Settings Routes
// File : routes/settingsRoutes.js
// ==========================================

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const db = require("../db");

// ==========================================
// Update Student Settings
// PUT : /api/settings/update
// ==========================================

router.put("/update", async (req, res) => {

    try {

        const {
            id,
            fullname,
            email,
            mobile,
            currentPassword,
            newPassword
        } = req.body;

        if (!id) {

            return res.json({
                success: false,
                message: "Student ID Missing"
            });

        }

        // Get Student

        const [rows] = await db.query(

            "SELECT * FROM students WHERE id=?",

            [id]

        );

        if (rows.length === 0) {

            return res.json({

                success: false,

                message: "Student not found"

            });

        }

        const student = rows[0];

        // ==================================
        // Change Password
        // ==================================

        let password = student.password;

        if (newPassword && newPassword !== "") {

            const match = await bcrypt.compare(

                currentPassword,

                student.password

            );

            if (!match) {

                return res.json({

                    success: false,

                    message: "Current Password Incorrect"

                });

            }

            password = await bcrypt.hash(newPassword, 10);

        }

        // ==================================
        // Update Database
        // ==================================

        await db.query(

            `UPDATE students
             SET fullname=?,
                 email=?,
                 mobile=?,
                 password=?
             WHERE id=?`,

            [

                fullname,

                email,

                mobile,

                password,

                id

            ]

        );

        // ==================================
        // Return Updated Student
        // ==================================

        const [updated] = await db.query(

            "SELECT * FROM students WHERE id=?",

            [id]

        );

        const s = updated[0];

        res.json({

            success: true,

            message: "Settings Updated Successfully",

            student: {

                id: s.id,

                fullname: s.fullname,

                email: s.email,

                mobile: s.mobile,

                rollno: s.rollno,

                department: s.department

            }

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

module.exports = router;