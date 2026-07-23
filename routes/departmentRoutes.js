const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================
// GET ALL DEPARTMENTS
// ==========================
router.get("/", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM departments ORDER BY id DESC"
        );

        res.json({
            success: true,
            departments: rows
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


// ==========================
// GET SINGLE
// ==========================
router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM departments WHERE id=?",
            [req.params.id]
        );

        if (rows.length == 0) {

            return res.json({
                success: false,
                message: "Department Not Found"
            });

        }

        res.json({
            success: true,
            department: rows[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


// ==========================
// ADD
// ==========================
router.post("/", async (req, res) => {

    try {

        const {
            department_name,
            hod
        } = req.body;

        await db.query(

            `INSERT INTO departments
            (department_name,hod)
            VALUES(?,?)`,

            [
                department_name,
                hod
            ]

        );

        res.json({

            success: true,
            message: "Department Added"

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

});


// ==========================
// UPDATE
// ==========================
router.put("/:id", async (req, res) => {

    try {

        const {
            department_name,
            hod
        } = req.body;

        await db.query(

            `UPDATE departments
            SET department_name=?,
            hod=?
            WHERE id=?`,

            [
                department_name,
                hod,
                req.params.id
            ]

        );

        res.json({

            success: true,
            message: "Department Updated"

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

});


// ==========================
// DELETE
// ==========================
router.delete("/:id", async (req, res) => {

    try {

        await db.query(

            "DELETE FROM departments WHERE id=?",

            [req.params.id]

        );

        res.json({

            success: true,
            message: "Department Deleted"

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

});


// ==========================
// SEARCH
// ==========================
router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = "%" + req.params.keyword + "%";

        const [rows] = await db.query(

            `SELECT *
            FROM departments
            WHERE department_name LIKE ?
            OR hod LIKE ?`,

            [
                keyword,
                keyword
            ]

        );

        res.json({

            success: true,
            departments: rows

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

});

module.exports = router;