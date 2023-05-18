(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})

localStorage.getItem("users-logged-in")
const alertElement = $("#alert");
alertElement.hide();


if(localStorage.getItem("users-logged-in")){
  console.log("localStorage");
  let user = JSON.parse(localStorage.getItem("users-logged-in"));
  //user=user.users;
  console.log(user);
    // Mostrar los datos del usuario en los campos de entrada correspondientes
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('password').value = user.password;
    const referenciaUsuario = document.getElementById("estado");
    const referenciaBoton = document.getElementById("boton-admin");
    let estadoAdmin;


    const usuariosJson = user;
    const usuario = usuariosJson.fprivileges;

    if (usuario && usuario.privileges === "admin") {
      estadoAdmin = true;
    } else {
      estadoAdmin = false;
    }

    if (estadoAdmin) {
      referenciaUsuario.textContent = "Administrador";
      referenciaBoton.style.display = "block";
    } else {
      referenciaUsuario.textContent = "";
      referenciaBoton.style.display = "none";
    }


  document.addEventListener('DOMContentLoaded', () => {
    // Aquí va tu código JavaScript
    
    // Obtener todos los botones de edición y el botón de guardar
    const editButtons = document.querySelectorAll('.btn-edit');
    const saveButton = document.querySelector('.btn-save');
    const refForm =document.forms["edit-form"];
  
    // Agregar el controlador de eventos a cada botón de edición
    editButtons.forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault(); // Evitar la acción predeterminada del botón
        // Obtener el campo asociado al botón de edición
        const fieldId = button.getAttribute('data-field');
        const field = document.getElementById(fieldId);
  
        // Habilitar la edición del campo
        field.removeAttribute('readonly');
        field.focus(); // Opcionalmente, poner el foco en el campo editado
      });
    });
  
    // Agregar el controlador de eventos al botón de guardar
    refForm.addEventListener(`submit`, (event)=>{
      event.preventDefault();
 //Recuperar la sessionstorage
     let  user = localStorage.getItem("users-logged-in");
      let users= JSON.parse(user);
    
      const name =refForm.elements["name"];
      const email =refForm.elements["email"];
      const phone =refForm.elements["phone"];
      const password =refForm.elements["password"];

      document.getElementById('name').value=name.value;

      users.name=name.value;
      users.email=email.value;
      users.phone=phone.value;
      users.password=password.value;

      let userActual=JSON.stringify(users);
      sessionStorage.setItem("users-logged-in", userActual);
      localStorage.setItem("users-logged-in",userActual);

      alertElement.text("¡Datos actualizados exitosamente!");
      alertElement.slideDown(250);
      setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
      sessionStorage.removeItem("emliminated-account");
  
  
  });
    
  });
  // boton salir de sesison
  let exit = document.getElementById(`exit`);

  exit.addEventListener(`click`, () =>{
    localStorage.removeItem("users-logged-in");
  });
// constantes de botones
  const deleter = document.getElementById(`boom`);
  const completeDelete= document.getElementById(`kaboom`);
  const cancel= document.getElementById(`nope`);

  // boton eliminar cuenta
  deleter.addEventListener(`click`, () =>{
   
   completeDelete.style.display=`inline`;
   cancel.style.display=`inline`;
   deleter.style.display=`none`;
  })

  // boton cancelar
  cancel.addEventListener(`click`, () =>{
    //localStorage.clear();
    completeDelete.style.display=`none`;
    cancel.style.display=`none`;
    deleter.style.display=`inline`;

   })

// boton borrar cuenta definitivamente
 const refForm =document.forms["edit-form"];
completeDelete.addEventListener(`click`, (event) =>{
    event.preventDefault();
    
    const password =refForm.elements["password"].value;
    let compare = localStorage.getItem("users-logged-in");
    compare=JSON.parse(compare)
    compare=compare.password;
    console.log(password);


//alert

    setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);

    if(password == compare) {

      
      alertElement.slideDown(250);

      localStorage.removeItem("users-logged-in");
      sessionStorage.setItem("emliminated-account", "true");

      location.assign("../../index.html")

  }else{


    alertElement.slideDown(250);

      alertElement.removeClass("alert-success");
      alertElement.removeClass("text-success");
      alertElement.addClass("alert-warning");
      alertElement.addClass("text-warnind");
      alertElement.text("Contraseña incorrecta Ingresa tu contraseña en el campo correspondiente");

  }

   })

}




    else{    
console.log("Else")
    let urlUsers = "/assets/json/users.json";
fetch  (urlUsers)
  .then(response => response.json())
  .then(data => {
    // Obtener el usuario con ID 2
    const user = data.users.find(user => user.id === 1);

    let userActual=JSON.stringify(user);
    localStorage.setItem("users-logged-in", userActual);

    // Mostrar los datos del usuario en los campos de entrada correspondientes
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('password').value = user.password;

    alertElement.text("Cuenta eliminada");
    alertElement.slideDown(250);

  
    sessionStorage.setItem("not-account", "true");

    location.assign("../../index.html")

  });

//Obtiene los privilegios del id del usuario

  
  
  }
    
  
  
  let exit = document.getElementById(`exit`);

  exit.addEventListener(`click`, () =>{
    localStorage.removeItem("users-logged-in");

  })
    
  




  
  
  
