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

// ------------Look if there's a user registered in local storage--------------
 $(document).ready(() => {
    // Forms validation
    validateForm(signUpForm);
    validateForm(loginForm);
    validateForm(recoverForm);
    
    // Verifying if user exists
    let user = localStorage.getItem("users-logged-in");
    if(user != null){
        window.location.href = 'profile.html';
    } else {
        console.log("sesión aún no iniciada")
    }
});

//--------- Limpiar campos --------------
const clearInputs = () => {
    signUpForm.find('input').each((key, input) => resetInput(input));
    recoverForm.find('input').each((key, input) => resetInput(input));
    loginForm.find('input').each((key, input) => resetInput(input));
};

// ------ Escucha cuando el usuario inicie sesion con DB ó Json local -------------
loginForm.submit(submitButton => {
    submitButton.preventDefault();

    const user = {
        email: $("#input-email-login").val().trim(),
        password: $("#input-password-login").val().trim()
    };

    if (loginForm.valid()) {
        $("#loading").removeClass("d-none");

        if(isBackendAlive) {
            fetch("https://petzonalize.up.railway.app/users/login", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => {
                $("#loading").addClass("d-none");
    
                if (response.ok) 
                    return response.json();
                else if (response.status === 400) 
                    loadAlertText("Correo o contraseña incorrectos", "error");
                else if (response.status === 404) 
                    loadAlertText("La cuenta de usuario no existe", "error");
                else
                    loadAlertText("¡Error al iniciar sesión! Intenta de nuevo más tarde", "error");
                    
                return null;
            })
            .then(usersResponse => {
                if(usersResponse !== null) {
                    localStorage.setItem(`users-logged-in`, JSON.stringify(usersResponse));
                    window.location.href = 'profile.html';
                    console.log("Sesión iniciada");
                }
            })
            .catch(error => {
                $("#loading").addClass("d-none");
                console.log(error);
                loadAlertText("¡Error al iniciar sesión! Intenta de nuevo más tarde", "error")
            });
        } else {
            // Fetch from local JSON file for email and password validation
            fetch("/assets/json/users.json")
                .then(response => {
                    $("#loading").addClass("d-none");
                    console.log("No se puede acceder a la base de datos, se está intentando ingresar localmente");
                    if (response.ok)
                        return response.json();
                    else 
                        loadAlertText("¡Error al iniciar sesión! Intenta de nuevo más tarde", "error")
                        
                    return null;
                })
                .then(usersResponse => {
                    if(usersResponse !== null) {
                        const matchedUser = usersResponse.find(
                            u => u.email === user.email && u.password === user.password
                        );
                        if (matchedUser) {
                            localStorage.setItem(`users-logged-in`, JSON.stringify(matchedUser));
                            window.location.href = 'profile.html';
                            console.log("Sesión iniciada desde archivo JSON local");
                        } else {
                            loadAlertText("Correo o contraseña incorrectos", "error");
                        }
                    }
                })
                .catch(error => {
                    $("#loading").addClass("d-none");
                    console.log(error);
                    loadAlertText("¡Error al iniciar sesión! Intenta de nuevo más tarde", "error")
                });
        }
    }
});

const loadAlertText = (text, type) => {
    const toastElement = $("#toast");
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
    const toastBody = $("#toast-body");
    toastBody.text(text);
    toastElement.removeClass("toast-success");
    toastElement.removeClass("toast-error");
    toastElement.addClass(`toast-${type}`);
    toastInstance.show();
};

