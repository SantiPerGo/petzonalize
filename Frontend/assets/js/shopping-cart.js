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
        product = `  <----- HTML de producto ---->     `;

        productsListContainer.innerHTML += product;
    }
}

getUserProductsInStorage();

//---------------- ejemplo ----------------------------------------------
let product = `<!------- Item ${index} ------->
        <div class="product-box my-4 bg-beige">
           <div class="row justify-content-center">
            <!--------- Columna de Imagen Producto--------->
            <div class="col col-lg-4">
                <div>
                    <img src="${userCartProducts[index].imgUrl}" alt="">
                </div>
            </div>
            <!------- Columna Informacion de Producto-------->
            <div class="col col-lg-8">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-12">
                        <h4>${ userCartProducts[index].name }</h4>
                    </div>
                    <div class="col col-lg-12">
                        <p>${userCartProducts[index].description}</p>
                    </div>
                    <div class="col-12 col-lg-12">
                        <div class="row justify-content-center">
                            <div class="col col-lg-6 col-sm-12">
                                <p>Precio Individual: $<span>${userCartProducts[index].price}</span></p>
                            </div>
                            <div class="col col-lg-6 col-sm-12">
                                <p>Cantidad <span>${userCartProducts[index].amount}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            </div>
        </div>`;