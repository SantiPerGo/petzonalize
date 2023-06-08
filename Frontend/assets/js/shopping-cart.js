const productsListContainer = document.getElementById("products-list");
let userCartProducts = JSON.parse(localStorage.getItem("shopping-cart"));
const notFountContainer = document.querySelector(".list-not-found");
const notRegisteredForm = $("#not-registered-form");
const btnCreateOrder = document.getElementById("create-order-btn");
const btnOpenWindowOrder = document.getElementById("open-create-order");
const btnCloseWindowOrder = document.getElementById("close-window-form");
const formOrderContainer = document.querySelector(".not-register-form-container");

const emptyCart = () => {
    const emptyCartButton = document.getElementById('empty-cart');

    emptyCartButton.disabled = true;
    btnOpenWindowOrder .disabled = true;

    return `<div class="list-not-found mt-4">
    <div class="row justify-content-center">
        <div class="col col-12 mt-4">
            <h4>No tienes productos en el carrito</h4>
        </div>
        <div class="col col-12 mt-4">
            <div class="error-image-container mt-4">
                <img src="../img/page-error-cat.png" alt="Gatito dice que tienes carrito Vacio" class="errorcat">
            </div>
        </div>
    </div>
    </div>`;
}
//_---------------------Plantilla Productos No Personalizables -----------------
const notCustomProducts = (product) => {
    return `<div class="product-box product-${product.id} my-4 bg-beige">
         <div class="row justify-content-center position-relative">
         <div class="container-button-delete">
         <button type="button" class="delete-product d-flex border-0 rounded-circle p-0" id="delete-product">
         <img src="../img/shopping-cart/cross.svg" alt="">
         </button>
         </div>
         <!--------- Columna de Imagen Producto--------->
         <div class="col-12 col-lg-4 col-md-8 col-sm-12 product-image-container">
         <div class="">
         <img class="productimage" src="${product.imgUrl}" alt="">
         </div>
         </div>
         <!------- Columna Informacion de Producto-------->
         <div class="col-12 col-lg-8 col-md-8 col-sm-12">
         <div class="row justify-content-center">
         <div class="col-12 col-lg-12">
         <h4>${product.name}</h4>
         </div>
         <div class="row col-lg-12 col-md-12 col-sm-12">
         <div class=" descriptioncontainer">
         <p class="description">${product.description}
         </p>
         <div class="description-gradient"></div>
         </div>
         <a href="#" class="ver-mas">Ver más</a>
         </div>
         <div class="col-12 col-lg-12">
         <div class="row justify-content-center mt-3">
         <div class="col-6 col-lg-6 col-sm-12">
         <div class="w-100">
         <p>Precio Individual: $<span>${product.price}</span></p>
         </div>
         </div>
         <div class="col-6 col-lg-6 col-sm-12">
         <div class="row justify-content-center">
         <div class="col-12 py-0">
         <div class="amountText">
         <p class="my-0">Cantidad</p>
         </div>  
         </div>
         <div class="col-12 text-center mt-0">
         <div class="amountButtons cantidadproductos">
         <button type="button" class="button-icon removepiece" id="removepiece"><ion-icon id="removepiece" name="remove-circle">
         </ion-icon>
         </button>
         <p class="number-display" id="amount-product">${product.amount}</p>
         <button type="button" class="button-icon addpiece" id="addpiece"><ion-icon id="addpiece" name="add-circle">
         </ion-icon>
         </button>
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
}
//--------------- Plantilla Productos Personalizables ---------------
const customProducts = (product) => {
    let customColor = ``;
    let outfits = ``;
    let patternAvailable = ``;
    let userCustoms = ``;
    if(product.category == "pet"){
        patternAvailable = ``;
    }else{
        if(product.properties.hasOwnProperty("pattern")){
            patternAvailable = ` <div class="col-material">
                                <div class="rounded-circle mx-auto" style="height: 2.62em; width: 2.62em; overflow: hidden; ">
                                    <img width="100%" height="auto" src="${product.properties.pattern}" >
                                </div>
                                <p>Estampado</p>
                                </div>`;
        }
        else{
            patternAvailable = `<div class="col-material">
                                     <div class="py-3"><p style="color: var(--purple);">Sin<br>Estampado</p></div>
                                </div>`;
        }
    }
    
    if(product.properties.hasOwnProperty("petname")){
        userCustoms += `<p class="my-0">Nombre: ${product.properties.petname}</p>`;                      
    }
    if(product.properties.hasOwnProperty("petphone")){
        userCustoms += `<p class="my-0">Teléfono: ${product.properties.petphone}</p>`;
    }
    if(product.properties.hasOwnProperty("body")){
        outfits += `<div class="" style="height: 3.2em; width: 50%; overflow: hidden;">
                        <img width="auto" height="100%" src="${product.properties.body}" >
                    </div>`;
    }
    if(product.properties.hasOwnProperty("head")){
        outfits += `<div class="" style="height: 3.2em; width: 50%; overflow: hidden;">
        <img width="auto" height="100%" src="${product.properties.head}" >
    </div>`;
    }
    if(product.properties.hasOwnProperty("color")){
        customColor = `<div class="col-color">
                            <div class="rounded-circle mx-auto" style="height: 2.62em; width: 2.62em; background-color: ${product.properties.color}; ">
                            </div>
                            <p>Color</p>
                        </div>`;
    }

    return `<div class="product-box product-${product.id} my-4 bg-beige">
         <div class="row justify-content-center position-relative">
         <div class="container-button-delete">
         <button type="button" class="delete-product d-flex border-0 rounded-circle p-0" id="delete-product">
         <img src="../img/shopping-cart/cross.svg" alt="">
         </button>
         </div>
         <!--------- Columna de Imagen Producto--------->
         <div class="col-12 col-lg-4 col-md-8 col-sm-12 product-image-container">
         <div class="">
         <img class="productimage" src="${product.imgUrl}" alt="">
         </div>
         </div>
         <!------- Columna Informacion de Producto-------->
         <div class="col-12 col-lg-8 col-md-8 col-sm-12">
         <div class="row justify-content-center">
         <div class="col-12 col-lg-12">
         <h4>${product.name}</h4>
         </div>
         <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="description-customizable">
                <div class="row justify-content-center">
                    <div class="col col-6 mx-auto" style="width: 50%">
                        ${customColor}
                            </div>
                    <div class="col col-6 mx-auto" style="width: 50%">
                        ${patternAvailable}
                        </div>
                    <div class="col col-12">
                        <div class="col-size">
                            <p>${product.properties.hasOwnProperty("size") ? product.properties.size : " "}</p>
                            ${userCustoms}
                        </div>
                    </div>
                    <div class="col col-12">
                            ${outfits !== ''? `<p class="my-0">Extras</p>` : ` `}
                        <div class="d-flex">
                            ${outfits}
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="col-12 col-lg-12">
                <div class="row justify-content-center mt-3">
                    <div class="col-6 col-lg-6 col-sm-12">
                        <div class="w-100">
                            <p>Precio Individual: $<span>${product.price}</span></p>
                        </div>
                    </div>
                    <div class="col-6 col-lg-6 col-sm-12">
                        <div class="row justify-content-center">
                            <div class="col-12 py-0">
                                <div class="amountText">
                                    <p class="my-0">Cantidad</p>
                                </div>  
                            </div>
                            <div class="col-12 text-center mt-0">
                                <div class="amountButtons cantidadproductos">
                                    <button type="button" class="button-icon removepiece" id="removepiece"><ion-icon id="removepiece" name="remove-circle">
                                        </ion-icon>
                                    </button>
                                <p class="number-display" id="amount-product">${product.amount}</p>
         <button type="button" class="button-icon addpiece" id="addpiece"><ion-icon id="addpiece" name="add-circle">
         </ion-icon>
         </button>
         </div>
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
}

