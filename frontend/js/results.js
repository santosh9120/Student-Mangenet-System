// ==========================================
// Results Management JavaScript
// ==========================================

const API_URL = (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/results";

const resultTable = document.getElementById("resultTable");
const resultForm = document.getElementById("resultForm");
const resultModal = document.getElementById("resultModal");
const modalTitle = document.getElementById("modalTitle");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    loadResults();

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
// Load Results
// ==========================================

async function loadResults(){

    try{

        const response = await fetch(API_URL);

        const data = await response.json();

        resultTable.innerHTML = "";

        if(!data.success){

            resultTable.innerHTML = `

            <tr>

                <td colspan="7">

                    No Results Found

                </td>

            </tr>

            `;

            return;

        }

        data.results.forEach(result=>{

            let gradeClass="grade-a";

            switch(result.grade){

                case "A+":
                    gradeClass="grade-a-plus";
                    break;

                case "A":
                    gradeClass="grade-a";
                    break;

                case "B+":
                    gradeClass="grade-b-plus";
                    break;

                case "B":
                    gradeClass="grade-b";
                    break;

                case "C":
                    gradeClass="grade-c";
                    break;

                case "D":
                    gradeClass="grade-d";
                    break;

                default:
                    gradeClass="grade-f";

            }

            resultTable.innerHTML += `

            <tr>

                <td>${result.id}</td>

                <td>${result.student_name}</td>

                <td>${result.roll_no}</td>

                <td>${result.subject}</td>

                <td>${result.marks}</td>

                <td>

                    <span class="${gradeClass}">

                        ${result.grade}

                    </span>

                </td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editResult(${result.id})">

                        <i class="fas fa-edit"></i>

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteResult(${result.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        alert("Unable to load results.");

    }

}

// ==========================================
// Open Modal
// ==========================================

function openResultModal(){

    resultForm.reset();

    document.getElementById("resultId").value="";

    modalTitle.innerHTML="Add Result";

    resultModal.style.display="flex";

}

// ==========================================
// Close Modal
// ==========================================

function closeModal(){

    resultModal.style.display="none";

}

// ==========================================
// Save Result
// ==========================================

resultForm.addEventListener("submit",async function(e){

    e.preventDefault();

    const id=document.getElementById("resultId").value;

    const result={

        student_name:document.getElementById("studentName").value,

        roll_no:document.getElementById("rollNo").value,

        subject:document.getElementById("subject").value,

        marks:document.getElementById("marks").value,

        grade:document.getElementById("grade").value

    };

    try{

        let url=API_URL;

        let method="POST";

        if(id){

            url+="/"+id;

            method="PUT";

        }

        const response=await fetch(url,{

            method:method,

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(result)

        });

        const data=await response.json();

        alert(data.message);

        closeModal();

        loadResults();

    }

    catch(error){

        console.log(error);

        alert("Unable to save result.");

    }

});
// ==========================================
// EDIT RESULT
// ==========================================

async function editResult(id){

    try{

        const response = await fetch(API_URL + "/" + id);

        const data = await response.json();

        if(!data.success){

            alert(data.message);
            return;

        }

        const result = data.result;

        document.getElementById("resultId").value = result.id;
        document.getElementById("studentName").value = result.student_name;
        document.getElementById("rollNo").value = result.roll_no;
        document.getElementById("subject").value = result.subject;
        document.getElementById("marks").value = result.marks;
        document.getElementById("grade").value = result.grade;

        modalTitle.innerHTML = "Update Result";

        resultModal.style.display = "flex";

    }

    catch(error){

        console.log(error);

        alert("Unable to load result.");

    }

}

// ==========================================
// DELETE RESULT
// ==========================================

async function deleteResult(id){

    if(!confirm("Are you sure you want to delete this result?")){

        return;

    }

    try{

        const response = await fetch(API_URL + "/" + id,{

            method:"DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadResults();

    }

    catch(error){

        console.log(error);

        alert("Delete Failed.");

    }

}

// ==========================================
// SEARCH RESULT
// ==========================================

const search = document.getElementById("search");

if(search){

    search.addEventListener("keyup", async function(){

        const keyword = this.value.trim();

        if(keyword === ""){

            loadResults();
            return;

        }

        try{

            const response = await fetch(API_URL + "/search/" + keyword);

            const data = await response.json();

            resultTable.innerHTML = "";

            if(!data.success || data.results.length === 0){

                resultTable.innerHTML = `

                <tr>

                    <td colspan="7">

                        No Result Found

                    </td>

                </tr>

                `;

                return;

            }

            data.results.forEach(result=>{

                let gradeClass="grade-a";

                switch(result.grade){

                    case "A+":
                        gradeClass="grade-a-plus";
                        break;

                    case "A":
                        gradeClass="grade-a";
                        break;

                    case "B+":
                        gradeClass="grade-b-plus";
                        break;

                    case "B":
                        gradeClass="grade-b";
                        break;

                    case "C":
                        gradeClass="grade-c";
                        break;

                    case "D":
                        gradeClass="grade-d";
                        break;

                    default:
                        gradeClass="grade-f";

                }

                resultTable.innerHTML += `

                <tr>

                    <td>${result.id}</td>

                    <td>${result.student_name}</td>

                    <td>${result.roll_no}</td>

                    <td>${result.subject}</td>

                    <td>${result.marks}</td>

                    <td>

                        <span class="${gradeClass}">

                            ${result.grade}

                        </span>

                    </td>

                    <td>

                        <button
                        class="action-btn edit-btn"
                        onclick="editResult(${result.id})">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button
                        class="action-btn delete-btn"
                        onclick="deleteResult(${result.id})">

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

    if(event.target === resultModal){

        closeModal();

    }

};

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        closeModal();

    }

});

// ==========================================
// AUTO REFRESH
// ==========================================

setInterval(()=>{

    loadResults();

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
