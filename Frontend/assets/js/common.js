// Jquery to load navbar and footer
$(document).ready(function(){
    $.get("/assets/html/navbar.html", data => {
        $("nav").replaceWith(data);

        // Updating shopping cart counter
        const shoppingCart = localStorage.getItem("shopping-cart");
        if(shoppingCart !== null) {
            const products = JSON.parse(shoppingCart);
            const shoppingCartCounter = $("#shopping-cart-counter");
            shoppingCartCounter.text(products[0].total);
            shoppingCartCounter.removeClass("d-none");
        }
    });
    
    $.get("/assets/html/footer.html", data => $("footer").replaceWith(data));
});