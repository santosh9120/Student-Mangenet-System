const express = require("express");
const router = express.Router();
const db = require("../db");

// Get Student Profile
router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [rows] = await db.query(
            "SELECT * FROM students WHERE id=?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        res.json({
            success: true,
            profile: rows[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;