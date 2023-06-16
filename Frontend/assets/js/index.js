$(document).ready(() => {
    const emailResult = sessionStorage.getItem("email-operation");
    const emailStatus = sessionStorage.getItem("email-status");
    const accountResult = sessionStorage.getItem("eliminated-account");
    const sessionResult = sessionStorage.getItem("not-account");
    const closedSessionResult = sessionStorage.getItem("closed-session");
    const orderCreatedResult = sessionStorage.getItem("order-created");

    const toastElement = $("#toast");
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
    const toastBody = $("#toast-body");
    toastElement.removeClass("toast-success");
    toastElement.removeClass("toast-error");

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
    } else if(orderCreatedResult !== null) {
        $("#order-created-text").text(orderCreatedResult);
        const orderContainer = $("#order-container");
        orderContainer.removeClass("pop--hidden");
        orderContainer.addClass("pop--unhidden");

        setTimeout(() => {
            orderContainer.addClass("pop--hidden");
            orderContainer.removeClass("pop--unhidden");
        }, 10000);

        sessionStorage.removeItem("order-created");
    }
});

const closeOrderDialog = () => {
    const orderContainer = $("#order-container");
    orderContainer.addClass("pop--hidden");
    orderContainer.removeClass("pop--unhidden");
};

const changeToProductsPage = type => {
    sessionStorage.setItem("pet-filter", type);
    window.location.href = "/assets/html/products.html";
};
