const signUpForm = $("#sing-up-form");
const loginForm = $("#login-form");
const recoverForm = $("#recover-form");

const buttonToSignUp = document.getElementById("view-sign-up");
const buttonToLogin = document.getElementById("view-login");
const toRecoverPassword = document.getElementById("view-recover-section");
const buttonBackToLogin = document.getElementById("view-login-2"); //This button is in recover container

const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const recoverContainer = document.getElementById("recover-container");

const alertElement = $("#alert");

$(document).ready(() => {
    // Forms validation
    validateForm(signUpForm);
    validateForm(loginForm);
    validateForm(recoverForm);

    // Verifying if user exists
    let user = localStorage.getItem("users-logged-in");
    if(user != null)
        window.location.href = 'profile.html';
});

//--------- Limpiar campos --------------
const clearInputs = () => {
    signUpForm.find('input').each((key, input) => resetInput(input));
    recoverForm.find('input').each((key, input) => resetInput(input));
    loginForm.find('input').each((key, input) => resetInput(input));
};

const resetInput = input => {
    $(input).val("");
    $(input).removeData("previousValue");
    $(input).removeAttr("aria-invalid");
    $(input).removeClass("valid");
    $(input).removeClass("invalid");
    $(input).removeClass("input-icon-valid");
    $(input).removeClass("input-icon-invalid");
    $(`#${input.id}-error`).remove();
};

// ----- Escucha cuando el usuario se registre ------
signUpForm.submit(submitButton => {
    submitButton.preventDefault();

    if(signUpForm.valid())
        creatingUserAccount();
});

// ----- Escucha cuando el usuario recupera contraseña ------
recoverForm.submit(submitButton => {
    submitButton.preventDefault();

    if(recoverForm.valid()) {
        alertElement.text("Se ha enviado la contraseña a tu correo");
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);

        alertElement.addClass("alert-success");
        alertElement.addClass("text-success");
        alertElement.removeClass("alert-danger");
        alertElement.removeClass("text-danger");
    }
});

// ------ Escucha cuando el usuario inicie sesion -----
loginForm.submit(submitButton => {
    submitButton.preventDefault();

    const email = $("#input-email-login").val();
    const password = $("#input-password-login").val();

    if(loginForm.valid())
        fetch("/assets/json/users.json")
            .then(res => res.json())
            .then(usersResponse =>{
                if( checkLoginUser(email, password, usersResponse) ){
                    const userObtained = getUserFromDataBase(email, password, usersResponse);
                    localStorage.setItem("users-logged-in", JSON.stringify(userObtained));
                    window.location.href = 'profile.html';
                    console.log("Sesion iniciada");
                }
                else {
                    alertElement.text("Correo o contraseña incorrectos");
                    alertElement.slideDown(250);
                    setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);

                    alertElement.removeClass("alert-success");
                    alertElement.removeClass("text-success");
                    alertElement.addClass("alert-danger");
                    alertElement.addClass("text-danger");
                }
            })
});

//-------------- Cambio de Vista -------------------
buttonToSignUp.addEventListener('click', ()=>{
    loginContainer.classList.add("d-none");
    signupContainer.classList.remove("d-none");
    recoverContainer.classList.add("d-none");
    clearInputs();
});

buttonToLogin.addEventListener('click', ()=>{
    loginContainer.classList.remove("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.add("d-none");
    clearInputs();
});

toRecoverPassword.addEventListener('click', ()=>{
    loginContainer.classList.add("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.remove("d-none");
    clearInputs();
});

buttonBackToLogin.addEventListener('click', ()=>{
    loginContainer.classList.remove("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.add("d-none");
    clearInputs();
});

//----------- Obtener Usuario -----------
const getUserFromDataBase = (email, password, usersDatabase) =>{
    let userFound = {};

    if(usersDatabase)
        usersDatabase.users.some( registeredUser => {
            const isUser = registeredUser.email == email && registeredUser.password === password;
            userFound = registeredUser;
            return isUser;
        });

    return userFound;
}


//-----------Comprobar Contraseña -----------
const checkLoginUser = (email, password, usersDatabase) =>{
    if(usersDatabase)
        return usersDatabase.users.some( registeredUser => registeredUser.email == email && registeredUser.password === password );
    else
        return false;
}

//------------ Guardar Usuarios ----------
const creatingUserAccount = () => {
    const name = document.getElementById("input-name-register").value;
    const email = document.getElementById("input-email-register").value;
    const phone = document.getElementById("input-phone-register").value;
    const password = document.getElementById("input-signup-password").value;

    const user = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password,
        "privileges": "client" 
    };

    localStorage.setItem("users-logged-in", JSON.stringify(user));
    window.location.href = 'profile.html';
    console.log("Cuenta creada");
} 