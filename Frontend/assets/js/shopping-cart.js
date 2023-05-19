const productsListContainer = document.getElementById("products-list");
const userCartProducts = JSON.parse(localStorage.getItem("shopping-cart"));

//-----------Defincion de funcion ----------------------
const getUserProductsInStorage = () => {
    
    console.log(userCartProducts);

    let product = ``;
    //------ Iteración de lista de productos --------------
    for(let index = 1; index < userCartProducts.length; index++){
        console.log(userCartProducts[index].name);
       
        // ----- Visualizacion de producto --------
        product = `<div class="product-box my-4 bg-beige">
        <div class="row justify-content-center">
         <!--------- Columna de Imagen Producto--------->
         <div class="col col-lg-4 productimagecontainer">
             <div>
                 <img class="productimage" src="${userCartProducts[index].imgUrl}" alt="">
             </div>
         </div>
         <!------- Columna Informacion de Producto-------->
         <div class="col col-lg-8">
             <div class="row justify-content-center">
                 <div class="col-12 col-lg-12">
                     <h4>${userCartProducts[index].name }</h4>
                 </div>
                 <div class="row col-lg-12 col-md-12 col-sm-12">
                        <div class=" descriptioncontainer">
                            <p class="description">${userCartProducts[index].description}
                            </p>
                            <div class="description-gradient"></div>
                        </div>
                        <a href="#" class="ver-mas">Ver más</a>
                 </div>
                 <div class="col-12 col-lg-12">
                     <div class="row justify-content-center">
                         <div class="col col-lg-6 col-sm-12">
                             <p>Precio Individual: $<span>${userCartProducts[index].price}</span></p>
                         </div>
                         <div class="col col-lg-6 col-sm-12">
                             <div class="container">
                                 <div class="row">
                             <div class="cantidadproductos">
                                 Cantidad
                                 <button type="button" class="button-icon removepiece" id="removepiece"><ion-icon id="removepiece" name="remove-circle"></ion-icon></button>
                                 <span class="number-display" id="amount-product">${userCartProducts[index].amount}</span>
                                <button type="button" class="button-icon addpiece" id="addpiece"><ion-icon id="addpiece" name="add-circle"></ion-icon></button>
                             </div>
                         </div>
                         </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
        
         </div>
     </div>     `;

        productsListContainer.innerHTML += product;
    }

    const descriptionParagraph = document.querySelector('.descriptioncontainer');
    const verMasLink = document.querySelector('.ver-mas');
    
    verMasLink.addEventListener('click', function(event) {
      event.preventDefault();
    
      if (descriptionParagraph.classList.contains('show-description')) {
        descriptionParagraph.classList.remove('show-description');
        descriptionParagraph.classList.add('hide-description');
        verMasLink.innerText = 'Ver más';
      } else {
        descriptionParagraph.classList.remove('hide-description');
        descriptionParagraph.classList.add('show-description');
        verMasLink.innerText = 'Ver menos';
      }
    });
    

}

/* Establecer el precio en 0.00 en el DOM al cargar la pagina */

let totalPrice=0;
const totalPriceElement = document.querySelector('.totalPrice');
totalPriceElement.textContent = totalPrice.toFixed(2);


/*Función para  Vaciar Carrito de compras */

function deleteShoppingCart() {
    // Eliminar solo los datos del carrito de compras del Local Storage
    localStorage.removeItem("shopping-cart");
  
    // Establecer el valor del precio total a 0
    let totalPrice = 0;
  
    // Actualizar el contenido de la clase "totalPrice" en el DOM
    const totalPriceElement = document.querySelector('.totalPrice');
    totalPriceElement.textContent = totalPrice.toFixed(2);
  
    // Vaciar el contenido del contenedor
    productsListContainer.innerHTML = "";
  }


getUserProductsInStorage();

