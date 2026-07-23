// ==========================================
// Course Management JavaScript
// ==========================================

const API_URL = "https://student-mangenet-system.onrender.com/api/courses";

const courseTable = document.getElementById("courseTable");
const courseForm = document.getElementById("courseForm");
const courseModal = document.getElementById("courseModal");
const modalTitle = document.getElementById("modalTitle");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    loadCourses();

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
// Load Courses
// ==========================================

async function loadCourses(){

    try{

        const response = await fetch(API_URL);

        const data = await response.json();

        courseTable.innerHTML = "";

        if(!data.success){

            courseTable.innerHTML = `
            <tr>
                <td colspan="7">No Courses Found</td>
            </tr>
            `;

            return;

        }

        data.courses.forEach(course=>{

            courseTable.innerHTML += `

            <tr>

                <td>${course.id}</td>

                <td>${course.course_code}</td>

                <td>${course.course_name}</td>

                <td>${course.department}</td>

                <td>${course.credits}</td>

                <td>${course.semester}</td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editCourse(${course.id})">

                        <i class="fas fa-edit"></i>

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteCourse(${course.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        alert("Unable to load courses.");

    }

}

// ==========================================
// Open Modal
// ==========================================

function openCourseModal(){

    courseForm.reset();

    document.getElementById("courseId").value = "";

    modalTitle.innerHTML = "Add Course";

    courseModal.style.display = "flex";

}

// ==========================================
// Close Modal
// ==========================================

function closeModal(){

    courseModal.style.display = "none";

}

// ==========================================
// Save Course
// ==========================================

courseForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const id = document.getElementById("courseId").value;

    const course = {

        course_code : document.getElementById("courseCode").value,

        course_name : document.getElementById("courseName").value,

        department : document.getElementById("department").value,

        credits : document.getElementById("credits").value,

        semester : document.getElementById("semester").value

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

            body:JSON.stringify(course)

        });

        const data = await response.json();

        alert(data.message);

        closeModal();

        loadCourses();

    }

    catch(error){

        console.log(error);

        alert("Unable to save course.");

    }

});
// ==========================================
// EDIT COURSE
// ==========================================

async function editCourse(id){

    try{

        const response = await fetch(API_URL + "/" + id);

        const data = await response.json();

        if(!data.success){

            alert(data.message);

            return;

        }

        const course = data.course;

        document.getElementById("courseId").value = course.id;
        document.getElementById("courseCode").value = course.course_code;
        document.getElementById("courseName").value = course.course_name;
        document.getElementById("department").value = course.department;
        document.getElementById("credits").value = course.credits;
        document.getElementById("semester").value = course.semester;

        modalTitle.innerHTML = "Update Course";

        courseModal.style.display = "flex";

    }

    catch(error){

        console.log(error);

        alert("Unable to load course.");

    }

}

// ==========================================
// DELETE COURSE
// ==========================================

async function deleteCourse(id){

    if(!confirm("Are you sure you want to delete this course?")){

        return;

    }

    try{

        const response = await fetch(API_URL + "/" + id,{

            method:"DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadCourses();

    }

    catch(error){

        console.log(error);

        alert("Delete Failed.");

    }

}

// ==========================================
// SEARCH COURSE
// ==========================================

const search = document.getElementById("search");

if(search){

    search.addEventListener("keyup", async function(){

        const keyword = this.value.trim();

        if(keyword===""){

            loadCourses();

            return;

        }

        try{

            const response = await fetch(API_URL + "/search/" + keyword);

            const data = await response.json();

            courseTable.innerHTML = "";

            if(!data.success || data.courses.length===0){

                courseTable.innerHTML=`
                <tr>
                    <td colspan="7">No Course Found</td>
                </tr>
                `;

                return;

            }

            data.courses.forEach(course=>{

                courseTable.innerHTML += `

                <tr>

                    <td>${course.id}</td>

                    <td>${course.course_code}</td>

                    <td>${course.course_name}</td>

                    <td>${course.department}</td>

                    <td>${course.credits}</td>

                    <td>${course.semester}</td>

                    <td>

                        <button
                        class="action-btn edit-btn"
                        onclick="editCourse(${course.id})">

                        <i class="fas fa-edit"></i>

                        </button>

                        <button
                        class="action-btn delete-btn"
                        onclick="deleteCourse(${course.id})">

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

    if(event.target===courseModal){

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

    loadCourses();

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