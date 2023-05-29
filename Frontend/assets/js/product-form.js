const alertElement = $("#alert");
const editform =$("#edit-form");
const uploadImg = document.getElementById("product-form-uploads");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
const customTxt = document.getElementById("custom-text");
const txt = document.getElementById("custom-text");

$(document).ready(() => { 
  validateForm(editform);

  //Adquirir elemento en session
  let produtToEdit = sessionStorage.getItem("product");

  if(produtToEdit != null) {
    produtToEdit = JSON.parse(produtToEdit);
    sessionStorage.removeItem("product");

    // Mostrar datos de sessionstorage
    $('#product-form-name').val(produtToEdit.name);
    $('#product-form-description').val(produtToEdit.description);
    $('#product-form-quantity').val(produtToEdit.stock);
    $('#product-form-price').val(produtToEdit.price);
    let img = produtToEdit.imgUrl;

    previewDefaultText.style.display = "none";
    previewImage.style.display = "block";
    $("#imagePreview").removeClass("d-none");
    
    previewImage.setAttribute("src", img);
    customTxt.innerHTML = img;
    $('#product-form-category').val(produtToEdit.category);

    if(produtToEdit.type === "dog")
      document.querySelector('#product-form-dog').checked = true;
    else
      document.querySelector('#product-form-cat').checked = true;
  }
});

//declarar elementos

editform.submit(submitButton => {
  submitButton.preventDefault();

  const name = refForm.elements["product-form-name"].value;
  const stock = Number(refForm.elements["product-form-quantity"].value);
  const category = document.getElementById("product-form-category").value;
  const price = Number(refForm.elements["product-form-price"].value);
  const pet = document.getElementById('product-form-dog').checked ? "dog" : "cat";
  let getty = document.getElementById('product-form-uploads').files[0].name;
  getty= ("/assets/img/products/not customizable/"+getty);

  if(editform.valid())  {
      alertElement.text("¡Producto añadido con Éxito!");
      alertElement.slideDown(250);
      setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
  }else{    
    alertElement.removeClass("alert-success");
    alertElement.removeClass("text-success");
    alertElement.addClass("alert-danger");
    alertElement.addClass("text-danger");
    alertElement.text("¡Debes llenar todos los campos!");
    alertElement.slideDown(250);
    setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
  }
})

// Boton reiniciar/borrar formulario
const resetForm = () => editform.reset();

// Boton cargar imagen
const realFileBtn = document.getElementById("product-form-uploads");
const customBtn = document.getElementById("upload-image");

customBtn.addEventListener("click", () => realFileBtn.click());

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    $("#imagePreview").removeClass("d-none");
  } else {
    customTxt.innerHTML = "No se ha cargado una imagen";
    $("#imagePreview").addClass("d-none");
  }
});

// Mostrar imagen previa que se añadirá al producto

uploadImg.addEventListener("change", function() {
    const file = this.files[0];

    if (file){
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function() {
            previewImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    } else {
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
    }
});