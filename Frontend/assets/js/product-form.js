const alertElement = $("#alert");
const editform =$("#edit-form");
alertElement.hide();
const uploadImg = document.getElementById("product-form-uploads");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
const customTxt = document.getElementById("custom-text");

$(document).ready(() => {
validateForm(editform);
});

 //Obtener el json y cargarlo a local storage 

fetch("/assets/json/products.json")
.then(res => res.json())
.then(data =>{
    console.log(data)
    const products = data.products;
   
    let actualProducts=JSON.stringify(products);
    localStorage.setItem("products", actualProducts);
});

//Adiquirir elemento en session
let produtToEdit = sessionStorage.getItem("product");

if(produtToEdit != null) {
  produtToEdit = JSON.parse(produtToEdit);

  // Mostrar datos de sessionstorage
  $('#product-form-name').val(produtToEdit.name);
  $('#product-form-description').val(produtToEdit.description);
  $('#product-form-quantity').val(produtToEdit.stock);
  $('#product-form-price').val(produtToEdit.price);
 let img = (produtToEdit.imgUrl)

  previewDefaultText.style.display = "none";
  previewImage.style.display = "block";
  const txt =document.getElementById("custom-text");
  txt.className = `custom-textB`;
  
  previewImage.setAttribute("src", img);
  customTxt.innerHTML = img;
  $('#product-form-category').val(produtToEdit.category);
  if(produtToEdit.type=="dog"){
  document.querySelector('#product-form-dog').checked = true;
  }else document.querySelector('#product-form-cat').checked = true;
  

}
//declarar elementos

const refForm =document.forms["edit-form"];
refForm.addEventListener(`submit`, event=>{
   event.preventDefault();

    console.log("en el click")


const name=refForm.elements["product-form-name"].value;
let stock=refForm.elements["product-form-quantity"].value;
let getty = document.getElementById('product-form-uploads').files[0].name;
getty= ("/assets/img/products/not customizable/"+getty)
const category = document.getElementById("product-form-category").value;
let price = refForm.elements["product-form-price"].value;
let pet;
stock=Number(stock);
price=Number(price);
if (document.getElementById('product-form-dog').checked) {  
           pet="dog";
                    }else{ pet="cat"}
 
 


// agregar los productos 
let productos= localStorage.getItem("products")
productos=JSON.parse(productos);
    console.log("productos", productos)


let id=productos.length+1;
let i = productos.push({id:id, category:category, customizable:false, name:name, stock:stock, imgUrl:getty, price:price, type:pet});
let productToSet={id:id, category:category, customizable:false, name:name, stock:stock, imgUrl:getty, price:price, type:pet};

productToSet=JSON.stringify(productToSet);
sessionStorage.setItem("product", productToSet);

actualProducts=JSON.stringify(productos);
localStorage.setItem("products", actualProducts);

    console.log(i);
    console.log(productos)
    if(id && category && name && stock && getty && price && pet)  {
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
function resetForm() {
  var form = document.getElementById("edit-form");

  form.reset();
}

// Boton cargar imagen
const realFileBtn = document.getElementById("product-form-uploads");
const customBtn = document.getElementById("upload-image");


customBtn.addEventListener("click", function() {
  realFileBtn.click();

});

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
    
    const txt =document.getElementById("custom-text");
    txt.className = `custom-textB`;
    
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});

// Mostrar imagen previa que se añadirá al producto
/* const uploadImg = document.getElementById("product-form-uploads");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text"); */

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


/* const uploadBtn = document.getElementById("upload-image");
const imagePreview = document.getElementById("imagePreview");
const imgPrev = document.getElementById("imgPrev");
const customText = document.getElementById("custom-text");
const fileInput = document.getElementById("product-form-uploads");

// Reset the image preview
function resetImagePreview() {
    imgPrev.src = "";
    imagePreview.style.display = "none";
    customText.textContent = "No se ha cargado una imagen.";
    fileInput.value = ""; // Reset the file input
}

// Add event listener to the button
uploadBtn.addEventListener("click", resetImagePreview); */