/* Establecer el precio en 0.00 en el DOM al cargar la pagina */

let totalPrice = 0;
const totalPriceElement = document.querySelector('.totalPrice');
totalPriceElement.textContent = totalPrice.toFixed(2);

const printAllProductsFound = () =>{
    let products = ``;
    //------ Iteración de lista de productos --------------
    userCartProducts.forEach( (product, index) => {
       if(index !== 0){
         // ----- Visualizacion de producto --------
        if(product.customizable == false){
            products += notCustomProducts(product);
        }
        else if(product.customizable == true){
            products += customProducts(product);
        }
       }
    });
    return products;
}
//----------- Carga la pagina web ----------------------
const getUserProductsInStorage = () => {
    if(userCartProducts !== null && userCartProducts !== undefined){
        if(userCartProducts.length > 1){
            productsListContainer.innerHTML = printAllProductsFound();
            updateAmountSpan();
            updateTotalPrice();
        }
        else if(userCartProducts.length <= 1){
            productsListContainer.innerHTML = emptyCart();
        }
    }
    else{
        productsListContainer.innerHTML = emptyCart();
    }

}
getUserProductsInStorage();

/*Función para  Vaciar Carrito de compras */

function deleteShoppingCart() {
    // Eliminar solo los datos del carrito de compras del Local Storage
    localStorage.removeItem("shopping-cart");

    // Establecer el valor del precio total a 0
    let totalPrice = 0;
    userCartProducts = null;
    // Actualizar el contenido de la clase "totalPrice" en el DOM
    const totalPriceElement = document.querySelector('.totalPrice');
    totalPriceElement.textContent = totalPrice.toFixed(2);
    updateAmountSpan();
    updateIconCartReference('0');
    // Vaciar el contenido del contenedor
    productsListContainer.innerHTML = "";
    productsListContainer.innerHTML = emptyCart();
}


