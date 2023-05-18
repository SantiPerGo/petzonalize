const singUpForm = document.getElementById("sing-up-form");
const loginForm = document.getElementById("login-form");
const singUpFormInputs = document.querySelectorAll(".form-control");

const buttonToSignUp = document.getElementById("view-sign-up");
const buttonToLogin = document.getElementById("view-login");
const toRecoverPassword = document.getElementById("view-recover-section");
const buttonBackToLogin = document.getElementById("view-login-2"); //This button is in recover container

const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const recoverContainer = document.getElementById("recover-container");

//---------- Crear objeto usuario logueado ------
const setUserLoggedIn = (userObtained) => {

    if( localStorage.getItem("user-logged-in") ){
        localStorage.setItem("user-logged-in", JSON.stringify(userObtained));
    }
    else{
        localStorage.setItem("users-logged-in", JSON.stringify(userObtained));
    }
}


//--------- Limpiar campos --------------

const clearInputs = ()=>{
    singUpFormInputs.forEach((input)=>{
        input.value = '';
    })
}

//--------- Comparar contraseñas -------------------
const matchPasswords = ()=>{
    const firstPassword = document.getElementById("input-signup-password");
    const secondPassword = document.getElementById("input-password-confirm-register");
    if(secondPassword.value === firstPassword.value){
        return true;
        
    }
    else{
        secondPassword.value = '';
        return false;
    }
}

// ----- Escucha cuando el usuario se registre ------
singUpForm.addEventListener('submit', (submitButton)=>{
    submitButton.preventDefault();
    singUpForm.classList.add('was-validated');
    const secondPassword = document.getElementById("input-password-confirm-register");

    if( singUpForm.classList.contains('was-validated')){
        if( matchPasswords() ){
            creatingUserAccount();
        }
        else{
            secondPassword.value = '';
        }
    }
});

// ------ Escucha cuando el usuario inicie sesion -----
loginForm.addEventListener('submit', (eventLogin)=>{
    eventLogin.preventDefault();

    const email = document.getElementById("input-email-login").value;
    const password = document.getElementById("input-password-login").value;
    loginForm.classList.add('was-validated');

    fetch("/assets/json/users.json")
        .then(res => res.json())
        .then(usersResponse =>{
            if( loginForm.classList.contains("was-validated")){
                if( checkLoginUser(email, password, usersResponse) ){
                    const userObtained = getUserFromDataBase(email, password, usersResponse);
                    setUserLoggedIn(userObtained);
                    setTimeout(()=>{
                       window.location.href = 'profile.html';
                }, 1500)
                    alert("Bienvenido de nuevo");
                }
                else{
                    clearInputs();
                }
            }
            else{
                console.log("something was wrong");
            }
        })
});

//-------------- Cambio de Vista -------------------

buttonToSignUp.addEventListener('click', ()=>{
    loginContainer.classList.add("d-none");
    signupContainer.classList.remove("d-none");
    recoverContainer.classList.add("d-none");
});

buttonToLogin.addEventListener('click', ()=>{
    loginContainer.classList.remove("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.add("d-none");
});

toRecoverPassword.addEventListener('click', ()=>{
    loginContainer.classList.add("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.remove("d-none");
});

buttonBackToLogin.addEventListener('click', ()=>{
    loginContainer.classList.remove("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.add("d-none");
});

//------- Comprobar correo -------------
const checkEmailExist = (user) =>{
    if(localStorage.getItem("users")){
        const usersDatabase = JSON.parse(localStorage.getItem("users"));
        return usersDatabase.users.some( registeredUser => registeredUser.email == user.email );
    }
    else{
        return false;
    }
}
//----------- Obtener Usuario -----------
const getUserFromDataBase = (email, password, usersDatabase) =>{
    let userFound = {};
    if(usersDatabase){
       
        usersDatabase.users.some( registeredUser => {
            const isUser = registeredUser.email == email && registeredUser.password === password;
            userFound = registeredUser;
            return isUser;
        });
    }
    else{
       userFound = {};
    }
    return userFound;
}


//-----------Comprobar Contraseña -----------
const checkLoginUser = (email, password, usersDatabase) =>{
    if(usersDatabase){
        return usersDatabase.users.some( registeredUser => registeredUser.email == email && registeredUser.password === password );
    }
    else{
        return false;
    }
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

    let users = {
        "users": []
    }

    if( localStorage.getItem("users") ){
        let validEmail = checkEmailExist(user);
        if(validEmail == false){
            
            users = JSON.parse(localStorage.getItem("users"));
            users.users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            clearInputs();
            window.location.reload()
            console.log(users);
        }
        else{
            alert("El correo de usuario ya existe, por favor escoja otro diferente");
        }
    }
    else{
        users.users.push(user);
        console.log(users);
        localStorage.setItem("users", JSON.stringify(users));
    }
} 

// ----------------------Boton Formulario
// La ingresar o registrarse, el botón redirigirá el usario a la página "profile"
// si los campos del formulario son válidos
/*
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    let inputsValidos = true;

    if (inputsValidos) {
      window.location.href = 'profile.html';
    }
  });
document.getElementById('sing-up-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    let inputsValidos = true;

    if (inputsValidos) {
      window.location.href = 'profile.html';
    }
  });
  */