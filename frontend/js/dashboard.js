// Dashboard JS

console.log("Dashboard Loaded");

const clock = document.getElementById("clock");

function updateClock() {
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

const logout = document.getElementById("logout");

logout.addEventListener("click", function (e) {
    e.preventDefault();

    if (confirm("Logout?")) {
        window.location.href = "login.html";
    }
});

function showSection(id) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("activePage");
    });

    const section = document.getElementById(id);

    if (section) {
        section.classList.add("activePage");
    }
}
