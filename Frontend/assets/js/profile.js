// *********************************************************************************
// Default operations when the page is loaded
// *********************************************************************************

const formDeleteAccount = $("#form-delete-account");
$(document).ready(() => {
  // Starting inputs validation with jquery
  const formName = $("#form-name");
  const formPhone = $("#form-phone");
  const formEmail = $("#form-email");
  const formPassword = $("#form-password");
  const formAddress = $("#form-address"); 
  validateForm(formName);
  validateForm(formPhone);
  validateForm(formEmail);
  validateForm(formPassword);
  validateForm(formAddress); 
  validateForm(formDeleteAccount); 
  formName.submit(submitButton => submitButton.preventDefault());
  formPhone.submit(submitButton => submitButton.preventDefault());
  formEmail.submit(submitButton => submitButton.preventDefault());
  formPassword.submit(submitButton => submitButton.preventDefault());
  formAddress.submit(submitButton => submitButton.preventDefault());
  formDeleteAccount.submit(submitButton => submitButton.preventDefault());

  // Getting user from local storage
  let user = localStorage.getItem("users-logged-in");

  if (user != null) {
    user = JSON.parse(user);

    // Showing user data into the inputs
    $('#input-name').val(user.name);
    $('#input-email').val(user.email);
    $('#input-phone').val(user.phone);
    $('#input-address').val(user.address); // Mostrar dirección en el input correspondiente

    if (user.privilege === "admin")
      $("#subtitle").text("Administrador");
    else
      $("#subtitle").text("Cliente");
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
  let spanInput = null;

  if(id === "password")
    spanInput = $(`#span-input-${id}`);

  if(state) {
    form.validate().settings.ignore = ":hidden";
    input.removeClass("form-view");
    input.addClass("form-control");
    input.prop('readonly', false);
    icon.removeClass("bi-pencil-square");
    icon.addClass("bi-check-circle");
    inputContainer.removeClass("input-container");

    if(spanInput !== null)
      spanInput.removeClass("d-none");
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

    if(spanInput !== null)
      spanInput.addClass("d-none");
  }
};

const updateLocalStorage = (id, input) => {
  const user = JSON.parse(localStorage.getItem("users-logged-in"));
  user[id] = input.val();
  localStorage.setItem("users-logged-in", JSON.stringify(user));

  // Llamar a la función updateUserData con los datos actualizados
  updateUserData(user);
};

const updateUserData = (userData) => {
  if(isBackendAlive) {
    const url = "https://petzonalize.up.railway.app/users";
    const requestData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    $("#loading").removeClass("d-none");
    fetch(url, requestData)
      .then((response) => {
        $("#loading").addClass("d-none");

        if(response.status === 404) 
          loadAlertText("¡Usuario no encontrado!", "error");
        else if (!response.ok)
          throw new Error("¡Hubo un error de conexion!");
          
        return response.json();
      })
      .then((data) => {
        loadAlertText("¡Datos actualizados correctamente!", "success");
      })
      .catch((error) => {
        $("#loading").addClass("d-none");
        loadAlertText("¡Error al actualizar la cuenta! Intenta de nuevo más tarde", "error")
      });
  } else
    loadAlertText("¡Datos actualizados correctamente!", "success");
};

// *********************************************************************************
// Delete account and cancel deletion functions 
// *********************************************************************************

const deleteAccount = () => {
  $("#delete-buttons").removeClass("d-none");
  $("#buttons").addClass("d-none");
};

// Muestra el formulario cuando se da click al botón de eliminar cuenta
function showDeleteForm() {
  let deleteContainer = document.getElementById('delete-user-container');
  deleteContainer.style.visibility = 'visible';
}

// Cancela y oculta el formulario cuando se da click al botón de cancelar eliminación
function cancelDeleteAccount() {
  let deleteContainer = document.getElementById('delete-user-container');
  deleteContainer.style.visibility = 'hidden';
}

//Cerrar sesión y redirigir hacia el index
function closeSession() {
  // Borrar el valor del 'users-logged-in' del localStorage
  localStorage.removeItem('users-logged-in');
  sessionStorage.setItem("closed-session",
    "¡Sesión Cerrada con Éxito!");
  
  // Redirigir hacia el index
  window.location.href = '../../index.html'; 
}

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

formDeleteAccount.submit(submitButton => {
  submitButton.preventDefault();

  if(formDeleteAccount.valid()) {
    $("#loading").removeClass("d-none");

    if(isBackendAlive) {
      const url = "https://petzonalize.up.railway.app/users";
      const requestData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: $('#input-email').val(),
          password: $("#input-password-delete").val()
        }),
      };
  
      fetch(url, requestData)
        .then((response) => {
          $("#loading").addClass("d-none");
          console.log(response.status)
  
          if(response.status === 400) {
            cancelDeleteAccount();
            resetInput($("#input-password-delete"));
            loadAlertText("¡Contraseña incorrecta!", "error");
          } else if(response.status === 404) {
            cancelDeleteAccount();
            resetInput($("#input-password-delete"));
            loadAlertText("¡Usuario no encontrado!", "error");
          } else if (!response.ok)
            throw new Error("¡Hubo un error de conexion!");
      
          return response.json();
        })
        .then((data) => {
          console.log("Usuario eliminado:", data);
          localStorage.removeItem('users-logged-in');
          sessionStorage.setItem("eliminated-account",
            "¡Cuenta Eliminada con Éxito!");
          window.location.href = '../../index.html';
        })
        .catch((error) => {
          console.error(error);
          $("#loading").addClass("d-none");
          cancelDeleteAccount();
          resetInput($("#input-password-delete"));
          loadAlertText("¡Error al borrar la cuenta! Intenta de nuevo más tarde", "error")
        });
    } else
      deleteAccountFromLocal($('#input-email').val(), $("#input-password-delete").val());
  }
});

function deleteAccountFromLocal(email, password) {
  fetch("/assets/json/users.json")
    .then(response => {
      $("#loading").addClass("d-none");
        if (response.ok) 
            return response.json();
        else 
            throw new Error("Error al acceder al archivo local JSON");
    })
    .then(usersResponse => {
        // Check if user already exists in the local JSON data
        const existingUser = usersResponse.find(u => u.email === email);
        if (existingUser.password !== password) {
          cancelDeleteAccount();
          resetInput($("#input-password-delete"));
          loadAlertText("¡Contraseña incorrecta!", "error");
        } else {
          localStorage.removeItem('users-logged-in');
          sessionStorage.setItem("eliminated-account",
            "¡Cuenta Eliminada con Éxito!");
          window.location.href = '../../index.html';
        }
    })
    .catch((error) => {
      localStorage.removeItem('users-logged-in');
      sessionStorage.setItem("eliminated-account",
        "¡Cuenta Eliminada con Éxito!");
      window.location.href = '../../index.html';
    });
}