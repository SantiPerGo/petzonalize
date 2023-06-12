const alertElement = $("#alert");
const editform =$("#edit-form");
const add = $("#add");
const uploadImg = document.getElementById("product-form-uploads");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
const customTxt = document.getElementById("custom-text");
const txt = document.getElementById("custom-text");
const deleter = document.getElementById("remove");

let productId;

let method="POST";
let page = "#";
$(document).ready(() => { 
  validateForm(editform);

  //Adquirir elemento en session
  let productToEdit = sessionStorage.getItem("product");

  if(productToEdit != null) {
    productToEdit = JSON.parse(productToEdit);
    productId = productToEdit.id;
    sessionStorage.removeItem("product");
    method="PUT";
    page="../html/products.html";

    // Mostrar datos de sessionstorage
    $('#product-form-name').val(productToEdit.name);
    $('#product-form-description').val(productToEdit.description);
    $('#product-form-quantity').val(productToEdit.stock);
    $('#product-form-price').val(productToEdit.price);
    let img = productToEdit.imgUrl;

    previewDefaultText.style.display = "none";
    previewImage.style.display = "block";
    $("#imagePreview").removeClass("d-none");
    
    previewImage.setAttribute("src", img);
    customTxt.innerHTML = img;
    $('#product-form-category').val(productToEdit.category);

    if(productToEdit.type === "dog")
      document.querySelector('#product-form-dog').checked = true;
    else
      document.querySelector('#product-form-cat').checked = true;

      async function deletion(url) {
  
        let response = await fetch(url, {
            method: "DELETE",
        }) .then(response => {
          
          //console.log(response.status); 
          //console.log(response.statusText); 
          
          return response;
        
        })
        .then(data => {
          
          if(data.status===200){
            sessionStorage.setItem("alert", 8 )
            window.location.href="../html/products.html";
          }else{
            alertElement.removeClass("text-success");
            alertElement.addClass("alert-danger");
            alertElement.addClass("text-danger");
            alertElement.text("¡No se encontró ningun producto con ese id!");
            alertElement.slideDown(250);
            setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
          }
        
        })
        .catch(error => {
      
      
        })
      
      }
      url=("https://petzonalize.up.railway.app/products/"+productToEdit.id);
      deleter.addEventListener(`click`, ()=>{
      deletion(url)
      console.log("deleter")
      
      })
    
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
  const imgUrl = $(previewImage).attr("src");

  let data= { id:productId, name:name, description:description, category:category,
  customizable:false, price:price, imgUrl:imgUrl, stock:stock, type:pet, properties:null};
  console.log(data);

  async function postData(url, data) {
      const file = realFileBtn.files[0];
      const formData = new FormData();
      formData.append("image", file);

      // Append the JSON data as a Blob
      const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      formData.append('product', jsonBlob);  
  
      let response = await fetch(url, {
          method: method,
          body: formData
      })
  
      response = await response.json();
  
      console.log(response)
  }
  
  postData("http://localhost:8080/products", data).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });

  if(editform.valid())  {
      alertElement.removeClass("alert-danger");
      alertElement.removeClass("text-danger");
      alertElement.addClass("alert-success");
      alertElement.addClass("text-success");
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