$(document).ready(() => {
    const emailResult = sessionStorage.getItem("email-operation");
    const emailStatus = sessionStorage.getItem("email-status");
    const accountResult = sessionStorage.getItem("eliminated-account");
    const sessionResult = sessionStorage.getItem("not-account");
    const closedSessionResult = sessionStorage.getItem("closed-session");

    const alertElement = $("#alert");

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
    } else if(accountResult !== null || closedSessionResult !== null) {
        alertElement.text(accountResult !== null ? accountResult : closedSessionResult);
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
        sessionStorage.removeItem(accountResult !== null ? "eliminated-account" : "closed-session");
    } else if(sessionResult !== null) {
        alertElement.removeClass("alert-success");
        alertElement.removeClass("text-success");
        alertElement.addClass("alert-danger");
        alertElement.addClass("text-danger");
        alertElement.text(sessionResult);
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
        sessionStorage.removeItem("not-account");
    }
});

const changeToProductsPage = type => {
    sessionStorage.setItem("pet-filter", type);
    window.location.href = "/assets/html/products.html";
};
