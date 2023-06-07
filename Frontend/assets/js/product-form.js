const alertElement = $("#alert");
const editform =$("#edit-form");
const add = $("#add");
const uploadImg = document.getElementById("product-form-uploads");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
const customTxt = document.getElementById("custom-text");
const txt = document.getElementById("custom-text");
const method="POST";
const page = "#";
$(document).ready(() => { 
  validateForm(editform);

  //Adquirir elemento en session
  let produtToEdit = sessionStorage.getItem("product");

  if(produtToEdit != null) {
    produtToEdit = JSON.parse(produtToEdit);
    sessionStorage.removeItem("product");
    method="PUT";
    page="../html/products.html";

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
// metodo post

// Example POST method implementation:

//declarar elementos


editform.submit(submitButton => {
  submitButton.preventDefault();

  console.log("Botodn guardar")

  const name = document.getElementById("product-form-name").value;
  const description = document.getElementById("product-form-description").value;
  const stock = Number(document.getElementById("product-form-quantity").value);
  const category = document.getElementById("product-form-category").value;
  const price = Number(document.getElementById("product-form-price").value);
  const pet = document.getElementById('product-form-dog').checked ? "dog" : "cat";
  let getty = document.getElementById('product-form-uploads').files[0].name;
  getty= ("/assets/img/products/not customizable/"+getty);

  let data= { name:name, description:description, category:category, notNull: "cannot be null or empty",
  customizable:false, price:price, imgUrl:"getty", stock:stock, type:pet, properties:null};
  console.log(data);

  async function postData(url, data) {
  
      let response = await fetch(url, {
          method: method,
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json; charset=UTF-8"}
      })
  
      response = await response.json();
  
      console.log(response)
  }
  
  postData("https://petzonalize.up.railway.app/products", data).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });

  if(editform.valid())  {
      alertElement.text("¡Producto añadido con Éxito!");
      alertElement.slideDown(250);
      setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
      window.location.href =page;
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