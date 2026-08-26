document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("loginForm");


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;


            if (!email || !password) {

                alert(
                    "Please enter email and password."
                );

                return;

            }


            const { data, error } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email: email,

                        password: password

                    });


            if (error) {

                alert(error.message);

                return;

            }


            if (data.user) {

                alert("Login successful!");

                window.location.href =
                    "marketplace.html";

            }

        }
    );

});