// ==========================================
// Student Management System
// routes/courseRoutes.js
// ==========================================

const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================================
// SEARCH COURSE
// GET : /api/courses/search/:keyword
// ==========================================

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = "%" + req.params.keyword + "%";

        const [courses] = await db.query(

            `SELECT *
             FROM courses
             WHERE
             course_code LIKE ?
             OR course_name LIKE ?
             OR department LIKE ?
             OR semester LIKE ?
             ORDER BY course_name ASC`,

            [

                keyword,
                keyword,
                keyword,
                keyword

            ]

        );

        res.json({

            success: true,

            total: courses.length,

            courses

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
// COURSE STATISTICS
// GET : /api/courses/stats/count
// ==========================================

router.get("/stats/count", async (req, res) => {

    try {

        const [[total]] = await db.query(

            "SELECT COUNT(*) totalCourses FROM courses"

        );

        const [departments] = await db.query(

            `SELECT
                department,
                COUNT(*) total
             FROM courses
             GROUP BY department`

        );

        res.json({

            success: true,

            totalCourses: total.totalCourses,

            departmentWise: departments

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
// GET ALL COURSES
// GET : /api/courses
// ==========================================

router.get("/", async (req, res) => {

    try {

        const [courses] = await db.query(

            `SELECT *
             FROM courses
             ORDER BY id DESC`

        );

        res.json({

            success: true,

            total: courses.length,

            courses

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
// GET COURSE BY ID
// GET : /api/courses/:id
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const [course] = await db.query(

            "SELECT * FROM courses WHERE id=?",

            [req.params.id]

        );

        if (course.length === 0) {

            return res.json({

                success: false,

                message: "Course Not Found"

            });

        }

        res.json({

            success: true,

            course: course[0]

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
// ADD COURSE
// POST : /api/courses
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {

            course_code,
            course_name,
            department,
            semester,
            credits

        } = req.body;

        // Validation

        if (

            !course_code ||
            !course_name ||
            !department ||
            !semester ||
            !credits

        ) {

            return res.json({

                success: false,

                message: "Please Fill All Fields"

            });

        }

        // Duplicate Course Code

        const [exists] = await db.query(

            "SELECT id FROM courses WHERE course_code=?",

            [course_code]

        );

        if (exists.length > 0) {

            return res.json({

                success: false,

                message: "Course Code Already Exists"

            });

        }

        await db.query(

            `INSERT INTO courses
            (
                course_code,
                course_name,
                department,
                semester,
                credits
            )
            VALUES
            (
                ?,?,?,?,?
            )`,

            [

                course_code,
                course_name,
                department,
                semester,
                credits

            ]

        );

        res.json({

            success: true,

            message: "Course Added Successfully"

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
// UPDATE COURSE
// PUT : /api/courses/:id
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            course_code,
            course_name,
            department,
            semester,
            credits

        } = req.body;

        const [course] = await db.query(

            "SELECT id FROM courses WHERE id=?",

            [id]

        );

        if (course.length === 0) {

            return res.json({

                success: false,

                message: "Course Not Found"

            });

        }

        const [duplicate] = await db.query(

            "SELECT id FROM courses WHERE course_code=? AND id<>?",

            [

                course_code,
                id

            ]

        );

        if (duplicate.length > 0) {

            return res.json({

                success: false,

                message: "Course Code Already Exists"

            });

        }

        await db.query(

            `UPDATE courses
            SET
                course_code=?,
                course_name=?,
                department=?,
                semester=?,
                credits=?
            WHERE id=?`,

            [

                course_code,
                course_name,
                department,
                semester,
                credits,
                id

            ]

        );

        res.json({

            success: true,

            message: "Course Updated Successfully"

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
// DELETE COURSE
// DELETE : /api/courses/:id
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [course] = await db.query(

            "SELECT id FROM courses WHERE id=?",

            [id]

        );

        if (course.length === 0) {

            return res.json({

                success: false,

                message: "Course Not Found"

            });

        }

        await db.query(

            "DELETE FROM courses WHERE id=?",

            [id]

        );

        res.json({

            success: true,

            message: "Course Deleted Successfully"

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
// FILTER BY DEPARTMENT
// GET : /api/courses/department/:department
// ==========================================

router.get("/department/:department", async (req, res) => {

    try {

        const [courses] = await db.query(

            "SELECT * FROM courses WHERE department=? ORDER BY semester",

            [

                req.params.department

            ]

        );

        res.json({

            success: true,

            total: courses.length,

            courses

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
// FILTER BY SEMESTER
// GET : /api/courses/semester/:semester
// ==========================================

router.get("/semester/:semester", async (req, res) => {

    try {

        const [courses] = await db.query(

            "SELECT * FROM courses WHERE semester=? ORDER BY course_name",

            [

                req.params.semester

            ]

        );

        res.json({

            success: true,

            total: courses.length,

            courses

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
// EXPORT ROUTER
// ==========================================

module.exports = router;