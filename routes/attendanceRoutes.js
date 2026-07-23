// ==========================================
// Student Management System
// routes/attendanceRoutes.js
// ==========================================

const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================================
// GET ALL ATTENDANCE
// GET : /api/attendance
// ==========================================

router.get("/", async (req, res) => {

    try {

        const [attendance] = await db.query(

            `SELECT
                attendance.id,
                students.fullname,
                students.rollno,
                students.department,
                attendance.attendance_date,
                attendance.status
            FROM attendance
            INNER JOIN students
            ON attendance.student_id = students.id
            ORDER BY attendance.attendance_date DESC`

        );

        res.json({

            success: true,

            total: attendance.length,

            attendance

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
// GET ATTENDANCE BY ID
// GET : /api/attendance/:id
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [attendance] = await db.query(

            `SELECT
                attendance.*,
                students.fullname,
                students.rollno,
                students.department
             FROM attendance
             INNER JOIN students
             ON attendance.student_id = students.id
             WHERE attendance.id=?`,

            [id]

        );

        if (attendance.length === 0) {

            return res.json({

                success: false,

                message: "Attendance Record Not Found"

            });

        }

        res.json({

            success: true,

            attendance: attendance[0]

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
// ATTENDANCE STATISTICS
// GET : /api/attendance/stats
// ==========================================

router.get("/stats/count", async (req, res) => {

    try {

        const [[total]] = await db.query(

            "SELECT COUNT(*) AS totalAttendance FROM attendance"

        );

        const [statusWise] = await db.query(

            `SELECT
                status,
                COUNT(*) AS total
             FROM attendance
             GROUP BY status`

        );

        res.json({

            success: true,

            totalAttendance: total.totalAttendance,

            statusWise

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
// MARK ATTENDANCE
// POST : /api/attendance
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {

            student_id,
            attendance_date,
            status

        } = req.body;

        // ==========================
        // Validation
        // ==========================

        if (

            !student_id ||
            !attendance_date ||
            !status

        ) {

            return res.json({

                success: false,

                message: "Please Fill All Fields"

            });

        }

        // ==========================
        // Check Student Exists
        // ==========================

        const [student] = await db.query(

            "SELECT id FROM students WHERE id=?",

            [student_id]

        );

        if (student.length === 0) {

            return res.json({

                success: false,

                message: "Student Not Found"

            });

        }

        // ==========================
        // Prevent Duplicate Attendance
        // ==========================

        const [attendance] = await db.query(

            `SELECT id
             FROM attendance
             WHERE student_id=?
             AND attendance_date=?`,

            [

                student_id,
                attendance_date

            ]

        );

        if (attendance.length > 0) {

            return res.json({

                success: false,

                message: "Attendance Already Marked"

            });

        }

        // ==========================
        // Insert Attendance
        // ==========================

        await db.query(

            `INSERT INTO attendance
            (
                student_id,
                attendance_date,
                status
            )
            VALUES
            (
                ?,
                ?,
                ?
            )`,

            [

                student_id,
                attendance_date,
                status

            ]

        );

        res.json({

            success: true,

            message: "Attendance Marked Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

// ==========================================
// GET ATTENDANCE OF ONE STUDENT
// GET : /api/attendance/student/:studentId
// ==========================================

router.get("/student/:studentId", async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const [records] = await db.query(

            `SELECT
                attendance.id,
                attendance.attendance_date,
                attendance.status,
                students.fullname,
                students.rollno
            FROM attendance
            INNER JOIN students
            ON attendance.student_id = students.id
            WHERE attendance.student_id=?
            ORDER BY attendance.attendance_date DESC`,

            [studentId]

        );

        res.json({

            success: true,

            total: records.length,

            attendance: records

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});
// ==========================================
// UPDATE ATTENDANCE
// PUT : /api/attendance/:id
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            attendance_date,
            status

        } = req.body;

        const [record] = await db.query(

            "SELECT * FROM attendance WHERE id=?",

            [id]

        );

        if (record.length === 0) {

            return res.json({

                success: false,

                message: "Attendance Record Not Found"

            });

        }

        await db.query(

            `UPDATE attendance
             SET attendance_date=?,
                 status=?
             WHERE id=?`,

            [

                attendance_date,
                status,
                id

            ]

        );

        res.json({

            success: true,

            message: "Attendance Updated Successfully"

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
// DELETE ATTENDANCE
// DELETE : /api/attendance/:id
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [record] = await db.query(

            "SELECT id FROM attendance WHERE id=?",

            [id]

        );

        if (record.length === 0) {

            return res.json({

                success: false,

                message: "Attendance Record Not Found"

            });

        }

        await db.query(

            "DELETE FROM attendance WHERE id=?",

            [id]

        );

        res.json({

            success: true,

            message: "Attendance Deleted Successfully"

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
// SEARCH ATTENDANCE
// GET : /api/attendance/search/:keyword
// ==========================================

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = "%" + req.params.keyword + "%";

        const [attendance] = await db.query(

            `SELECT
                attendance.id,
                students.fullname,
                students.rollno,
                students.department,
                attendance.attendance_date,
                attendance.status
            FROM attendance
            INNER JOIN students
            ON attendance.student_id = students.id
            WHERE
                students.fullname LIKE ?
                OR students.rollno LIKE ?
                OR students.department LIKE ?
                OR attendance.status LIKE ?
            ORDER BY attendance.attendance_date DESC`,

            [

                keyword,
                keyword,
                keyword,
                keyword

            ]

        );

        res.json({

            success: true,

            total: attendance.length,

            attendance

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
// FILTER ATTENDANCE BY DATE
// GET : /api/attendance/date/:date
// ==========================================

router.get("/date/:date", async (req, res) => {

    try {

        const date = req.params.date;

        const [attendance] = await db.query(

            `SELECT
                attendance.id,
                students.fullname,
                students.rollno,
                students.department,
                attendance.attendance_date,
                attendance.status
            FROM attendance
            INNER JOIN students
            ON attendance.student_id = students.id
            WHERE attendance.attendance_date=?
            ORDER BY students.fullname ASC`,

            [date]

        );

        res.json({

            success: true,

            total: attendance.length,

            attendance

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
// EXPORT ROUTER
// ==========================================

module.exports = router;