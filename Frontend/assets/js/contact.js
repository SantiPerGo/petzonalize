$(document).ready(() => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = $('#contact-form');

  // Preparing emailJS service
  emailjs.init('XUqOS_pXRgggqCAW9');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        try {
          emailjs.sendForm('petzonalize_service', 'petzonalize_template', form);
          sessionStorage.setItem("email-status", "true");
          sessionStorage.setItem("email-operation", "¡Correo Enviado con Éxito!");
        } catch (error) {
          sessionStorage.setItem("email-status", "false");
          sessionStorage.setItem("email-operation", "¡Hubo un Error al Enviar el Correo!");
        }
      }
    }, false);
  })
});