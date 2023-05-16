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
})()

const urlUsers = "/assets/json/users.json";

fetch(urlUsers)
  .then(response => response.json())
  .then(data => {
    // Obtener el usuario con ID 2
    const user = data.users.find(user => user.id === 2);

    // Mostrar los datos del usuario en los campos de entrada correspondientes
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('password').value = user.password;
  });

//Obtiene los privilegios del id del usuario

fetch(urlUsers)
  .then(response => response.json())
  .then(data => {
    const usuariosJson = data; // Aquí se obtiene el JSON de la respuesta
    const referenciaUsuario = document.getElementById("estado");
    const referenciaBoton = document.getElementById("boton-admin");
    let estadoAdmin;

    // Obtener los privilegios del usuario desde el JSON
    const usuario = usuariosJson.users.find(user => user.id === 2);
    if (usuario && usuario.privileges === "admin") {
      estadoAdmin = true;
    } else {
      estadoAdmin = false;
    }

    if (estadoAdmin) {
      referenciaUsuario.textContent = "Administrador";
      referenciaBoton.style.display = "block";
    } else {
      referenciaUsuario.textContent = "Usuario";
      referenciaBoton.style.display = "none";
    }
  })
  .catch(error => {
    console.error("Error al obtener el JSON:", error);
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Aquí va tu código JavaScript
    
    // Obtener todos los botones de edición y el botón de guardar
    const editButtons = document.querySelectorAll('.btn-edit');
    const saveButton = document.querySelector('.btn-save');
  
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
    saveButton.addEventListener('click', event => {
      event.preventDefault(); // Evitar la acción predeterminada del botón
  
      // Realizar el proceso de guardar los datos o enviar el formulario, según sea necesario
    });
  });
  
  
  
  
  
  
  
