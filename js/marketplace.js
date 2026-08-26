async function checkUser() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();


    if (!user) {

        window.location.href =
            "login.html";

        return null;

    }


    return user;

}
document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const user =
            await checkUser();

        if (!user) return;

        loadProducts();

    }
);
async function loadProducts() {

    const { data, error } =
        await supabaseClient
            .from("products")
            .select("*")
            .eq("status", "AVAILABLE")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        alert(
            "Unable to load products."
        );

        return;

    }


    displayProducts(data);

}