// ==========================================
// Department Management JavaScript
// ==========================================

const API_URL = "https://student-mangenet-system.onrender.com/api/departments";

const departmentTable = document.getElementById("departmentTable");
const departmentForm = document.getElementById("departmentForm");
const departmentModal = document.getElementById("departmentModal");
const modalTitle = document.getElementById("modalTitle");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    loadDepartments();

    updateClock();

    setInterval(updateClock, 1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock(){

    const clock = document.getElementById("clock");

    if(clock){

        clock.innerHTML = new Date().toLocaleString();

    }

}

// ==========================================
// Load Departments
// ==========================================

async function loadDepartments(){

    try{

        const response = await fetch(API_URL);

        const data = await response.json();

        departmentTable.innerHTML = "";

        if(!data.success){

            departmentTable.innerHTML = `
            <tr>
                <td colspan="6">No Departments Found</td>
            </tr>
            `;

            return;

        }

        data.departments.forEach(department=>{

            departmentTable.innerHTML += `

            <tr>

                <td>${department.id}</td>

                <td>${department.department_name}</td>

                <td>${department.hod}</td>

                <td>${department.total_students}</td>

                <td>${department.total_teachers}</td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editDepartment(${department.id})">

                    <i class="fas fa-edit"></i>

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteDepartment(${department.id})">

                    <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        alert("Unable to load departments.");

    }

}

// ==========================================
// Open Modal
// ==========================================

function openDepartmentModal(){

    departmentForm.reset();

    document.getElementById("departmentId").value = "";

    modalTitle.innerHTML = "Add Department";

    departmentModal.style.display = "flex";

}

// ==========================================
// Close Modal
// ==========================================

function closeModal(){

    departmentModal.style.display = "none";

}

// ==========================================
// Save Department
// ==========================================

departmentForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const id = document.getElementById("departmentId").value;

    const department = {

        department_name : document.getElementById("departmentName").value,

        hod : document.getElementById("hod").value,

        total_students : document.getElementById("students").value,

        total_teachers : document.getElementById("teachers").value

    };

    try{

        let url = API_URL;

        let method = "POST";

        if(id){

            url += "/" + id;

            method = "PUT";

        }

        const response = await fetch(url,{

            method:method,

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(department)

        });

        const data = await response.json();

        alert(data.message);

        closeModal();

        loadDepartments();

    }

    catch(error){

        console.log(error);

        alert("Failed to save department.");

    }

});
// ==========================================
// EDIT DEPARTMENT
// ==========================================

async function editDepartment(id){

    try{

        const response = await fetch(API_URL + "/" + id);

        const data = await response.json();

        if(!data.success){

            alert(data.message);

            return;

        }

        const department = data.department;

        document.getElementById("departmentId").value = department.id;
        document.getElementById("departmentName").value = department.department_name;
        document.getElementById("hod").value = department.hod;
        document.getElementById("students").value = department.total_students;
        document.getElementById("teachers").value = department.total_teachers;

        modalTitle.innerHTML = "Update Department";

        departmentModal.style.display = "flex";

    }

    catch(error){

        console.log(error);

        alert("Unable to load department.");

    }

}

// ==========================================
// DELETE DEPARTMENT
// ==========================================

async function deleteDepartment(id){

    if(!confirm("Are you sure you want to delete this department?")){

        return;

    }

    try{

        const response = await fetch(API_URL + "/" + id,{

            method:"DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadDepartments();

    }

    catch(error){

        console.log(error);

        alert("Delete Failed.");

    }

}

// ==========================================
// SEARCH DEPARTMENT
// ==========================================

const search = document.getElementById("search");

if(search){

    search.addEventListener("keyup",async function(){

        const keyword = this.value.trim();

        if(keyword===""){

            loadDepartments();

            return;

        }

        try{

            const response = await fetch(API_URL + "/search/" + keyword);

            const data = await response.json();

            departmentTable.innerHTML = "";

            if(data.departments.length===0){

                departmentTable.innerHTML=`

                <tr>

                    <td colspan="6">

                        No Department Found

                    </td>

                </tr>

                `;

                return;

            }

            data.departments.forEach(department=>{

                departmentTable.innerHTML += `

                <tr>

                    <td>${department.id}</td>

                    <td>${department.department_name}</td>

                    <td>${department.hod}</td>

                    <td>${department.total_students}</td>

                    <td>${department.total_teachers}</td>

                    <td>

                        <button
                        class="action-btn edit-btn"
                        onclick="editDepartment(${department.id})">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button
                        class="action-btn delete-btn"
                        onclick="deleteDepartment(${department.id})">

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

window.onclick=function(event){

    if(event.target===departmentModal){

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

    loadDepartments();

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