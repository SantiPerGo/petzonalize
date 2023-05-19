//Obtener el json y cargarlo a local storage 
fetch("/assets/json/products.json")
.then(res => res.json())
.then(data =>{
    console.log(data)
    const products = data.products;
   
    //let actualProducts=JSON.stringify(products);
    //localStorage.setItem("products", actualProducts);
});
//declarar elementos
let name = document.getElementById("name");

let price = document.getElementById("price");


//obtener los datos del formulario
const refForm =document.getElementById["add"];
refForm.addEventListener(`submit`, (event)=>{

const name=refForm.elements["name"].value;
const stock=refForm.elements["stock"].value;

let productos= localStorage.getItem("products")
productos=JSON.parse(productos);
console.log("productos", productos)
let i = productos.push({id:13, name:"prueba", description:"still prueba"});
console.log(i);
console.log(productos)
});


