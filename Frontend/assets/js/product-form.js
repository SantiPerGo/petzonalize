const editform =$("#edit-form");

const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
const customTxt = document.getElementById("custom-text");

let method="POST";
let productId;

$(document).ready(() => { 
  validateForm(editform);

  //Adquirir elemento en session
  let productToEdit = sessionStorage.getItem("product");

  if(productToEdit != null) {
    productToEdit = JSON.parse(productToEdit);
    sessionStorage.removeItem("product");
    productId = productToEdit.id;
    method="PUT";

    // Mostrar datos de sessionstorage
    $('#product-form-name').val(productToEdit.name);
    $('#product-form-description').val(productToEdit.description);
    $('#product-form-quantity').val(productToEdit.stock);
    $('#product-form-price').val(productToEdit.price);
    $('#product-form-category').val(productToEdit.category);

    // Loading img and url text
    let img = productToEdit.imgUrl;

    previewDefaultText.style.display = "none";
    previewImage.style.display = "block";
    $("#imagePreview").removeClass("d-none");
    
    previewImage.setAttribute("src", img);
    customTxt.innerHTML = img;

    // Setting checkbox
    if(productToEdit.type === "dog")
      document.querySelector('#product-form-dog').checked = true;
    else
      document.querySelector('#product-form-cat').checked = true;
  }
});

// ---------------------------------------------------------------------
// metodo post
// Example POST method implementation:
//declarar elementos
// ---------------------------------------------------------------------

const alertElement = $("#alert");

const postData = (url, data) => {
  const file = realFileBtn.files[0];
  const formData = new FormData();
  formData.append("image", file);

  // Append the JSON data as a Blob
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('product', jsonBlob);  

  $("#loading").removeClass("d-none");

  fetch(url, { method: method, body: formData })
    .then(data => {
      $("#loading").addClass("d-none");
      if(data.status === 201 || data.status === 200) {
        alertElement.removeClass("alert-danger");
        alertElement.removeClass("text-danger");
        alertElement.addClass("alert-success");
        alertElement.addClass("text-success");
        alertElement.text("¡Producto añadido con Éxito!");
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
        window.location.href = "../html/products.html";
      } else {
        if(data.status === 400) 
          alertElement.text("¡Debes cargar una imagen para el producto!");
        else
          alertElement.text("¡Hubo un error con los datos ingresados!");

        alertElement.removeClass("text-success");
        alertElement.addClass("alert-danger");
        alertElement.addClass("text-danger");
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
      }
    })
    .catch(error => console.log(error))
}

editform.submit(submitButton => {
  submitButton.preventDefault();

  const isDogChecked = document.getElementById('product-form-dog').checked;
  const isCatChecked = document.getElementById('product-form-cat').checked;

  if(editform.valid() && (isDogChecked || isCatChecked))  {
    const name = document.getElementById("product-form-name").value;
    const description = document.getElementById("product-form-description").value;
    const stock = Number(document.getElementById("product-form-quantity").value);
    const category = document.getElementById("product-form-category").value;
    const price = Number(document.getElementById("product-form-price").value);
    const pet = isDogChecked ? "dog" : "cat";
    const imgUrl = $(previewImage).attr("src");

    let data= {
      id:productId, name:name, description:description, category:category, 
      customizable:false, price:price, imgUrl:imgUrl, stock:stock, type:pet, 
      properties:null
    };
    
    postData("https://petzonalize.up.railway.app/products", data);
  } else if(!isDogChecked && !isCatChecked) {
    alertElement.removeClass("text-success");
    alertElement.addClass("alert-danger");
    alertElement.addClass("text-danger");
    alertElement.text("¡Debes elegir el tipo de mascota!");
    alertElement.slideDown(250);
    setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
  }
})

// ---------------------------------------------------------------------
// Boton reiniciar/borrar formulario
// ---------------------------------------------------------------------

const resetForm = () => editform.reset();

// ---------------------------------------------------------------------
// Boton eliminar producto
// ---------------------------------------------------------------------

const deleter = document.getElementById("remove");
deleter.addEventListener(`click`, () => {
  const url=("https://petzonalize.up.railway.app/products/"+productId);

  fetch(url, {method: "DELETE"})
    .then(data => {
      if(data.status === 200) {
        sessionStorage.setItem("alert", 8 )
        window.location.href="../html/products.html";
      } else {
        alertElement.removeClass("text-success");
        alertElement.addClass("alert-danger");
        alertElement.addClass("text-danger");
        alertElement.text("¡No se encontró ningun producto con ese id!");
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
      }
    })
    .catch(error => console.error(error))
})

// ---------------------------------------------------------------------
// Boton cargar imagen
// ---------------------------------------------------------------------

const realFileBtn = document.getElementById("product-form-uploads");
const customBtn = document.getElementById("upload-image");

customBtn.addEventListener("click", () => realFileBtn.click());

realFileBtn.addEventListener("change", function() {
  const file = this.files[0];
  
  if (realFileBtn.value) {
    const reader = new FileReader();
    previewDefaultText.style.display = "none";
    previewImage.style.display = "block";
    reader.addEventListener("load", function() {
        previewImage.setAttribute("src", this.result);
    });

    reader.readAsDataURL(file);
    customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    $("#imagePreview").removeClass("d-none");

  } else {
    customTxt.innerHTML = "No se ha cargado una imagen";
    $("#imagePreview").addClass("d-none");

    previewDefaultText.style.display = null;
    previewImage.style.display = null;
    previewImage.setAttribute("src", "");
  }
}); 
