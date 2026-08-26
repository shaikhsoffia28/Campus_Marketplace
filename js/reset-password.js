document.addEventListener("DOMContentLoaded", () => {

    const resetPasswordForm =
        document.getElementById("resetPasswordForm");


    resetPasswordForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const password =
                document
                    .getElementById("password")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            if (password.length < 6) {

                alert(
                    "Password must be at least 6 characters."
                );

                return;

            }


            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            const { error } =
                await supabaseClient.auth
                    .updateUser({

                        password: password

                    });


            if (error) {

                alert(error.message);

                return;

            }


            alert(
                "Password changed successfully!"
            );


            window.location.href =
                "login.html";

        }
    );

});