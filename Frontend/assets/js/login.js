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

//----------------Show in console list of users registered---------------------
fetch('https://petzonalize.up.railway.app/users')
  .then(response => response.json())
  .then(users => {
    console.log(users);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// ------------Look if there's a user registered in local storage
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

// ------ Escucha cuando el usuario inicie sesion -----
loginForm.submit(submitButton => {
    submitButton.preventDefault();

    /* const email = $("#input-email-login").val().trim();
    const password = $("#input-password-login").val().trim(); */

    const user = {
        email: $("#input-email-login").val().trim(),
        password: $("#input-password-login").val().trim()
    }

    if(loginForm.valid())
        fetch("https://petzonalize.up.railway.app/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => {
                if (response.ok)
                    return response.json();
                else if (response.status === 400) 
                    loadAlertText("Correo o contraseña incorrectos", "error");    
                else if (response.status === 404) 
                    loadAlertText("La cuenta de usuario no existe", "error");   
                
                throw new Error("Login failed");
            })
            .then(usersResponse =>{
                localStorage.setItem(`users-logged-in`, JSON.stringify(usersResponse));
                window.location.href = 'profile.html';
                console.log("Sesion iniciada");   
            })
            .catch(error =>{
                console.log(error);
            })
});

const loadAlertText = (text, type) => {
    const toastElement = $("#toast");
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
    const toastBody = $("#toast-body");
    toastBody.text(text);
    toastElement.addClass(`toast-${type}`);
    toastInstance.show();
};

// ----- Escucha cuando el usuario recupera contraseña ------
recoverForm.submit(submitButton => {
    submitButton.preventDefault();

    const email = $("#recover-email-login").val().trim()

    if(recoverForm.valid()) {
        fetch("https://petzonalize.up.railway.app/users/" + email)
            .then(response => {
            if(response.ok){
                loadAlertText("Se ha enviado la contraseña a tu correo", "success");
            } else {
                loadAlertText("El correo no pertenece a ninguna cuenta", "error");         
            }}
    )} 
});

// ----- Escucha cuando el usuario se registre ------
signUpForm.submit(submitButton => {
    submitButton.preventDefault();

    if(signUpForm.valid())
        creatingUserAccount();
});

//------------Make a POST request to create the user account
const creatingUserAccount = () => {
    const name = document.getElementById("input-name-register").value;
    const email = document.getElementById("input-email-register").value;
    const address = document.getElementById("input-address-register").value;
    const phone = document.getElementById("input-phone-register").value;
    const password = document.getElementById("input-signup-password").value;

    const user = {
        "name": name,
        "address": address,
        "email": email,
        "phone": phone,
        "password": password,
        "privileges": {
            "id": 2,
            "privilege": "client"
        } 
    };
    
    fetch("https://petzonalize.up.railway.app/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) 
            return response.json();
        else 
            console.error("Failed to create account. Status: " + response.status);
    })
    .then(response => {
        localStorage.setItem("users-logged-in", JSON.stringify(response));
        window.location.href = 'profile.html';
        console.log("Cuenta creada");
    })
    .catch(error => {
        console.error("Not user registered:", error);
        
    });
    
}