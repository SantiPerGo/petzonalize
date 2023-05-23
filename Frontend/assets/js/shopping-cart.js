const productsListContainer = document.getElementById("products-list");
let userCartProducts = JSON.parse(localStorage.getItem("shopping-cart"));
const notFountContainer = document.querySelector(".list-not-found");

const emptyCart = () => {
    const emptyCartButton = document.getElementById('empty-cart');
    const createOrder = document.getElementById('create-order');

    emptyCartButton.disabled = true;
    createOrder.disabled = true;

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
         <img class="productimage" src="${product.properties.material}" alt="">
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
                    <div class="col col-6">
                        <div class="col-color">
                            <div class="rounded-circle mx-auto" style="height: 2.62em; width: 2.62em; background-color: ${product.properties.color}; ">
                            </div>
                            <p>Color</p>
                        </div>
                    </div>
                    <div class="col col-6">
                        <div class="col-material">
                            <div class="rounded-circle mx-auto" style="height: 2.62em; width: 2.62em; overflow: hidden; ">
                                <img width="100%" height="auto" src="${product.properties.pattern}" >
                            </div>
                            <p>Estampado</p>
                        </div>
                    </div>
                    <div class="col col-12">
                        <div class="col-size">
                            <p>${product.properties.size}</p>
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
