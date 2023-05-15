const singUpForm = document.getElementById("sing-up-form");
const loginForm = document.getElementById("login-form");
const singUpFormInputs = document.querySelectorAll(".form-control");

const buttonToSignUp = document.getElementById("view-sign-up");
const buttonToLogin = document.getElementById("view-login");
const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");

const regExpFormVal = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // texto 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // correo@correo.domino
	phone: /^\d{7,14}$/, // numeros de 7 a 14 digitos
	password: /^.{4,12}$/ // caracteres de 4 a 12 digitos
}
//--------- Objeto de Validacion --------------
const validatedFormResultFlag = {
    name: false,
    email: false,
    phone: false,
    password: false
}

//--------- Identificar tipo de campo -----------
const getInputIdentify = (props) =>{
    if(props.name === 'signup-name'){
        validateInput(regExpFormVal.name, props, 'name');
    }
    else if(props.name === 'signup-email'){
        validateInput(regExpFormVal.email, props, 'email');
    }
    else if(props.name === 'signup-phone'){
        validateInput(regExpFormVal.phone, props, 'phone');
    }
    else if(props.name === 'signup-password'){
        validateInput(regExpFormVal.password, props, 'password');
    }
    else if(props.name === 'signup-password-2'){
        matchPasswords(props);
    }
    else if(props.name === 'login-email'){
        validateInput(regExpFormVal.email, props, 'email');
    }
    else if(props.name === 'login-password'){
        validateInput(regExpFormVal.password, props, 'password');
    }
}

// -------- Validar campo seleccionado ----------------
const validateInput = (validatorType, input, inputIdentity) => {
	//if(input.value.match(validatorType)){
    if(validatorType.test(input.value)){
        validatedFormResultFlag[inputIdentity] |= true;
        input.classList.remove('is-invalid'); 
        input.classList.add('is-valid'); // 
        console.log(`The input ${inputIdentity} is OK: ${validatedFormResultFlag[inputIdentity]}`);
	} 
    else {
        validatedFormResultFlag[inputIdentity] &= false;
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
		console.warn(`The input ${inputIdentity} is not OK: ${validatedFormResultFlag[inputIdentity]}`);
	}
}

//--------- Comparar contraseñas -------------------
const matchPasswords = (input)=>{
    const firstPassword = document.getElementById("input-signup-password");
    if(input.value === firstPassword.value){
        validatedFormResultFlag['password'] |= true;
        input.classList.remove('is-invalid'); 
        input.classList.add('is-valid'); // 
        
    }
    else{
        validatedFormResultFlag['password'] &= false;
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}


//---------- Leer tecla en un campo -------------------
singUpFormInputs.forEach((input)=>{
    input.addEventListener('keyup', (inputProps)=>{
        getInputIdentify(inputProps.target);
    });
});

// ----- Escucha cuando el usuario se registre ------
singUpForm.addEventListener('submit', (submitButton)=>{
    submitButton.preventDefault();

    if(validatedFormResultFlag.name && validatedFormResultFlag.phone && validatedFormResultFlag.email && validatedFormResultFlag.password ){
        console.log("cool!");
    }
    else{
        prompt("Verifique que haya rellenado el formulario correctamente");
    }
});

// ------ Escucha cuando el usuario inicie sesion -----
loginForm.addEventListener('submit', (eventLogin)=>{
    eventLogin.defaultPrevented();

    if(validatedFormResultFlag.email && validatedFormResultFlag.password){
        console.log("you can login");
    }
    else{
        console.log("something was wrong");
    }
});

//-------------- Cambio de Vista -------------------

buttonToSignUp.addEventListener('click', ()=>{
    loginContainer.classList.add("d-none");
    signupContainer.classList.remove("d-none");
});

buttonToLogin.addEventListener('click', ()=>{
    loginContainer.classList.remove("d-none");
    signupContainer.classList.add("d-none");
});