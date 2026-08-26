document.addEventListener("DOMContentLoaded", () => {

    const forgotPasswordForm =
        document.getElementById("forgotPasswordForm");


    forgotPasswordForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            if (!email) {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            const { error } =
                await supabaseClient.auth
                    .resetPasswordForEmail(
                        email,
                        {
                            redirectTo:
                                window.location.origin +
                                "/reset-password.html"
                        }
                    );


            if (error) {

                alert(error.message);

                return;

            }


            alert(
                "Password reset link has been sent to your email."
            );

        }
    );

});