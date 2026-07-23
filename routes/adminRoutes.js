const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Admin Route Working"
    });
});

router.post("/login", (req, res) => {

    console.log("POST /api/admin/login");
    console.log(req.body);

    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        return res.json({
            success: true,
            message: "Login Successful"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid Username or Password"
    });

});

module.exports = router;