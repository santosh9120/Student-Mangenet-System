// ==========================================
// Student Management System
// routes/feeRoutes.js
// ==========================================

const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================================
// SEARCH FEES
// GET : /api/fees/search/:keyword
// ==========================================

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = "%" + req.params.keyword + "%";

        const [fees] = await db.query(

            `SELECT
                fees.id,
                students.fullname,
                students.rollno,
                fees.fee_type,
                fees.amount,
                fees.paid_amount,
                fees.due_amount,
                fees.payment_status,
                fees.payment_date
            FROM fees
            INNER JOIN students
            ON students.id = fees.student_id
            WHERE
                students.fullname LIKE ?
                OR students.rollno LIKE ?
                OR fees.fee_type LIKE ?
                OR fees.payment_status LIKE ?
            ORDER BY fees.id DESC`,

            [

                keyword,
                keyword,
                keyword,
                keyword

            ]

        );

        res.json({

            success: true,

            total: fees.length,

            fees

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
// FEE STATISTICS
// GET : /api/fees/stats/count
// ==========================================

router.get("/stats/count", async (req, res) => {

    try {

        const [[total]] = await db.query(

            "SELECT COUNT(*) totalFees FROM fees"

        );

        const [[collection]] = await db.query(

            `SELECT
                SUM(amount) totalAmount,
                SUM(paid_amount) totalPaid,
                SUM(due_amount) totalDue
            FROM fees`

        );

        res.json({

            success: true,

            totalFees: total.totalFees,

            totalAmount: collection.totalAmount || 0,

            totalPaid: collection.totalPaid || 0,

            totalDue: collection.totalDue || 0

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
// GET ALL FEES
// GET : /api/fees
// ==========================================

router.get("/", async (req, res) => {

    try {

        const [fees] = await db.query(

            `SELECT
                fees.id,
                students.fullname,
                students.rollno,
                students.department,
                fees.fee_type,
                fees.amount,
                fees.paid_amount,
                fees.due_amount,
                fees.payment_status,
                fees.payment_date
            FROM fees
            INNER JOIN students
            ON students.id = fees.student_id
            ORDER BY fees.id DESC`

        );

        res.json({

            success: true,

            total: fees.length,

            fees

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
// GET FEE BY ID
// GET : /api/fees/:id
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const [fee] = await db.query(

            `SELECT
                fees.*,
                students.fullname,
                students.rollno
            FROM fees
            INNER JOIN students
            ON students.id = fees.student_id
            WHERE fees.id=?`,

            [

                req.params.id

            ]

        );

        if (fee.length === 0) {

            return res.json({

                success: false,

                message: "Fee Record Not Found"

            });

        }

        res.json({

            success: true,

            fee: fee[0]

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
// ADD NEW FEE
// POST : /api/fees
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {

            student_id,
            fee_type,
            amount,
            paid_amount,
            payment_date

        } = req.body;

        // ==========================
        // Validation
        // ==========================

        if (

            !student_id ||
            !fee_type ||
            amount === undefined

        ) {

            return res.json({

                success: false,

                message: "Please Fill All Fields"

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
        // Calculate Payment
        // ==========================

        const totalAmount = Number(amount);

        const paid = Number(paid_amount || 0);

        const due = totalAmount - paid;

        let status = "Pending";

        if (paid === 0) {

            status = "Pending";

        } else if (paid >= totalAmount) {

            status = "Paid";

        } else {

            status = "Partial";

        }

        // ==========================
        // Insert Fee
        // ==========================

        await db.query(

            `INSERT INTO fees
            (
                student_id,
                fee_type,
                amount,
                paid_amount,
                due_amount,
                payment_date,
                payment_status
            )
            VALUES
            (
                ?,?,?,?,?,?,?
            )`,

            [

                student_id,
                fee_type,
                totalAmount,
                paid,
                due,
                payment_date || null,
                status

            ]

        );

        res.json({

            success: true,

            message: "Fee Added Successfully"

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
// GET FEES OF ONE STUDENT
// GET : /api/fees/student/:studentId
// ==========================================

router.get("/student/:studentId", async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const [fees] = await db.query(

            `SELECT
                id,
                fee_type,
                amount,
                paid_amount,
                due_amount,
                payment_date,
                payment_status
            FROM fees
            WHERE student_id=?
            ORDER BY id DESC`,

            [

                studentId

            ]

        );

        res.json({

            success: true,

            total: fees.length,

            fees

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
// UPDATE FEE
// PUT : /api/fees/:id
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            fee_type,
            amount,
            paid_amount,
            payment_date

        } = req.body;

        const [fee] = await db.query(

            "SELECT * FROM fees WHERE id=?",

            [id]

        );

        if (fee.length === 0) {

            return res.json({

                success: false,

                message: "Fee Record Not Found"

            });

        }

        const totalAmount = Number(amount);
        const paid = Number(paid_amount);

        if (paid > totalAmount) {

            return res.json({

                success: false,

                message: "Paid Amount Cannot Be Greater Than Total Amount"

            });

        }

        const due = totalAmount - paid;

        let status = "Pending";

        if (paid === 0) {

            status = "Pending";

        } else if (paid >= totalAmount) {

            status = "Paid";

        } else {

            status = "Partial";

        }

        await db.query(

            `UPDATE fees
             SET
                fee_type=?,
                amount=?,
                paid_amount=?,
                due_amount=?,
                payment_date=?,
                payment_status=?
             WHERE id=?`,

            [

                fee_type,
                totalAmount,
                paid,
                due,
                payment_date,
                status,
                id

            ]

        );

        res.json({

            success: true,

            message: "Fee Updated Successfully"

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
// DELETE FEE
// DELETE : /api/fees/:id
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [fee] = await db.query(

            "SELECT id FROM fees WHERE id=?",

            [id]

        );

        if (fee.length === 0) {

            return res.json({

                success: false,

                message: "Fee Record Not Found"

            });

        }

        await db.query(

            "DELETE FROM fees WHERE id=?",

            [id]

        );

        res.json({

            success: true,

            message: "Fee Deleted Successfully"

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
// MONTHLY COLLECTION REPORT
// GET : /api/fees/report/monthly
// ==========================================

router.get("/report/monthly", async (req, res) => {

    try {

        const [report] = await db.query(

            `SELECT

                DATE_FORMAT(payment_date,'%Y-%m') AS month,

                COUNT(*) AS totalTransactions,

                SUM(amount) AS totalFees,

                SUM(paid_amount) AS totalCollected,

                SUM(due_amount) AS totalDue

            FROM fees

            GROUP BY DATE_FORMAT(payment_date,'%Y-%m')

            ORDER BY month DESC`

        );

        res.json({

            success: true,

            report

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