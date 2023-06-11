// *********************************************************************************
// Default operations when the page is loaded
// *********************************************************************************

$(document).ready(() => {
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
    $('#input-name').val(user.name);
    $('#input-email').val(user.email);
    $('#input-phone').val(user.phone);

    if(user.privileges === "admin")
      $("#subtitle").text("Administrador");
    else
      $("#subtitle").text("Cliente");
  } else {
    sessionStorage.setItem("not-account", "¡Necesitas Iniciar Sesión para Acceder a tu Perfil!");
    //window.location.href = '../../index.html';
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

  // Llamar a la función updateUserData con los datos actualizados
  updateUserData(user);
};

const updateUserData = (userData) => {
  const url = "https://petzonalize.up.railway.app/users";
  const requestData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  fetch(url, requestData)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos actualizados:", data);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      console.log("JSON almacenado localmente:", userData);
    });
};

// *********************************************************************************
// Delete account and cancel deletion functions 
// *********************************************************************************

const deleteAccount = () => {
  $("#delete-buttons").removeClass("d-none");
  $("#buttons").addClass("d-none");
};

/* const cancelDeleteAccount = () => {
   fetch("https://petzonalize.up.railway.app/users", {
    method: "GET",
   })
      .then(response => response.json())
      .then(data => {

        delete data["users-logged-in"];

        return fetch("https://petzonalize.up.railway.app/users", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
      })
      .then(response => {
        if (response.ok) {
          localStorage.removeItem("users-logged-in");
          sessionStorage.setItem("closed-session", "¡Cuenta Cerrada con Éxito");
          window.location.href = "../../index.html";
        } else {
          console.error("Error al cerrar la sesión.");
        }
      })
      .catch(error => {
        console.error("Error", error);
      });
    }; */

const confirmDeleteAccount = () => {
  fetch("https://petzonalize.up.railway.app/users", {
    method: "GET",
  })
    .then(response => response.json())
    .then(data => {
      delete data["users-logged-in"];

      return fetch("https://petzonalize.up.railway.app/users",{
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem("users-logged-in");
        sessionStorage.setItem("eliminated-account", "¡Cuenta Eliminada con Éxito!");
        window.location.href = '../../index.html';
      } else {
        console.error("Error al eliminar la cuenta.");
      }
    })
    .catch(error => {
      console.error("Error", error);
    });
};


//Añadí estas funciones a partir de aquí


//Muestra el formulario cuando se da click al botón de eliminar cuenta
function showDeleteForm() {
  let deleteContainer = document.getElementById('delete-user-container');
  deleteContainer.classList.remove('pop--hidden');
}

//Cancela y vuelve a ocultar el formulario cuando se da click al botón de cancelar eliminación
function cancelDeleteAccount() {
  let deleteContainer = document.getElementById('delete-user-container');
  deleteContainer.classList.add('pop--hidden');
}

//Cerrar sesión y redirigir hacia el index
function closeSession() {
  // Borrar el valor del 'users-logged-in' del localStorage
  localStorage.removeItem('users-logged-in');
  
  // Redirigir hacia el index
  window.location.href = '../../index.html'; 
}
