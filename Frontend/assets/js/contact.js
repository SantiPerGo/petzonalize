$(document).ready(() => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = $('#contact-form');
  validateForm(form);

  // Preparing emailJS service
  emailjs.init('XUqOS_pXRgggqCAW9');

  // Prevent submission and sending emailJS
  form.submit(submitButton => {
    submitButton.preventDefault();

    if(form.valid()) {
      try {
        emailjs.sendForm('petzonalize_service', 'petzonalize_template', document.getElementById("contact-form"));
        sessionStorage.setItem("email-status", "true");
        sessionStorage.setItem("email-operation", "¡Correo Enviado con Éxito!");
      } catch (error) {
        sessionStorage.setItem("email-status", "false");
        sessionStorage.setItem("email-operation", "¡Hubo un Error al Enviar el Correo!");
      }

      setTimeout(() => window.location.href = '../../index.html', 1000);
    }
  });
});