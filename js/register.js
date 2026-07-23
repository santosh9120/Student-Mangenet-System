document.addEventListener("DOMContentLoaded", () => {

    console.log("Register JS Loaded");

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) {
        console.log("registerForm not found");
        return;
    }

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullname = document.querySelector("[name='fullname']").value.trim();
        const email = document.querySelector("[name='email']").value.trim();
        const mobile = document.querySelector("[name='mobile']").value.trim();
        const rollno = document.querySelector("[name='rollno']").value.trim();
        const department = document.querySelector("[name='department']").value;
        const password = document.querySelector("[name='password']").value;
        const confirmPassword = document.querySelector("[name='confirmPassword']").value;

        if (
            !fullname ||
            !email ||
            !mobile ||
            !rollno ||
            !department ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const response = await fetch("http://localhost:5000/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    fullname,
                    email,
                    mobile,
                    rollno,
                    department,
                    password
                })

            });

            const data = await response.json();

            console.log(data);

            if (data.success) {

                alert(data.message);

                registerForm.reset();

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.error(err);

            alert("Cannot connect to Express Server.");

        }

    });

});
