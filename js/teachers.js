// ==========================================
// Teacher Management JavaScript
// ==========================================

const API_URL = "https://student-mangenet-system.onrender.com/api/teachers";

const teacherTable = document.getElementById("teacherTable");
const teacherForm = document.getElementById("teacherForm");
const teacherModal = document.getElementById("teacherModal");
const modalTitle = document.getElementById("modalTitle");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    loadTeachers();

    updateClock();

    setInterval(updateClock, 1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    clock.innerHTML = new Date().toLocaleString();

}

// ==========================================
// Load Teachers
// ==========================================

async function loadTeachers() {

    try {

        const res = await fetch(API_URL);

        const data = await res.json();

        teacherTable.innerHTML = "";

        if (!data.success) {

            teacherTable.innerHTML = `
            <tr>
                <td colspan="7">No Teachers Found</td>
            </tr>
            `;

            return;

        }

        data.teachers.forEach(teacher => {

            teacherTable.innerHTML += `

            <tr>

                <td>${teacher.id}</td>

                <td>${teacher.fullname}</td>

                <td>${teacher.email}</td>

                <td>${teacher.mobile}</td>

                <td>${teacher.department}</td>

                <td>${teacher.designation}</td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editTeacher(${teacher.id})">

                        <i class="fas fa-edit"></i>

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteTeacher(${teacher.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

// ==========================================
// Open Modal
// ==========================================

function openAddTeacher() {

    teacherForm.reset();

    document.getElementById("teacherId").value = "";

    modalTitle.innerHTML = "Add Teacher";

    teacherModal.style.display = "flex";

}

// ==========================================
// Close Modal
// ==========================================

function closeModal() {

    teacherModal.style.display = "none";

}

// ==========================================
// Save Teacher
// ==========================================

teacherForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const id = document.getElementById("teacherId").value;

    const teacher = {

        fullname:document.getElementById("fullname").value,

        email:document.getElementById("email").value,

        mobile:document.getElementById("mobile").value,

        department:document.getElementById("department").value,

        designation:document.getElementById("designation").value,

        password:document.getElementById("password").value

    };

    try{

        let url = API_URL;

        let method = "POST";

        if(id){

            url += "/" + id;

            method = "PUT";

        }

        const res = await fetch(url,{

            method:method,

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(teacher)

        });

        const data = await res.json();

        alert(data.message);

        closeModal();

        loadTeachers();

    }

    catch(err){

        console.log(err);

        alert("Something Went Wrong");

    }

});
// ==========================================
// EDIT TEACHER
// ==========================================

async function editTeacher(id){

    try{

        const res = await fetch(API_URL + "/" + id);

        const data = await res.json();

        if(!data.success){

            alert(data.message);

            return;

        }

        const teacher = data.teacher;

        document.getElementById("teacherId").value = teacher.id;
        document.getElementById("fullname").value = teacher.fullname;
        document.getElementById("email").value = teacher.email;
        document.getElementById("mobile").value = teacher.mobile;
        document.getElementById("department").value = teacher.department;
        document.getElementById("designation").value = teacher.designation;
        document.getElementById("password").value = "";

        modalTitle.innerHTML = "Update Teacher";

        teacherModal.style.display = "flex";

    }

    catch(err){

        console.log(err);

        alert("Unable to load teacher.");

    }

}

// ==========================================
// DELETE TEACHER
// ==========================================

async function deleteTeacher(id){

    if(!confirm("Are you sure you want to delete this teacher?")){

        return;

    }

    try{

        const res = await fetch(API_URL + "/" + id,{

            method:"DELETE"

        });

        const data = await res.json();

        alert(data.message);

        loadTeachers();

    }

    catch(err){

        console.log(err);

        alert("Delete Failed");

    }

}

// ==========================================
// SEARCH TEACHER
// ==========================================

const search = document.getElementById("search");

if(search){

    search.addEventListener("keyup",async function(){

        const keyword = this.value.trim();

        if(keyword===""){

            loadTeachers();

            return;

        }

        try{

            const res = await fetch(API_URL + "/search/" + keyword);

            const data = await res.json();

            teacherTable.innerHTML = "";

            if(data.teachers.length===0){

                teacherTable.innerHTML = `

                <tr>

                    <td colspan="7">

                        No Teacher Found

                    </td>

                </tr>

                `;

                return;

            }

            data.teachers.forEach(teacher=>{

                teacherTable.innerHTML += `

                <tr>

                    <td>${teacher.id}</td>

                    <td>${teacher.fullname}</td>

                    <td>${teacher.email}</td>

                    <td>${teacher.mobile}</td>

                    <td>${teacher.department}</td>

                    <td>${teacher.designation}</td>

                    <td>

                        <button
                        class="action-btn edit-btn"
                        onclick="editTeacher(${teacher.id})">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button
                        class="action-btn delete-btn"
                        onclick="deleteTeacher(${teacher.id})">

                            <i class="fas fa-trash"></i>

                        </button>

                    </td>

                </tr>

                `;

            });

        }

        catch(err){

            console.log(err);

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

            window.location.href = "admin-login.html";

        }

    });

}

// ==========================================
// CLOSE MODAL
// ==========================================

window.onclick = function(event){

    if(event.target===teacherModal){

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

    loadTeachers();

},60000);

// ==========================================
// SUCCESS & ERROR
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