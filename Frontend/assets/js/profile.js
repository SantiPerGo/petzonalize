// *********************************************************************************
// Default operations when the page is loaded
// *********************************************************************************

$(document).ready(() => {
  // Hiding alert in html
  const alertElement = $("#alert");
  alertElement.hide();

  // Starting inputs validation with jquery
  const formName = $("#form-name");
  const formPhone = $("#form-phone");
  const formEmail = $("#form-email");
  const formPassword = $("#form-password");
  validateForm(formName);
  validateForm(formPhone);
  validateForm(formEmail);
  validateForm(formPassword);
  formName.submit(submitButton => submitButton.preventDefault());
  formPhone.submit(submitButton => submitButton.preventDefault());
  formEmail.submit(submitButton => submitButton.preventDefault());
  formPassword.submit(submitButton => submitButton.preventDefault());

  // Getting user from local storage
  let user = localStorage.getItem("users-logged-in");

  if(user != null) {
    user = JSON.parse(user);

    // Showing user data into the inputs
    $("#subtitle").text(user.privileges);
    $('#input-name').val(user.name);
    $('#input-email').val(user.email);
    $('#input-phone').val(user.phone);
  } else {
    sessionStorage.setItem("not-account", "¡Necesitas Iniciar Sesión para Acceder a tu Perfil!");
    window.location.href = '../../index.html';
  }
});

// *********************************************************************************
// Pencil icon, save icon and inputs validation
// *********************************************************************************

const editInput = inputId => {
  inputState(inputId, true);

  const iconButton = $(`#edit-${inputId}`);
  iconButton.prop("onclick", null).off("click");
  iconButton.on("click", () => {
    if($(`#form-${inputId}`).valid()) {
      inputState(inputId, false);
      iconButton.off("click");
      iconButton.on("click", () => editInput(inputId));
    }
  });
};

const inputState = (id, state) => {
  const input = $(`#input-${id}`);
  const icon = $(`#edit-${id}`).children();
  const form = $(`#form-${id}`);
  const inputContainer = $(`#input-${id}-container`);

  if(state) {
    form.validate().settings.ignore = ":hidden";
    input.removeClass("form-view");
    input.addClass("form-control");
    input.prop('readonly', false);
    icon.removeClass("bi-pencil-square");
    icon.addClass("bi-check-circle");
    inputContainer.removeClass("input-container");
  } else {
    form.validate().settings.ignore = "*";
    input.addClass("form-view");
    input.removeClass("form-control");
    input.prop('readonly', true);
    icon.addClass("bi-pencil-square");
    icon.removeClass("bi-check-circle");
    inputContainer.addClass("input-container");
    form.find('input').each((key, input) => resetInput(input));
    updateLocalStorage(id, input);
  }
};

const resetInput = input => {
  $(input).removeData("previousValue");
  $(input).removeAttr("aria-invalid");
  $(input).removeClass("valid");
  $(input).removeClass("invalid");
  $(input).removeClass("input-icon-valid");
  $(input).removeClass("input-icon-invalid");
  $(`#${input.id}-error`).remove();
};

const updateLocalStorage = (id, input) => {
  const user = JSON.parse(localStorage.getItem("users-logged-in"));
  user[id] = input.val();
  localStorage.setItem("users-logged-in", JSON.stringify(user));
};

// *********************************************************************************
// Delete account and cancel deletion functions 
// *********************************************************************************

const deleteAccount = () => {
  $("#delete-buttons").removeClass("d-none");
  $("#buttons").addClass("d-none");
};

const cancelDeleteAccount = () => {
  $("#delete-buttons").addClass("d-none");
  $("#buttons").removeClass("d-none");
};

const closeSession = () => {
  localStorage.removeItem("users-logged-in");
  sessionStorage.setItem("closed-session", "¡Cuenta Cerrada con Éxito!");
  window.location.href = '../../index.html';
};

const confirmDeleteAccount = () => {
  localStorage.removeItem("users-logged-in");
  sessionStorage.setItem("eliminated-account", "¡Cuenta Eliminada con Éxito!");
  window.location.href = '../../index.html';
};