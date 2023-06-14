$(document).ready(() => {
    const emailResult = sessionStorage.getItem("email-operation");
    const emailStatus = sessionStorage.getItem("email-status");
    const accountResult = sessionStorage.getItem("eliminated-account");
    const sessionResult = sessionStorage.getItem("not-account");
    const closedSessionResult = sessionStorage.getItem("closed-session");

    const toastElement = $("#toast");
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
    const toastBody = $("#toast-body");

    if(emailResult !== null && emailStatus !== null) {
        toastBody.text(emailResult);
        toastInstance.show();

        if(emailStatus === "false") 
            toastElement.addClass("toast-error");
        else
            toastElement.addClass("toast-success");

        sessionStorage.removeItem("email-operation");
        sessionStorage.removeItem("email-status");
    } else if(accountResult !== null || closedSessionResult !== null) {
        toastBody.text(accountResult !== null ? accountResult : closedSessionResult);
        toastElement.addClass("toast-success");
        toastInstance.show();
        sessionStorage.removeItem(accountResult !== null ? "eliminated-account" : "closed-session");
    } else if(sessionResult !== null) {
        toastBody.text(sessionResult);
        toastElement.addClass("toast-error");
        toastInstance.show();
        sessionStorage.removeItem("not-account");
    }
});

const changeToProductsPage = type => {
    sessionStorage.setItem("pet-filter", type);
    window.location.href = "/assets/html/products.html";
};
