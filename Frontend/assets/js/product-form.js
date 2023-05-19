/* //Obtener el json y cargarlo a local storage 
fetch("/assets/json/products.json")
.then(res => res.json())
.then(data =>{
    console.log(data)
    const products = data.products;
   
    let actualProducts=JSON.stringify(products);
    localStorage.setItem("products", actualProducts);
});
//declarar elementos
let name = document.getElementById("name");

let price = document.getElementById("price");


//obtener los datos del formulario
const refForm =document.forms["edit-form"];
refForm.addEventListener(`submit`, event=>{
    event.preventDefault();

    console.log("en el click")


const name=refForm.elements["name"].value;
let stock=refForm.elements["stock"].value;
let getty = document.getElementById('product-form-uploads').files[0].name;
getty= ("/assets/img/products/not customizable/"+getty)
const category = document.getElementById("product-form-category").value;
let price = refForm.elements["price"].value;
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

actualProducts=JSON.stringify(productos);
localStorage.setItem("products", actualProducts);

    console.log(i);
    console.log(productos)
}); */

// Boton cargar imagen
const realFileBtn = document.getElementById("product-form-uploads");
const customBtn = document.getElementById("upload-image");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function() {
  realFileBtn.click();
});

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});

// Mostrar imagen previa que se añadirá al producto
const uploadImg = document.getElementById("product-form-uploads");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

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
