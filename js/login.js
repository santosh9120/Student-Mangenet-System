// ==========================================
// Student Login
// js/login.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Login JS Loaded");

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("loginForm not found");
        return;
    }

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.querySelector("input[name='email']").value.trim();
        const password = document.querySelector("input[name='password']").value.trim();

        if (!email || !password) {
            alert("Please enter Email and Password.");
            return;
        }

        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            console.log(data);

            if (data.success) {

                // Save Login Data
                localStorage.setItem("token", data.token);
                localStorage.setItem("student", JSON.stringify(data.student));

                alert("Login Successful");

                window.location.href = "student-dashboard.html";

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.error(err);
            alert("Unable to connect to the server.");

        }

    });

});