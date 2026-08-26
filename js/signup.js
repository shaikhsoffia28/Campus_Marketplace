document.addEventListener("DOMContentLoaded", () => {

    const signupForm =
        document.getElementById("signupForm");

    signupForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();

            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;

            // VALIDATION

            if (!fullName) {

                alert("Please enter your full name.");
                return;

            }

            if (!email) {

                alert("Please enter your email.");
                return;

            }

            if (!phone) {

                alert("Please enter your phone number.");
                return;

            }

            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }

            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }


            // CREATE USER

            const { data, error } =
                await supabaseClient.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        data: {

                            full_name: fullName,

                            phone: phone

                        }

                    }

                });


            if (error) {

                alert(error.message);
                return;

            }


            // SAVE PROFILE

            if (data.user) {

                const { error: profileError } =
                    await supabaseClient
                        .from("profiles")
                        .upsert({

                            id: data.user.id,

                            full_name: fullName,

                            email: email,

                            phone: phone

                        });


                if (profileError) {

                    console.error(profileError);

                }

            }


            alert(
                "Account created successfully!"
            );

            window.location.href =
                "login.html";

        }
    );

});