// ------ Escucha cuando el usuario recupera contraseña del Database o Users.Json -------------
recoverForm.submit(submitButton => {
    submitButton.preventDefault();

    const email = $("#recover-email-login").val().trim();

    if (recoverForm.valid()) {
        $("#loading").removeClass("d-none");
        
        if(isBackendAlive) {
            fetch("https://petzonalize.up.railway.app/users/" + email)
                .then(response => {
                    $("#loading").addClass("d-none");
                    if (response.ok) {
                        // Success: Password recovery logic
                        loadAlertText("Se ha enviado la contraseña a tu correo", "success");
                    } else if (response.status === 404) {
                        // User not found
                        loadAlertText("El correo no pertenece a ninguna cuenta", "error");
                    } else
                        loadAlertText("¡Error al recuperar la contraseña! Intenta de nuevo más tarde", "error");
                })
                .catch(error => {
                    $("#loading").addClass("d-none");
                    console.log(error);
                    loadAlertText("¡Error al recuperar la contraseña! Intenta de nuevo más tarde", "error")
                });
        } else {
            // Fetch from local JSON file if the API request fails
            fetch("/assets/json/users.json")
                .then(response => {
                    $("#loading").addClass("d-none");
                    if (response.ok) 
                        return response.json();
                    else 
                        loadAlertText("El correo no pertenece a ninguna cuenta", "error");

                    return null;
                })
                .then(usersResponse => {
                    if(usersResponse !== null) {
                        // Check if the email exists in the local JSON data
                        const user = usersResponse.find(user => user.email === email);
                        if (user) {
                            // Email found: Proceed with further logic
                            console.log("User recovery from local JSON file:", user);
                            loadAlertText("Se ha enviado la contraseña a tu correo", "success");
                        } else {
                            // Email not found: Display an appropriate message
                            console.log("Email does not exist in the local JSON file");
                            loadAlertText("El correo no pertenece a ninguna cuenta", "error");
                        }
                    }
                })
                .catch(error => {
                    $("#loading").addClass("d-none");
                    console.log(error);
                    loadAlertText("¡Error al recuperar la contraseña! Intenta de nuevo más tarde", "error")
                });
        }
    }
});


// ----- Escucha cuando el usuario se registre ------
signUpForm.submit(submitButton => {
    submitButton.preventDefault();

    if(signUpForm.valid())
        creatingUserAccount();
});

//------------Make a POST request to create the user account in Database or Users.Json --------------
const creatingUserAccount = () => {
    $("#loading").removeClass("d-none");

    const name = document.getElementById("input-name-register").value;
    const email = document.getElementById("input-email-register").value;
    const address = document.getElementById("input-address-register").value;
    const phone = document.getElementById("input-phone-register").value;
    const password = document.getElementById("input-signup-password").value;

    const user = {
        name: name,
        address: address,
        email: email,
        phone: phone,
        password: password,
        privileges: {
            id: 2,
            privilege: "client"
        } 
    };
    
    if(isBackendAlive) {
        fetch("https://petzonalize.up.railway.app/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            $("#loading").addClass("d-none");
            if (response.ok) 
                return response.json();
            else
                loadAlertText("¡Error al crear la cuenta! Intenta de nuevo más tarde", "error");

            return null;
        })
        .then(response => {
            if(response !== null) {
                localStorage.setItem("users-logged-in", JSON.stringify(response));
                window.location.href = 'profile.html';
                console.log("Cuenta creada");
            }
        })
        .catch(error => {
            $("#loading").addClass("d-none");
            console.error("Not user registered:", error);
            loadAlertText("¡Error al crear la cuenta! Intenta de nuevo más tarde", "error")
        });    
    } else {
        // Fetch from local JSON file if the API request fails
        fetch("/assets/json/users.json")
        .then(response => {
            $("#loading").addClass("d-none");
            if (response.ok) 
                return response.json();
            else 
                loadAlertText("¡Error al crear la cuenta! Intenta de nuevo más tarde", "error")
            
            return null;
        })
        .then(usersResponse => {
            if(usersResponse !== null) {
                // Check if user already exists in the local JSON data
                const existingUser = usersResponse.find(
                    u => u.email === user.email
                );
                if (existingUser) {
                    console.error("This email already exists:", existingUser);
                    loadAlertText("Ya existe una cuenta asociada con dicho correo", "error");
                } else {
                    localStorage.setItem("users-logged-in", JSON.stringify(user));
                    window.location.href = 'profile.html';
                }
            }
        })
        .catch(error => {
            $("#loading").addClass("d-none");
            console.error("Not user registered:", error);
            loadAlertText("¡Error al crear la cuenta! Intenta de nuevo más tarde", "error")
        });    
    }
};

