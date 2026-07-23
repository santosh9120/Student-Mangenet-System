// ==========================================
// Student Management System
// routes/timetableRoutes.js
// ==========================================

const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================================
// SEARCH TIMETABLE
// GET : /api/timetable/search/:keyword
// ==========================================

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = "%" + req.params.keyword + "%";

        const [rows] = await db.query(

            `SELECT *
             FROM timetable
             WHERE
                department LIKE ?
                OR semester LIKE ?
                OR subject LIKE ?
                OR faculty LIKE ?
                OR classroom LIKE ?
                OR day_name LIKE ?
             ORDER BY day_name,start_time`,

            [

                keyword,
                keyword,
                keyword,
                keyword,
                keyword,
                keyword

            ]

        );

        res.json({

            success: true,

            total: rows.length,

            timetable: rows

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});

// ==========================================
// TIMETABLE STATISTICS
// GET : /api/timetable/stats/count
// ==========================================

router.get("/stats/count", async(req,res)=>{

    try{

        const [[total]] = await db.query(

            "SELECT COUNT(*) totalClasses FROM timetable"

        );

        const [departmentWise] = await db.query(

            `SELECT
                department,
                COUNT(*) total
             FROM timetable
             GROUP BY department`

        );

        res.json({

            success:true,

            totalClasses:total.totalClasses,

            departmentWise

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});

// ==========================================
// GET ALL TIMETABLE
// GET : /api/timetable
// ==========================================

router.get("/", async(req,res)=>{

    try{

        const [rows] = await db.query(

            `SELECT *
             FROM timetable
             ORDER BY
                FIELD(day_name,
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'),
                start_time`

        );

        res.json({

            success:true,

            total:rows.length,

            timetable:rows

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});

// ==========================================
// GET TIMETABLE BY ID
// GET : /api/timetable/:id
// ==========================================

router.get("/:id", async(req,res)=>{

    try{

        const [row]=await db.query(

            "SELECT * FROM timetable WHERE id=?",

            [req.params.id]

        );

        if(row.length===0){

            return res.json({

                success:false,

                message:"Class Not Found"

            });

        }

        res.json({

            success:true,

            timetable:row[0]

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

});
// ==========================================
// ADD TIMETABLE
// POST : /api/timetable
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {

            department,
            semester,
            day_name,
            start_time,
            end_time,
            subject,
            faculty,
            classroom

        } = req.body;

        // Validation

        if (

            !department ||
            !semester ||
            !day_name ||
            !start_time ||
            !end_time ||
            !subject ||
            !faculty ||
            !classroom

        ) {

            return res.json({

                success: false,

                message: "Please Fill All Fields"

            });

        }

        // Check Duplicate Time Slot

        const [duplicate] = await db.query(

            `SELECT id
             FROM timetable
             WHERE
             department=?
             AND semester=?
             AND day_name=?
             AND start_time=?`,

            [

                department,
                semester,
                day_name,
                start_time

            ]

        );

        if (duplicate.length > 0) {

            return res.json({

                success: false,

                message: "Time Slot Already Exists"

            });

        }

        await db.query(

            `INSERT INTO timetable
            (
                department,
                semester,
                day_name,
                start_time,
                end_time,
                subject,
                faculty,
                classroom
            )
            VALUES
            (
                ?,?,?,?,?,?,?,?
            )`,

            [

                department,
                semester,
                day_name,
                start_time,
                end_time,
                subject,
                faculty,
                classroom

            ]

        );

        res.json({

            success: true,

            message: "Timetable Added Successfully"

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
// UPDATE TIMETABLE
// PUT : /api/timetable/:id
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            department,
            semester,
            day_name,
            start_time,
            end_time,
            subject,
            faculty,
            classroom

        } = req.body;

        const [row] = await db.query(

            "SELECT id FROM timetable WHERE id=?",

            [id]

        );

        if (row.length === 0) {

            return res.json({

                success: false,

                message: "Timetable Record Not Found"

            });

        }

        await db.query(

            `UPDATE timetable
             SET
                department=?,
                semester=?,
                day_name=?,
                start_time=?,
                end_time=?,
                subject=?,
                faculty=?,
                classroom=?
             WHERE id=?`,

            [

                department,
                semester,
                day_name,
                start_time,
                end_time,
                subject,
                faculty,
                classroom,
                id

            ]

        );

        res.json({

            success: true,

            message: "Timetable Updated Successfully"

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
// DELETE TIMETABLE
// DELETE : /api/timetable/:id
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [row] = await db.query(

            "SELECT id FROM timetable WHERE id=?",

            [id]

        );

        if (row.length === 0) {

            return res.json({

                success: false,

                message: "Timetable Record Not Found"

            });

        }

        await db.query(

            "DELETE FROM timetable WHERE id=?",

            [id]

        );

        res.json({

            success: true,

            message: "Timetable Deleted Successfully"

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
// GET : /api/timetable/department/:department
// ==========================================

router.get("/department/:department", async (req, res) => {

    try {

        const [rows] = await db.query(

            `SELECT *
             FROM timetable
             WHERE department=?
             ORDER BY
             FIELD(day_name,
             'Monday',
             'Tuesday',
             'Wednesday',
             'Thursday',
             'Friday',
             'Saturday'),
             start_time`,

            [req.params.department]

        );

        res.json({

            success: true,

            total: rows.length,

            timetable: rows

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
// GET : /api/timetable/semester/:semester
// ==========================================

router.get("/semester/:semester", async (req, res) => {

    try {

        const [rows] = await db.query(

            `SELECT *
             FROM timetable
             WHERE semester=?
             ORDER BY
             FIELD(day_name,
             'Monday',
             'Tuesday',
             'Wednesday',
             'Thursday',
             'Friday',
             'Saturday'),
             start_time`,

            [req.params.semester]

        );

        res.json({

            success: true,

            total: rows.length,

            timetable: rows

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