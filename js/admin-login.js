document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("adminLoginForm");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {

            const response = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            console.log("Status:", response.status);

            const data = await response.json();

            console.log(data);

            if (data.success) {

                alert("Admin Login Successful");

                window.location.href = "admin-dashboard.html";

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.error(err);

            alert("Cannot connect to Express Server");

        }

    });

});