//Obtener el json y cargarlo a local storage 
fetch("/assets/json/products.json")
.then(res => res.json())
.then(data =>{
    console.log(data)
    const products = data.products;
   
    //let actualProducts=JSON.stringify(products);
    //localStorage.setItem("products", actualProducts);
});

//obtener los datos del formulario

let productos= localStorage.getItem("products")
productos=JSON.parse(productos);
console.log("productos", productos)
let i = productos.push({id:13, name:"prueba", description:"still prueba"});
console.log(i);
console.log(productos)



