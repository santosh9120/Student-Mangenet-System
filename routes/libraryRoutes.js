// ==========================================
// Student Management System
// routes/libraryRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const db = require("../db");

// ==========================================
// SEARCH BOOK
// GET /api/library/search/:keyword
// ==========================================

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = "%" + req.params.keyword + "%";

        const [books] = await db.query(

            `SELECT *
             FROM library_books
             WHERE
             book_name LIKE ?
             OR author LIKE ?
             OR category LIKE ?
             OR book_code LIKE ?
             ORDER BY book_name`,

            [

                keyword,
                keyword,
                keyword,
                keyword

            ]

        );

        res.json({

            success: true,

            total: books.length,

            books

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
// LIBRARY STATISTICS
// ==========================================

router.get("/stats/count", async(req,res)=>{

    try{

        const [[books]]=await db.query(

            "SELECT COUNT(*) totalBooks FROM library_books"

        );

        const [[issued]]=await db.query(

            "SELECT COUNT(*) totalIssued FROM issued_books WHERE status='Issued'"

        );

        const [[available]]=await db.query(

            "SELECT SUM(available_quantity) totalAvailable FROM library_books"

        );

        res.json({

            success:true,

            totalBooks:books.totalBooks,

            totalIssued:issued.totalIssued,

            totalAvailable:available.totalAvailable

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
// GET ALL BOOKS
// ==========================================

router.get("/", async(req,res)=>{

    try{

        const [books]=await db.query(

            "SELECT * FROM library_books ORDER BY id DESC"

        );

        res.json({

            success:true,

            total:books.length,

            books

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
// GET BOOK BY ID
// ==========================================

router.get("/:id", async(req,res)=>{

    try{

        const [book]=await db.query(

            "SELECT * FROM library_books WHERE id=?",

            [req.params.id]

        );

        if(book.length==0){

            return res.json({

                success:false,

                message:"Book Not Found"

            });

        }

        res.json({

            success:true,

            book:book[0]

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
// ADD BOOK
// POST : /api/library
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {

            book_code,
            book_name,
            author,
            publisher,
            category,
            quantity,
            shelf_no

        } = req.body;

        // ==========================
        // Validation
        // ==========================

        if (

            !book_code ||
            !book_name ||
            !author ||
            !category ||
            !quantity

        ) {

            return res.json({

                success: false,

                message: "Please Fill All Required Fields"

            });

        }

        // ==========================
        // Duplicate Book Code
        // ==========================

        const [exists] = await db.query(

            "SELECT id FROM library_books WHERE book_code=?",

            [book_code]

        );

        if (exists.length > 0) {

            return res.json({

                success: false,

                message: "Book Code Already Exists"

            });

        }

        // ==========================
        // Insert Book
        // ==========================

        await db.query(

            `INSERT INTO library_books
            (
                book_code,
                book_name,
                author,
                publisher,
                category,
                quantity,
                available_quantity,
                shelf_no
            )
            VALUES
            (
                ?,?,?,?,?,?,?,?
            )`,

            [

                book_code,
                book_name,
                author,
                publisher,
                category,
                quantity,
                quantity,
                shelf_no

            ]

        );

        res.json({

            success: true,

            message: "Book Added Successfully"

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
// UPDATE BOOK
// PUT : /api/library/:id
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            book_code,
            book_name,
            author,
            publisher,
            category,
            quantity,
            shelf_no

        } = req.body;

        const [book] = await db.query(

            "SELECT * FROM library_books WHERE id=?",

            [id]

        );

        if (book.length === 0) {

            return res.json({

                success: false,

                message: "Book Not Found"

            });

        }

        const [duplicate] = await db.query(

            "SELECT id FROM library_books WHERE book_code=? AND id<>?",

            [

                book_code,
                id

            ]

        );

        if (duplicate.length > 0) {

            return res.json({

                success: false,

                message: "Book Code Already Exists"

            });

        }

        await db.query(

            `UPDATE library_books
            SET
                book_code=?,
                book_name=?,
                author=?,
                publisher=?,
                category=?,
                quantity=?,
                shelf_no=?
            WHERE id=?`,

            [

                book_code,
                book_name,
                author,
                publisher,
                category,
                quantity,
                shelf_no,
                id

            ]

        );

        res.json({

            success: true,

            message: "Book Updated Successfully"

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
// DELETE BOOK
// DELETE : /api/library/:id
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [book] = await db.query(

            "SELECT id FROM library_books WHERE id=?",

            [id]

        );

        if (book.length === 0) {

            return res.json({

                success: false,

                message: "Book Not Found"

            });

        }

        await db.query(

            "DELETE FROM library_books WHERE id=?",

            [id]

        );

        res.json({

            success: true,

            message: "Book Deleted Successfully"

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
// ISSUE BOOK
// POST : /api/library/issue
// ==========================================

router.post("/issue", async (req, res) => {

    try {

        const {

            student_id,
            book_id,
            issue_date,
            due_date

        } = req.body;

        if (

            !student_id ||
            !book_id ||
            !issue_date ||
            !due_date

        ) {

            return res.json({

                success: false,

                message: "Please Fill All Fields"

            });

        }

        // Check Student

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

        // Check Book

        const [book] = await db.query(

            "SELECT * FROM library_books WHERE id=?",

            [book_id]

        );

        if (book.length === 0) {

            return res.json({

                success: false,

                message: "Book Not Found"

            });

        }

        if (book[0].available_quantity <= 0) {

            return res.json({

                success: false,

                message: "Book Out Of Stock"

            });

        }

        // Issue Book

        await db.query(

            `INSERT INTO issued_books
            (
                student_id,
                book_id,
                issue_date,
                due_date
            )
            VALUES
            (
                ?,?,?,?
            )`,

            [

                student_id,
                book_id,
                issue_date,
                due_date

            ]

        );

        // Reduce Quantity

        await db.query(

            `UPDATE library_books
             SET available_quantity =
             available_quantity - 1
             WHERE id=?`,

            [book_id]

        );

        res.json({

            success: true,

            message: "Book Issued Successfully"

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
// RETURN BOOK
// PUT : /api/library/return/:id
// ==========================================

router.put("/return/:id", async (req, res) => {

    try {

        const issueId = req.params.id;

        const { return_date } = req.body;

        const [issue] = await db.query(

            "SELECT * FROM issued_books WHERE id=?",

            [issueId]

        );

        if (issue.length === 0) {

            return res.json({

                success: false,

                message: "Issue Record Not Found"

            });

        }

        if (issue[0].status === "Returned") {

            return res.json({

                success: false,

                message: "Book Already Returned"

            });

        }

        // Fine Calculation

        const dueDate = new Date(issue[0].due_date);

        const returnDate = new Date(return_date);

        let fine = 0;

        if (returnDate > dueDate) {

            const days = Math.ceil(

                (returnDate - dueDate) /

                (1000 * 60 * 60 * 24)

            );

            fine = days * 10;

        }

        // Update Issue

        await db.query(

            `UPDATE issued_books
             SET
                return_date=?,
                fine=?,
                status='Returned'
             WHERE id=?`,

            [

                return_date,
                fine,
                issueId

            ]

        );

        // Increase Quantity

        await db.query(

            `UPDATE library_books
             SET available_quantity =
             available_quantity + 1
             WHERE id=?`,

            [

                issue[0].book_id

            ]

        );

        res.json({

            success: true,

            fine,

            message: "Book Returned Successfully"

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
// ISSUE HISTORY
// GET : /api/library/history
// ==========================================

router.get("/history", async (req, res) => {

    try {

        const [history] = await db.query(

            `SELECT

                issued_books.id,

                students.fullname,

                students.rollno,

                library_books.book_name,

                issued_books.issue_date,

                issued_books.due_date,

                issued_books.return_date,

                issued_books.fine,

                issued_books.status

            FROM issued_books

            INNER JOIN students
            ON students.id = issued_books.student_id

            INNER JOIN library_books
            ON library_books.id = issued_books.book_id

            ORDER BY issued_books.id DESC`

        );

        res.json({

            success: true,

            total: history.length,

            history

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
// EXPORT ROUTER
// ==========================================

module.exports = router;