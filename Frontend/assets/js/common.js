// Jquery to load navbar and footer
$(document).ready(function(){
    $.get("/assets/html/navbar.html", data => $("nav").replaceWith(data));
    $.get("/assets/html/footer.html", data => $("footer").replaceWith(data));
});