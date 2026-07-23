// =======================================
// View Students JavaScript
// Student Management System
// =======================================

// Search Student
function searchStudent() {

    let input = document.getElementById("searchInput");
    let filter = input.value.toUpperCase();

    let table = document.getElementById("studentTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {

        let td = tr[i].getElementsByTagName("td")[1];

        if (td) {

            let textValue = td.textContent || td.innerText;

            if (textValue.toUpperCase().indexOf(filter) > -1) {

                tr[i].style.display = "";

            } else {

                tr[i].style.display = "none";

            }

        }

    }

}

// =============================
// Delete Student
// =============================

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {

    button.addEventListener("click", function () {

        let row = this.parentElement.parentElement;

        let studentName = row.cells[1].innerText;

        if (confirm("Delete " + studentName + " ?")) {

            row.remove();

            alert(studentName + " Deleted Successfully");

        }

    });

});

// =============================
// Edit Student
// =============================

const editButtons = document.querySelectorAll(".edit-btn");

editButtons.forEach(button => {

    button.addEventListener("click", function () {

        let row = this.parentElement.parentElement;

        let studentName = row.cells[1].innerText;

        alert("Edit Student : " + studentName);

        // Future
        // window.location.href="edit-student.html";

    });

});

// =============================
// Highlight Selected Row
// =============================

const rows = document.querySelectorAll("#studentTable tbody tr");

rows.forEach(row => {

    row.addEventListener("click", function () {

        rows.forEach(r => r.classList.remove("selected"));

        this.classList.add("selected");

    });

});

// =============================
// Table Hover Effect
// =============================

rows.forEach(row => {

    row.addEventListener("mouseover", function () {

        this.style.cursor = "pointer";

    });

});

// =============================
// Page Loaded
// =============================

window.onload = function () {

    console.log("View Students Page Loaded Successfully");

};

// =============================
// Student Count
// =============================

function updateStudentCount() {

    const rows = document.querySelectorAll("#studentTable tbody tr");

    console.log("Total Students : " + rows.length);

}

updateStudentCount();

// =============================
// Refresh Table
// =============================

function refreshTable() {

    location.reload();

}

// =============================
// Export Feature (Demo)
// =============================

function exportStudents() {

    alert("Export Feature Coming Soon!");

}

// =============================
// Print Table
// =============================

function printStudents() {

    window.print();

}
