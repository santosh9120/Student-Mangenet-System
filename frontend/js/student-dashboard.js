// ==========================================
// Student Dashboard JavaScript
// ==========================================

// Page Load
window.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadTheme();

    animateCards();

    animateProgress();

    initializeCharts();

    setInterval(updateClock,1000);

});

// ==========================================
// Live Clock
// ==========================================

function updateClock(){

    const clock=document.getElementById("clock");

    if(clock){

        clock.innerHTML=new Date().toLocaleString();

    }

}

// ==========================================
// Theme (Controlled by Admin)
// ==========================================

function loadTheme(){

    const theme=localStorage.getItem("theme");

    if(theme==="dark"){

        document.body.classList.add("dark-mode");

    }

    else{

        document.body.classList.remove("dark-mode");

    }

}

// ==========================================
// Dashboard Card Animation
// ==========================================

function animateCards(){

    const cards=document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";
        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition="0.6s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*150);

    });

}

// ==========================================
// Progress Animation
// ==========================================

function animateProgress(){

    const bars=document.querySelectorAll(".progress-bar");

    bars.forEach(bar=>{

        const target=parseInt(bar.innerHTML);

        bar.style.width="0%";

        let value=0;

        const interval=setInterval(()=>{

            if(value>=target){

                clearInterval(interval);

            }

            else{

                value++;

                bar.style.width=value+"%";

                bar.innerHTML=value+"%";

            }

        },15);

    });

}

// ==========================================
// Attendance Chart
// ==========================================

function initializeCharts(){

    const attendance=document.getElementById("attendanceChart");

    if(attendance){

        new Chart(attendance,{

            type:"doughnut",

            data:{

                labels:["Present","Absent"],

                datasets:[{

                    data:[92,8],

                    backgroundColor:[

                        "#2563eb",

                        "#d1d5db"

                    ]

                }]

            },

            options:{

                responsive:true,

                plugins:{

                    legend:{

                        position:"bottom"

                    }

                }

            }

        });

    }

    // ================= Marks Chart =================

    const marks=document.getElementById("marksChart");

    if(marks){

        new Chart(marks,{

            type:"bar",

            data:{

                labels:[

                    "Java",

                    "DBMS",

                    "OS",

                    "CN",

                    "SE"

                ],

                datasets:[{

                    label:"Marks",

                    data:[95,90,88,91,89],

                    backgroundColor:"#2563eb"

                }]

            },

            options:{

                responsive:true,

                scales:{

                    y:{

                        beginAtZero:true,

                        max:100

                    }

                }

            }

        });

    }

}

// ==========================================
// Search
// ==========================================

const search=document.getElementById("search");

if(search){

    search.addEventListener("keyup",function(){

        const value=this.value.toLowerCase();

        const notices=document.querySelectorAll(".notice-list li");

        notices.forEach(item=>{

            if(item.innerText.toLowerCase().includes(value)){

                item.style.display="block";

            }

            else{

                item.style.display="none";

            }

        });

    });

}

// ==========================================
// Logout
// ==========================================

const logout=document.getElementById("logout");

if(logout){

    logout.addEventListener("click",(e)=>{

        e.preventDefault();

        if(confirm("Are you sure you want to logout?")){

            localStorage.removeItem("student");

            window.location.href="login.html";

        }

    });

}

// ==========================================
// Load Student Details
// ==========================================

function loadStudent(){

    const student=JSON.parse(localStorage.getItem("student"));

    if(student){

        if(document.getElementById("studentName")){

            document.getElementById("studentName").innerHTML=student.name;

        }

    }

}

loadStudent();

// ==========================================
// Notice Click
// ==========================================

const notices=document.querySelectorAll(".notice-list li");

notices.forEach(notice=>{

    notice.addEventListener("click",()=>{

        alert(notice.innerText);

    });

});

// ==========================================
// Refresh Dashboard Every Minute
// ==========================================

setInterval(()=>{

    console.log("Refreshing Dashboard...");

    // Future API
    // loadStudent();
    // loadAttendance();
    // loadResults();

},60000);

// ==========================================
// Future Backend Integration
// ==========================================

// fetch((window.location.hostname === "localhost" ? "http://localhost:5000/api" : "https://student-mangenet-system.onrender.com/api") + "/student/dashboard")
// .then(res=>res.json())
// .then(data=>{
//
// document.getElementById("studentName").innerHTML=data.name;
//
// })
// .catch(err=>console.log(err));

// ==========================================
// End
// ==========================================