//----------------------------------------------------------
const descriptionParagraph = document.querySelectorAll('.descriptioncontainer');
const verMasLink = document.querySelectorAll('.ver-mas');

verMasLink.forEach((verMasButton, index) => {
    verMasButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (descriptionParagraph[index].classList.contains('show-description')) {
            descriptionParagraph[index].classList.remove('show-description');
            descriptionParagraph[index].classList.add('hide-description');
            verMasButton.innerText = 'Ver más';
        } else {
            descriptionParagraph[index].classList.remove('hide-description');
            descriptionParagraph[index].classList.add('show-description');
            verMasButton.innerText = 'Ver menos';
        }
    });
});

/*Función para obtener el valor total llegado del localstorage*/
function updateTotalPrice() {

    // Obtener el valor del carrito de compras del Local Storage
    let totalPrice = 0;
    if (userCartProducts && userCartProducts.length > 0) {
        totalPrice = userCartProducts.reduce((total, product) => {
            const price = parseFloat(product.price);
            const amount = parseInt(product.amount);
            if (!isNaN(price) && !isNaN(amount)) {
                return total + price * amount;
            } else {
                return total;
            }
        }, 0);
    }

    // Actualizar el contenido de la clase "totalPrice" al valor del carrito de compras
    const totalPriceElement = document.querySelector(".totalPrice");
    totalPriceElement.textContent = totalPrice.toFixed(2); // Asegura que se muestren dos decimales
}

function updateAmountSpan() {
    const totalPieces = document.getElementById("piecesProducts");
    
    if (userCartProducts) {
        let total = userCartProducts[0].total;
        totalPieces.innerText = `${total}`;
    }
    else if(userCartProducts == null && userCartProducts == undefined){
        totalPieces.innerText = '0';
    }
}


//Regresar al product page
function backShoppingCartPage() {
    window.location.href = "./products.html";
}

//------------------- Actualizar icono de carrito de compras ----------------
const updateIconCartReference = (amount) => {
    const shoppingCartCounter = $("#shopping-cart-counter");
    shoppingCartCounter.text(amount);
}



