// ==========================================
// Notice Management JavaScript
// ==========================================

const API_URL = (window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/notices";

const noticeTable = document.getElementById("noticeTable");
const noticeForm = document.getElementById("noticeForm");
const noticeModal = document.getElementById("noticeModal");
const modalTitle = document.getElementById("modalTitle");

// ==========================================
// Page Load
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    loadNotices();

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
// Load Notices
// ==========================================

async function loadNotices(){

    try{

        const response = await fetch(API_URL);

        const data = await response.json();

        noticeTable.innerHTML = "";

        if(!data.success){

            noticeTable.innerHTML = `

            <tr>

                <td colspan="5">

                    No Notices Found

                </td>

            </tr>

            `;

            return;

        }

        data.notices.forEach(notice=>{

            noticeTable.innerHTML += `

            <tr>

                <td>${notice.id}</td>

                <td>${notice.title}</td>

                <td>${notice.description}</td>

                <td>${notice.notice_date}</td>

                <td>

                    <button
                    class="action-btn edit-btn"
                    onclick="editNotice(${notice.id})">

                        <i class="fas fa-edit"></i>

                    </button>

                    <button
                    class="action-btn delete-btn"
                    onclick="deleteNotice(${notice.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        alert("Unable to load notices.");

    }

}

// ==========================================
// Open Modal
// ==========================================

function openNoticeModal(){

    noticeForm.reset();

    document.getElementById("noticeId").value = "";

    modalTitle.innerHTML = "Add Notice";

    noticeModal.style.display = "flex";

}

// ==========================================
// Close Modal
// ==========================================

function closeModal(){

    noticeModal.style.display = "none";

}

// ==========================================
// Save Notice
// ==========================================

noticeForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const id = document.getElementById("noticeId").value;

    const notice = {

        title : document.getElementById("title").value,

        description : document.getElementById("description").value,

        notice_date : document.getElementById("noticeDate").value

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

            body:JSON.stringify(notice)

        });

        const data = await response.json();

        alert(data.message);

        closeModal();

        loadNotices();

    }

    catch(error){

        console.log(error);

        alert("Unable to save notice.");

    }

});
// ==========================================
// EDIT NOTICE
// ==========================================

async function editNotice(id){

    try{

        const response = await fetch(API_URL + "/" + id);

        const data = await response.json();

        if(!data.success){

            alert(data.message);
            return;

        }

        const notice = data.notice;

        document.getElementById("noticeId").value = notice.id;
        document.getElementById("title").value = notice.title;
        document.getElementById("description").value = notice.description;
        document.getElementById("noticeDate").value = notice.notice_date;

        modalTitle.innerHTML = "Update Notice";

        noticeModal.style.display = "flex";

    }

    catch(error){

        console.log(error);

        alert("Unable to load notice.");

    }

}

// ==========================================
// DELETE NOTICE
// ==========================================

async function deleteNotice(id){

    if(!confirm("Are you sure you want to delete this notice?")){

        return;

    }

    try{

        const response = await fetch(API_URL + "/" + id,{

            method:"DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadNotices();

    }

    catch(error){

        console.log(error);

        alert("Delete Failed.");

    }

}

// ==========================================
// SEARCH NOTICE
// ==========================================

const search = document.getElementById("search");

if(search){

    search.addEventListener("keyup", async function(){

        const keyword = this.value.trim();

        if(keyword === ""){

            loadNotices();
            return;

        }

        try{

            const response = await fetch(API_URL + "/search/" + keyword);

            const data = await response.json();

            noticeTable.innerHTML = "";

            if(!data.success || data.notices.length === 0){

                noticeTable.innerHTML = `

                <tr>

                    <td colspan="5">

                        No Notice Found

                    </td>

                </tr>

                `;

                return;

            }

            data.notices.forEach(notice=>{

                noticeTable.innerHTML += `

                <tr>

                    <td>${notice.id}</td>

                    <td>${notice.title}</td>

                    <td>${notice.description}</td>

                    <td>${notice.notice_date}</td>

                    <td>

                        <button
                        class="action-btn edit-btn"
                        onclick="editNotice(${notice.id})">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button
                        class="action-btn delete-btn"
                        onclick="deleteNotice(${notice.id})">

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

            window.location.href = "admin-login.html";

        }

    });

}

// ==========================================
// CLOSE MODAL
// ==========================================

window.onclick = function(event){

    if(event.target === noticeModal){

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

    loadNotices();

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
