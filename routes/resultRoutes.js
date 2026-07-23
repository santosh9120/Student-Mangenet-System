// ==========================================
// Student Management System
// routes/resultRoutes.js
// ==========================================

const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================================
// GET ALL RESULTS
// GET : /api/results
// ==========================================

router.get("/", async (req, res) => {

    try {

        const [results] = await db.query(

            `SELECT
                results.id,
                students.fullname,
                students.rollno,
                students.department,
                results.semester,
                results.subject,
                results.marks,
                results.grade
            FROM results
            INNER JOIN students
            ON results.student_id = students.id
            ORDER BY results.id DESC`

        );

        res.json({

            success: true,

            total: results.length,

            results

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
// RESULT STATISTICS
// GET : /api/results/stats
// ==========================================

router.get("/stats/count", async (req, res) => {

    try {

        const [[total]] = await db.query(

            "SELECT COUNT(*) totalResults FROM results"

        );

        const [[average]] = await db.query(

            "SELECT AVG(marks) averageMarks FROM results"

        );

        res.json({

            success: true,

            totalResults: total.totalResults,

            averageMarks: Number(average.averageMarks).toFixed(2)

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
// GET RESULT BY STUDENT
// GET : /api/results/student/:studentId
// ==========================================

router.get("/student/:studentId", async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const [results] = await db.query(

            `SELECT
                results.id,
                results.semester,
                results.subject,
                results.marks,
                results.grade,
                students.fullname,
                students.rollno
            FROM results
            INNER JOIN students
            ON students.id = results.student_id
            WHERE student_id=?
            ORDER BY semester ASC`,

            [studentId]

        );

        res.json({

            success: true,

            total: results.length,

            results

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
// GET RESULT BY ID
// GET : /api/results/:id
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const [result] = await db.query(

            "SELECT * FROM results WHERE id=?",

            [req.params.id]

        );

        if (result.length === 0) {

            return res.json({

                success: false,

                message: "Result Not Found"

            });

        }

        res.json({

            success: true,

            result: result[0]

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});
// ==========================================
// ADD NEW RESULT
// POST : /api/results
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {

            student_id,
            semester,
            subject,
            marks

        } = req.body;

        // ==========================
        // Validation
        // ==========================

        if (
            !student_id ||
            !semester ||
            !subject ||
            marks === undefined
        ) {

            return res.json({

                success: false,

                message: "Please Fill All Fields"

            });

        }

        if (marks < 0 || marks > 100) {

            return res.json({

                success: false,

                message: "Marks must be between 0 and 100"

            });

        }

        // ==========================
        // Student Exists?
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
        // Duplicate Subject Check
        // ==========================

        const [duplicate] = await db.query(

            `SELECT id
             FROM results
             WHERE student_id=?
             AND semester=?
             AND subject=?`,

            [

                student_id,
                semester,
                subject

            ]

        );

        if (duplicate.length > 0) {

            return res.json({

                success: false,

                message: "Result Already Exists"

            });

        }

        // ==========================
        // Calculate Grade
        // ==========================

        let grade = "";

        if (marks >= 90)

            grade = "A+";

        else if (marks >= 80)

            grade = "A";

        else if (marks >= 70)

            grade = "B+";

        else if (marks >= 60)

            grade = "B";

        else if (marks >= 50)

            grade = "C";

        else if (marks >= 40)

            grade = "D";

        else

            grade = "F";

        // ==========================
        // Insert Result
        // ==========================

        await db.query(

            `INSERT INTO results
            (
                student_id,
                semester,
                subject,
                marks,
                grade
            )
            VALUES
            (
                ?,?,?,?,?
            )`,

            [

                student_id,
                semester,
                subject,
                marks,
                grade

            ]

        );

        res.json({

            success: true,

            message: "Result Added Successfully"

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
// UPDATE RESULT
// PUT : /api/results/:id
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {
            semester,
            subject,
            marks
        } = req.body;

        // Check Result Exists

        const [result] = await db.query(

            "SELECT * FROM results WHERE id=?",

            [id]

        );

        if (result.length === 0) {

            return res.json({

                success: false,

                message: "Result Not Found"

            });

        }

        if (marks < 0 || marks > 100) {

            return res.json({

                success: false,

                message: "Marks must be between 0 and 100"

            });

        }

        // Calculate Grade

        let grade = "";

        if (marks >= 90) grade = "A+";
        else if (marks >= 80) grade = "A";
        else if (marks >= 70) grade = "B+";
        else if (marks >= 60) grade = "B";
        else if (marks >= 50) grade = "C";
        else if (marks >= 40) grade = "D";
        else grade = "F";

        await db.query(

            `UPDATE results
             SET
                semester=?,
                subject=?,
                marks=?,
                grade=?
             WHERE id=?`,

            [

                semester,
                subject,
                marks,
                grade,
                id

            ]

        );

        res.json({

            success: true,

            message: "Result Updated Successfully"

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
// DELETE RESULT
// DELETE : /api/results/:id
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [result] = await db.query(

            "SELECT id FROM results WHERE id=?",

            [id]

        );

        if (result.length === 0) {

            return res.json({

                success: false,

                message: "Result Not Found"

            });

        }

        await db.query(

            "DELETE FROM results WHERE id=?",

            [id]

        );

        res.json({

            success: true,

            message: "Result Deleted Successfully"

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
// SEARCH RESULT
// GET : /api/results/search/:keyword
// ==========================================

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = "%" + req.params.keyword + "%";

        const [results] = await db.query(

            `SELECT
                results.id,
                students.fullname,
                students.rollno,
                results.semester,
                results.subject,
                results.marks,
                results.grade
            FROM results
            INNER JOIN students
            ON students.id = results.student_id
            WHERE
                students.fullname LIKE ?
                OR students.rollno LIKE ?
                OR results.subject LIKE ?
                OR results.semester LIKE ?
            ORDER BY students.fullname ASC`,

            [

                keyword,
                keyword,
                keyword,
                keyword

            ]

        );

        res.json({

            success: true,

            total: results.length,

            results

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
// FILTER BY SEMESTER
// GET : /api/results/semester/:semester
// ==========================================

router.get("/semester/:semester", async (req, res) => {

    try {

        const semester = req.params.semester;

        const [results] = await db.query(

            `SELECT
                results.id,
                students.fullname,
                students.rollno,
                results.subject,
                results.marks,
                results.grade
            FROM results
            INNER JOIN students
            ON students.id = results.student_id
            WHERE results.semester=?
            ORDER BY students.fullname`,

            [semester]

        );

        res.json({

            success: true,

            total: results.length,

            results

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
// GPA CALCULATION
// GET : /api/results/gpa/:studentId
// ==========================================

router.get("/gpa/:studentId", async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const [[row]] = await db.query(

            `SELECT AVG(marks) AS averageMarks
             FROM results
             WHERE student_id=?`,

            [studentId]

        );

        const avg = Number(row.averageMarks || 0);

        let gpa = 0;

        if (avg >= 90) gpa = 10.0;
        else if (avg >= 80) gpa = 9.0;
        else if (avg >= 70) gpa = 8.0;
        else if (avg >= 60) gpa = 7.0;
        else if (avg >= 50) gpa = 6.0;
        else if (avg >= 40) gpa = 5.0;
        else gpa = 0.0;

        res.json({

            success: true,

            averageMarks: avg.toFixed(2),

            gpa: gpa.toFixed(2)

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
// EXPORT ROUTER
// ==========================================

module.exports = router;