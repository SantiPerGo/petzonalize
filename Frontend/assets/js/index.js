$(document).ready(() => {
    const emailResult = sessionStorage.getItem("email-operation");
    const emailStatus = sessionStorage.getItem("email-status");

    const alertElement = $("#alert");
    alertElement.hide();

    if(emailResult !== null && emailStatus !== null) {
        alertElement.text(emailResult);
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);

        if(emailStatus === "false") {
            alertElement.removeClass("alert-success");
            alertElement.removeClass("text-success");
            alertElement.addClass("alert-danger");
            alertElement.addClass("text-danger");
        }

        sessionStorage.removeItem("email-operation");
        sessionStorage.removeItem("email-status");
    }
});

const changeToProductsPage = type => {
    sessionStorage.setItem("pet-filter", type);
    window.location.href = "/assets/html/products.html";
};