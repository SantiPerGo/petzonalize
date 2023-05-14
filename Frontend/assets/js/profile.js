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



const referenciaUsuario= document.getElementById("estado");
const referenciaBoton= document.getElementById("boton-admin");
let estadoAdmin;
estadoAdmin=false;

referenciaBoton.style.display="none";

if (estadoAdmin === true) {
  referenciaUsuario.textContent = "Administrador";
  referenciaBoton.style.display = "block";
} else {
  referenciaUsuario.textContent = "Usuario";
  referenciaBoton.style.display = "none";
}

