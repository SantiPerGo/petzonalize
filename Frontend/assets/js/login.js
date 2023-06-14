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

//----------------Show in console list of users registered from Database or Users.Json---------------------
  fetch('https://petzonalize.up.railway.app/users')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch data from the API');
    }
  })
  .then(users => {
    console.log(users);
    console.log("usuarios obtenidos de la Data Base");
  })
  .catch(error => {
    console.error('Error:', error);
    // Fetch from local JSON file if there's an error
    fetch('/assets/json/users.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data from the local JSON file');
        }
      })
      .then(users => {
        console.log(users);
        console.log("usuarios obtenidos de archivo local JSON");
      })
      .catch(error => {
        console.error('Error:', error);
      });
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

// ------ Escucha cuando el usuario inicie sesion con DB -----
/* loginForm.submit(submitButton => {
    submitButton.preventDefault();

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
}); */

// ---------- Inicio de sesión con DB ó Json local -------------
loginForm.submit(submitButton => {
    submitButton.preventDefault();

    const user = {
        email: $("#input-email-login").val().trim(),
        password: $("#input-password-login").val().trim()
    };

    if (loginForm.valid()) {
        fetch("https://petzonalize.up.railway.app/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 400) {
                showAlert("Correo o contraseña incorrectos");
            } else if (response.status === 404) {
                showAlert("La cuenta de usuario no existe");
            }

            throw new Error("Login failed");
        })
        .then(usersResponse => {
            localStorage.setItem(`users-logged-in`, JSON.stringify(usersResponse));
            window.location.href = 'profile.html';
            console.log("Sesión iniciada");
        })
        .catch(error => {
            console.log(error);
            // Fetch from local JSON file for email and password validation
            fetch("/assets/json/users.json")
                .then(response => {
                    if (response.ok) {
                        console.log("No se puede acceder a la base de datos, se está intentando ingresar localmente");
                        return response.json();
                    } else {
                        throw new Error("Failed to fetch from local JSON file");
                    }
                })
                .then(usersResponse => {
                    const matchedUser = usersResponse.find(
                        u => u.email === user.email && u.password === user.password
                    );
                    if (matchedUser) {
                        localStorage.setItem(`users-logged-in`, JSON.stringify(matchedUser));
                        window.location.href = 'profile.html';
                        console.log("Sesión iniciada desde archivo JSON local");
                    } else {
                        showAlert("Correo o contraseña incorrectos");
                    }
                })
                .catch(error => console.log(error));
        });
    }
});

<<<<<<< HEAD
const loadAlertText = (text, type) => {
    const toastElement = $("#toast");
    const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
    const toastBody = $("#toast-body");
    toastBody.text(text);
    toastElement.addClass(`toast-${type}`);
    toastInstance.show();
=======
// ----- Alertas -------
const showAlert = text => {
    alertElement.text(text);
    alertElement.slideDown(250);
    setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);

    alertElement.removeClass("alert-success");
    alertElement.removeClass("text-success");
    alertElement.addClass("alert-danger");
    alertElement.addClass("text-danger");
>>>>>>> 1297482 (front-login-perf: login n register fetch with database n local json)
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

// ------ Escucha cuando el usuario recupera contraseña del Database o Users.Json -------------


// ----- Escucha cuando el usuario se registre ------
signUpForm.submit(submitButton => {
    submitButton.preventDefault();

    if(signUpForm.valid())
        creatingUserAccount();
});

//------------Make a POST request to create the user account
/* const creatingUserAccount = () => {
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
} */

//------------Make a POST request to create the user account in Database or Users.Json --------------
const creatingUserAccount = () => {
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
            console.log("No se puede acceder a la base de datos, se creará localmente");
            throw new Error("Failed to create account. Status: " + response.status);
    })
    .then(response => {
        localStorage.setItem("users-logged-in", JSON.stringify(response));
        window.location.href = 'profile.html';
        console.log("Cuenta creada");
    })
    .catch(error => {
        console.error("Not user registered:", error);
        // Fetch from local JSON file if the API request fails
        fetch("/assets/json/users.json")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error al acceder al archivo local JSON");
                }
            })
            .then(usersResponse => {
                // Check if user already exists in the local JSON data
                const existingUser = usersResponse.find(
                    u => u.email === user.email
                );
                if (existingUser) {
                    console.error("This email already exists:", existingUser);
                    showAlert("Este correo ya existe");
                } else {
                    // Add the new user to the local JSON data
                    usersResponse.push(user);
                    localStorage.setItem("users-logged-in", JSON.stringify(user));
                    window.location.href = 'profile.html';
                    console.log("User created in local JSON file:", user);
                    // Proceed with further logic or redirection
                }
            })
            .catch(error => console.log(error));
    });    
};

