const express = require("express");
const router = express.Router();
const db = require("../db");

// ==============================
// Get All Notices
// ==============================
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM notices ORDER BY notice_date DESC"
        );

        res.json({
            success: true,
            notices: rows
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

// ==============================
// Add Notice
// ==============================
router.post("/", async (req, res) => {

    const { title, description, notice_date } = req.body;

    if (!title || !description || !notice_date) {

        return res.json({
            success: false,
            message: "Please fill all fields."
        });

    }

    try {

        await db.query(
            "INSERT INTO notices(title,description,notice_date) VALUES(?,?,?)",
            [title, description, notice_date]
        );

        res.json({
            success: true,
            message: "Notice Added Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ==============================
// Delete Notice
// ==============================
router.delete("/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM notices WHERE id=?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Notice Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;