//-------------------- Add more pices of an product ---------------
const modifyAmountProducts = () => {

    const amountContainer = document.getElementsByClassName("cantidadproductos");

    for (let index = 0; index < amountContainer.length; index++) {
        //------------------ Agregar Items ---------------------------
        amountContainer[index].children["addpiece"].addEventListener("click", () => {
            if (userCartProducts[index + 1].amount < 10) {
                userCartProducts[index + 1].amount += 1;
                userCartProducts[0].total += 1;
                updateIconCartReference(userCartProducts[0].total);
                amountContainer[index].children["amount-product"].innerText = userCartProducts[index + 1].amount;
                updateAmountSpan();
                updateTotalPrice();
                localStorage.setItem("shopping-cart", JSON.stringify(userCartProducts));
            }

        });


        //------------------- Quitar Items ---------------------------
        amountContainer[index].children["removepiece"].addEventListener("click", () => {

            if (userCartProducts[index + 1].amount > 1) {
                userCartProducts[index + 1].amount -= 1;
                userCartProducts[0].total -= 1;
                updateIconCartReference(userCartProducts[0].total);
                amountContainer[index].children["amount-product"].innerText = userCartProducts[index + 1].amount;
                updateAmountSpan();
                updateTotalPrice();
                localStorage.setItem("shopping-cart", JSON.stringify(userCartProducts));
            }
        });

    }
}

modifyAmountProducts();

const deleteProduct = document.querySelectorAll(".delete-product");

deleteProduct.forEach((deleteIconProduct, index) => {
    deleteIconProduct.addEventListener("click", () => {
        userCartProducts[0].total -= userCartProducts[index + 1].amount;
        userCartProducts.splice(index + 1, 1);
        localStorage.setItem("shopping-cart", JSON.stringify(userCartProducts));
        document.location.reload();
    });
});


//------------------- Form not registered user --------------------
$(document).ready(()=>{
    validateForm(notRegisteredForm);
});

//---------------- Formulario escucha boton, valida y crea la orden -------
notRegisteredForm.submit(submitButton => {
    submitButton.preventDefault();

    if(notRegisteredForm.valid()){
        createUserOrder();
    }
});

// ----------------Funcionalidades de Formulario de Orden ----------------
const hiddenWindowOrder = () =>{
    formOrderContainer.classList.add("pop--hidden");
    formOrderContainer.classList.remove("pop--unhidden");
}

btnCloseWindowOrder.addEventListener('click', ()=>{
    hiddenWindowOrder();
});

//--------------  Carga datos de usuario logeado ------
const setInputs = (userData) => {
    const name = $("#input-name-order");
    const email = $("#input-email-order");
    const phone = $("#input-phone-order");
    const address = $("#input-address-order");

    name.val(userData.name);
    email.val(userData.email);
    phone.val(userData.phone);
    address.val("");
}

//-------------- Carga formulario de compra --------------
btnOpenWindowOrder.addEventListener('click', function() {
    formOrderContainer.classList.remove("pop--hidden");
    formOrderContainer.classList.add("pop--unhidden");

    let userLogged = localStorage.getItem("users-logged-in");
    if(userLogged != null){
        let userData = JSON.parse(localStorage.getItem("users-logged-in"));
        setInputs(userData);
    }
});


//--------------- Mensaje de pedido creado ---------------------
  function showAlert() {
    let alerta = document.getElementById('alert');
    alerta.innerHTML = '¡Gracias por tu pedido! Favor de estar pendiente de tu correo donde recibirás los detalles. ✉️';
    alerta.style.display = 'block';

    setTimeout(function() {
        alerta.style.display = 'none';
      }, 4000);
  }

//------------- Crear orden -------------
const clearInputs = (name, email, phone, address) =>{
    name.val("");
    email.val("");
    phone.val("");
    address.val("");
}

//--------------- Funcion para crear Objeto de compra cuando presione boton Crear Orden ---------
const createUserOrder = () => {
    const name = $("#input-name-order");
    const email = $("#input-email-order");
    const phone = $("#input-phone-order");
    const address = $("#input-address-order");
    const urlOrder = 'http://localhost:8080/products/buy';
    const userOrder = {
        user: {
            "name": name.val(),
            "email": email.val(),
            "phone": phone.val(),
            "address": address.val() 
        },
        products: userCartProducts
    };

    console.log(userOrder)
    //sessionStorage.setItem("purchase-order", JSON.stringify(userOrder));

    fetch(urlOrder, {
        method: 'PUT',
        body: JSON.stringify(userOrder), // Enviando orden a end-Point /Buy de Backend
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Message:', response));

    clearInputs(name, email, phone, address);
    showAlert();
    deleteShoppingCart();
    hiddenWindowOrder();
} 
