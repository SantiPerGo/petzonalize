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
    
    const accountStatus = sessionStorage.getItem("emliminated-account")

    if(accountStatus === "true") {
        alertElement.text("¡Cuenta Eliminada con Éxito!");
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
        sessionStorage.removeItem("emliminated-account");
    }

    const sessionStatus = sessionStorage.getItem("not-account")

    if(sessionStatus === "true") {
        alertElement.removeClass("alert-success");
        alertElement.removeClass("text-success");
        alertElement.addClass("alert-danger");
        alertElement.addClass("text-danger");
        alertElement.text("¡Necesitas Iniciar Sesión para Acceder a tu Perfil!");
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
        sessionStorage.removeItem("not-account");
    }
});

const changeToProductsPage = type => {
    sessionStorage.setItem("pet-filter", type);
    window.location.href = "/assets/html/products.html";
};
