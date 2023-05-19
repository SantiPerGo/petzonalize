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
const stock=refForm.elements["stock"].value;

// agregar los productos 
let productos= localStorage.getItem("products")
productos=JSON.parse(productos);
<<<<<<< HEAD
console.log("productos", productos)
let i = productos.push({id:13, name:"prueba", description:"still prueba"});
console.log(i);
console.log(productos)
}); */
=======
    console.log("productos", productos)


let id=productos.length+1;
let i = productos.push({id:id, name:name, stock:stock});

actualProducts=JSON.stringify(productos);
localStorage.setItem("products", actualProducts);

    console.log(i);
    console.log(productos)
})
>>>>>>> 7498601 (front-productform-style: in form)

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
            console.log(this);
            previewImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    } else {
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
    }
});