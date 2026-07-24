// ==========================================
// Attendance Management JavaScript
// ==========================================

const API_URL = (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/attendance";

const attendanceTable = document.getElementById("attendanceTable");
const attendanceForm = document.getElementById("attendanceForm");
const attendanceModal = document.getElementById("attendanceModal");
const modalTitle = document.getElementById("modalTitle");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    loadAttendance();

    updateClock();

    setInterval(updateClock, 1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (clock) {

        clock.innerHTML = new Date().toLocaleString();

    }

}

// ==========================================
// Load Attendance
// ==========================================

async function loadAttendance() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        attendanceTable.innerHTML = "";

        if (!data.success) {

            attendanceTable.innerHTML = `
                <tr>
                    <td colspan="7">No Attendance Records Found</td>
                </tr>
            `;

            return;

        }

        data.attendance.forEach(record => {

            let badge = "";

            if (record.status === "Present") {

                badge = `<span class="present">Present</span>`;

            } else if (record.status === "Absent") {

                badge = `<span class="absent">Absent</span>`;

            } else {

                badge = `<span class="leave">Leave</span>`;

            }

            attendanceTable.innerHTML += `

            <tr>

                <td>${record.id}</td>

                <td>${record.student_name}</td>

                <td>${record.roll_no}</td>

                <td>${record.department}</td>

                <td>${record.date}</td>

                <td>${badge}</td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editAttendance(${record.id})">

                        <i class="fas fa-edit"></i>

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteAttendance(${record.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

        alert("Unable to load attendance.");

    }

}

// ==========================================
// Open Modal
// ==========================================

function openAttendanceModal() {

    attendanceForm.reset();

    document.getElementById("attendanceId").value = "";

    modalTitle.innerHTML = "Add Attendance";

    attendanceModal.style.display = "flex";

}

// ==========================================
// Close Modal
// ==========================================

function closeModal() {

    attendanceModal.style.display = "none";

}

// ==========================================
// Save Attendance
// ==========================================

attendanceForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const id = document.getElementById("attendanceId").value;

    const attendance = {

        student_name: document.getElementById("studentName").value,

        roll_no: document.getElementById("rollNo").value,

        department: document.getElementById("department").value,

        date: document.getElementById("attendanceDate").value,

        status: document.getElementById("status").value

    };

    try {

        let url = API_URL;

        let method = "POST";

        if (id) {

            url += "/" + id;

            method = "PUT";

        }

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(attendance)

        });

        const data = await response.json();

        alert(data.message);

        closeModal();

        loadAttendance();

    }

    catch (error) {

        console.log(error);

        alert("Unable to save attendance.");

    }

});
// ==========================================
// EDIT ATTENDANCE
// ==========================================

async function editAttendance(id){

    try{

        const response = await fetch(API_URL + "/" + id);

        const data = await response.json();

        if(!data.success){

            alert(data.message);
            return;

        }

        const attendance = data.attendance;

        document.getElementById("attendanceId").value = attendance.id;
        document.getElementById("studentName").value = attendance.student_name;
        document.getElementById("rollNo").value = attendance.roll_no;
        document.getElementById("department").value = attendance.department;
        document.getElementById("attendanceDate").value = attendance.date;
        document.getElementById("status").value = attendance.status;

        modalTitle.innerHTML = "Update Attendance";

        attendanceModal.style.display = "flex";

    }

    catch(error){

        console.log(error);

        alert("Unable to load attendance.");

    }

}

// ==========================================
// DELETE ATTENDANCE
// ==========================================

async function deleteAttendance(id){

    if(!confirm("Are you sure you want to delete this attendance record?")){

        return;

    }

    try{

        const response = await fetch(API_URL + "/" + id,{

            method:"DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadAttendance();

    }

    catch(error){

        console.log(error);

        alert("Delete Failed.");

    }

}

// ==========================================
// SEARCH ATTENDANCE
// ==========================================

const search = document.getElementById("search");

if(search){

    search.addEventListener("keyup", async function(){

        const keyword = this.value.trim();

        if(keyword===""){

            loadAttendance();
            return;

        }

        try{

            const response = await fetch(API_URL + "/search/" + keyword);

            const data = await response.json();

            attendanceTable.innerHTML = "";

            if(!data.success || data.attendance.length===0){

                attendanceTable.innerHTML = `
                <tr>
                    <td colspan="7">No Record Found</td>
                </tr>
                `;

                return;

            }

            data.attendance.forEach(record=>{

                let badge="";

                if(record.status==="Present"){

                    badge='<span class="present">Present</span>';

                }
                else if(record.status==="Absent"){

                    badge='<span class="absent">Absent</span>';

                }
                else{

                    badge='<span class="leave">Leave</span>';

                }

                attendanceTable.innerHTML += `

                <tr>

                    <td>${record.id}</td>

                    <td>${record.student_name}</td>

                    <td>${record.roll_no}</td>

                    <td>${record.department}</td>

                    <td>${record.date}</td>

                    <td>${badge}</td>

                    <td>

                        <button class="action-btn edit-btn"
                        onclick="editAttendance(${record.id})">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button class="action-btn delete-btn"
                        onclick="deleteAttendance(${record.id})">

                            <i class="fas fa-trash"></i>

                        </button>

                    </td>

                </tr>

                `;

            });

        }

        catch(error){

            console.log(error);

        }

    });

}

// ==========================================
// SIDEBAR TOGGLE
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.toggle("show");

    });

}

// ==========================================
// LOGOUT
// ==========================================

const logout = document.getElementById("logout");

if(logout){

    logout.addEventListener("click",(e)=>{

        e.preventDefault();

        if(confirm("Are you sure you want to logout?")){

            window.location.href="admin-login.html";

        }

    });

}

// ==========================================
// CLOSE MODAL
// ==========================================

window.onclick = function(event){

    if(event.target === attendanceModal){

        closeModal();

    }

};

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeModal();

    }

});

// ==========================================
// AUTO REFRESH
// ==========================================

setInterval(()=>{

    loadAttendance();

},60000);

// ==========================================
// SUCCESS / ERROR
// ==========================================

function showSuccess(message){

    alert(message);

}

function showError(message){

    alert(message);

}

// ==========================================
// END OF FILE
// ==========================================