//-------------------- Add more pices of an product ---------------
const modifyAmountProducts = ()=>{
    
    const amountContainer = document.getElementsByClassName("cantidadproductos");
    
    for(let index = 0; index < amountContainer.length; index++){
        //------------------ Agregar Items ---------------------------
        amountContainer[index].children["addpiece"].addEventListener("click", ()=>{
           
            if(userCartProducts[index+1].amount < 10){
            userCartProducts[index+1].amount += 1;
            userCartProducts[0].total += 1;
            updateIconCartReference(userCartProducts[0].total);
            amountContainer[index].children["amount-product"].innerText = userCartProducts[index+1].amount;
            localStorage.setItem("shopping-cart", JSON.stringify(userCartProducts));
            }

        });
        

        //------------------- Quitar Items ---------------------------
        amountContainer[index].children["removepiece"].addEventListener("click", ()=>{
            
            if(userCartProducts[index+1].amount > 1){
                userCartProducts[index+1].amount -= 1;
                userCartProducts[0].total -= 1;
                updateIconCartReference(userCartProducts[0].total);
                amountContainer[index].children["amount-product"].innerText = userCartProducts[index+1].amount;
                localStorage.setItem("shopping-cart", JSON.stringify(userCartProducts));
            }
            else{
                console.log("You have 1 item only");
            }
        });
        
    }
}

modifyAmountProducts();


// const pintarCarrito = () => {
//     //para hacer limpieza y que no se repita el carrito
//     modalContainer.innerHTML = "";
//     modalContainer.style.display = "flex";
//     const modalHeader = document.createElement("div");
//     modalHeader.className = "modal-header";
//     modalHeader.innerHTML = `
//     <h1 class="modal-header-title">Carrito. </h1>

//     `;
//     modalContainer.append(modalHeader);

//     const modalButton = document.createElement("h1");
//     modalButton.innerText = "x";
//     modalButton.className = "modal-Header-button";

//     modalButton.addEventListener("click", () =>{
//         //para que desaparezca el boton de salir
//         modalContainer.style.display = "none";
//     });


//     modalHeader.append(modalButton);

//     carrito.forEach((product) =>{
//         let carritoContent = document.createElement("div")
//         carritoContent.className = "modal-content";
//         carritoContent.innerHTML = `
//         <img src="${product.img}">
//         <h3>${product.nombre}</h3>
//         <p>${product.precio}</p>
//         <span class = "restar"> ➖ </span>
//         <p>Cantidad: ${product.cantidad}</p>
//         <span class = "sumar"> ➕ </span>
//         <p>Total: ${product.cantidad * product.precio}</p>
//         <span class = "delete-product"> ❌ </span>
//         `;

//         modalContainer.append(carritoContent);
//         console.log(carrito.length);

//         let restar = carritoContent.querySelector(".restar");
        
//         restar.addEventListener("click", () =>  {
//             if(product.cantidad !== 1){
//                 product.cantidad--;
//             }
//             saveLocal();
//             pintarCarrito();
            
//         });

//         let sumar = carritoContent.querySelector(".sumar");
//         sumar.addEventListener("click", () =>  {
//             ////////////////////////////////////////////////////
//             if(product.cantidad <=9){
//                 product.cantidad++;
//             }
//                 saveLocal();
//                 pintarCarrito();
    
//         });

//         let eliminar = carritoContent.querySelector(".delete-product");
//         eliminar.addEventListener("click", () =>  {
//             eliminarProducto(product.id);
//         });

//         // let eliminar = document.createElement("span");

//         // eliminar.innerText = "❌";
//         // eliminar.className = "delete-product";
//         // carritoContent.append(eliminar);

//         // eliminar.addEventListener("click", eliminarProducto);


//     });
//     //al acumulador le sumamos el multiplo de los productos individuales
//     const total = carrito.reduce((acc,el) => acc + el.precio * el.cantidad, 0);

//     const totalBuying = document.createElement("div");
//     totalBuying.className = "total-content"
//     totalBuying.innerHTML = `total a pagar: ${total} $ `;
//     modalContainer.append(totalBuying);
  
//  };

//  verCarrito.addEventListener("click", pintarCarrito);

//  //-----------funcion para eliminar producto del carrito 

//  const eliminarProducto = (id) => {
//     //metodo que nos ayuda a buscar el id del producto que se quiere eliminar
//     const foundId = carrito.find((element) => element.id === id);
//     //despues de encontrarlo le asignamos a carrito nuevo valor 

//     carrito = carrito.filter((carritoId) => {
//         return carritoId !== foundId;
//     });

//     carritoCounter();
//     saveLocal();
//     pintarCarrito();
//  };

//  const carritoCounter = () => {
//     cantidadCarrito.style.display= "block";

//     const carritoLength = carrito.length;

//     localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

//     cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
//  };

// carritoCounter();
