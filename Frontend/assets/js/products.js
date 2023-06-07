// *********************************************************************************
// Load product card
// *********************************************************************************

const createProductsCards = products => {
  // Ordering products by name
  products.sort((a, b) => a.name.localeCompare(b.name));

  // Creating card for each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const id = product.customizable === true ? "product-custom" : "product-not-custom";

    // Cloning html element
    const card = $(`#${id}`).clone().appendTo('#row-products');
    card.removeClass("d-none");

    // Changing id
    card.attr('id', `${id}-${i + 1}`);

    // Showing user data
    card.find('[id*="product-img"]').attr('src', product.imgUrl);
    card.find('[id*="product-img"]').attr('alt', product.name);
    card.find('[id*="product-name"]').text(product.name);
    const stock = product.stock === undefined ? "Variable" : product.stock;
    card.find('[id*="product-stock"]').text(stock);
    const price = product.price === undefined ? "Variable" : `$${product.price}`;
    card.find('[id*="product-price"]').text(price);

    if (product.customizable === false) {
      let user = localStorage.getItem("users-logged-in");
      const editIcon = card.find('[id*="product-edit"]');

      if (user != null) {
        user = JSON.parse(user);

        if (user.privileges === "admin") {
          editIcon.removeClass("d-none");
          editIcon.click(() => {
            sessionStorage.setItem("product", JSON.stringify(product));
            window.location.href = 'product-form.html';
          });
        }
      }

      // Adding increase and decrease buttons methods
      const increaseButton = card.find('[id*="increase"]');
      const decreaseButton = card.find('[id*="decrease"]');

      increaseButton.click(() => {
        let value = parseInt(productQuantity.val());

        if (isNaN(value))
          value = 1;
        else {
          value++;
          decreaseButton.prop('disabled', false);

          if (value >= stock || (getShoppingCartLength() + value) >= 10)
            increaseButton.prop('disabled', true);
        }

        productQuantity.val(value);
      });

      decreaseButton.click(() => {
        let value = parseInt(productQuantity.val());

        if (isNaN(value) || (value <= 2)) {
          value = 1;
          decreaseButton.prop('disabled', true);
        } else {
          increaseButton.prop('disabled', false);
          value--;
        }

        productQuantity.val(value);
      });

      // Adding buy and see more buttons methods
      const buyButton = card.find('[id*="product-buy"]');
      const seeProductButton = card.find('[id*="product-see-more"]');
      const quantityGroup = card.find('[id*="quantity-group"]');
      const productQuantity = card.find('[id*="product-quantity"]');

      buyButton.on('click', () => showQuantityButtons(product, buyButton, seeProductButton,
        quantityGroup, productQuantity, increaseButton, decreaseButton));
      seeProductButton.on('click', () => {
        if (getShoppingCartLength() >= 10) {
          buyButton.prop('disabled', true);
          seeProductButton.prop('disabled', true);
          seeProductButton.text("¡Carrito Lleno!");
        } else
          saveProductInStorage(product);
      });
    } else {
      const buyButton = card.find('[id*="product-buy"]');
      const seeProductButton = card.find('[id*="product-see-more"]');

      card.find('[id*="product-see-more"]').click(() => {
        if (getShoppingCartLength() >= 10) {
          buyButton.prop('disabled', true);
          seeProductButton.prop('disabled', true);
          seeProductButton.text("¡Carrito Lleno!");
        } else
          saveProductInStorage(product);
      });
    }
  }

  // Deleting default card items
  $("#product-custom").remove();
  $("#product-not-custom").remove();
};

const showQuantityButtons = (product, buyButton, seeProductButton,
  quantityGroup, productQuantity, increaseButton, decreaseButton) => {

  quantityGroup.removeClass("d-none");
  buyButton.text("Aceptar");
  seeProductButton.text("Cancelar");

  const shoppingCartLength = getShoppingCartLength();

  if (shoppingCartLength >= 9) {
    increaseButton.prop('disabled', true);
  } else
    increaseButton.prop('disabled', false);

  if (shoppingCartLength >= 10) {
    buyButton.prop('disabled', true);
    seeProductButton.prop('disabled', true);
    quantityGroup.addClass("d-none");
    buyButton.text("¡Carrito Lleno!");
    seeProductButton.text("Ver más");
  }

  buyButton.off('click');
  buyButton.on('click', () => {
    buyButton.prop('disabled', true);
    seeProductButton.prop('disabled', true);
    quantityGroup.addClass("d-none");

    if (shoppingCartLength < 10 && (shoppingCartLength + parseInt(productQuantity.val())) <= 10) {
      addProductsToCart(product, parseInt(productQuantity.val()));
      buyButton.text("¡Agregado al Carrito!");
    } else {
      buyButton.text("¡Carrito Lleno!");
      seeProductButton.text("Ver más");
    }
  });

  seeProductButton.off('click');
  seeProductButton.on('click', () => {
    quantityGroup.addClass("d-none");
    productQuantity.val("1");
    buyButton.text("Comprar");
    seeProductButton.text("Ver más");
    decreaseButton.prop('disabled', true);

    buyButton.off('click');
    buyButton.on('click', () => showQuantityButtons(product, buyButton, seeProductButton,
      quantityGroup, productQuantity, increaseButton, decreaseButton));

    seeProductButton.off('click');
    seeProductButton.on('click', () => {
      if (shoppingCartLength >= 10) {
        buyButton.prop('disabled', true);
        seeProductButton.prop('disabled', true);
        quantityGroup.addClass("d-none");
        buyButton.text("¡Carrito Lleno!");
        seeProductButton.text("Ver más");
      } else
        saveProductInStorage(product);
    });
  });
};

const showErrorPage = state => {
  if (state) {
    $("#row-error").removeClass("d-none");
    $("#row-products").addClass("d-none");
  } else {
    $("#row-error").addClass("d-none");
    $("#row-products").removeClass("d-none");
  }
};

const getShoppingCartLength = () => {
  const shoppingCart = localStorage.getItem("shopping-cart");
  if (shoppingCart !== null)
    return JSON.parse(shoppingCart)[0].total;
  else
    return 0;
};

// *********************************************************************************
// Save product details in local storage
// *********************************************************************************

const saveProductInStorage = product => {
  sessionStorage.setItem("product", JSON.stringify(product));
  window.location.href = "./product-details.html";
  clearProductFilters();
};

const addProductsToCart = (product, quantity) => {
  const shoppingCart = localStorage.getItem("shopping-cart");
  const products = shoppingCart !== null ? JSON.parse(shoppingCart) : [{ total: 0 }];

  // Adding product with new property to the shopping cart
  product["amount"] = quantity;
  products.push(product);
  products[0].total += quantity;

  localStorage.setItem("shopping-cart", JSON.stringify(products));

  const shoppingCartCounter = $("#shopping-cart-counter");
  shoppingCartCounter.text(products[0].total);
  shoppingCartCounter.removeClass("d-none");
};

// *********************************************************************************
// Get products from json files
// *********************************************************************************

const getProductsFromJson = async () => {
  let productsLoaded = true, customizablesLoaded = true;
  let products = [], customizables = [], sizes = [];

  // Obtaining products by Get Method
  try {
    await $.getJSON("http://petzonalize.up.railway.app/products",
      (productsJson)=>{
        products = productsJson;
        console.log(products);
      });
  } catch (error) {
    console.log("Not products error: ", error);
    productsLoaded = false;
  }

  // Obtaning customizables properties by Get Method
  try {
    await $.getJSON("https://petzonalize.up.railway.app/customizables",
      customizablesJson => {
        console.log(customizablesJson);
        customizables = customizablesJson;
      });
  } catch (error) {
    console.log("Not customizables error: ", error);
    customizablesLoaded = false;
  }

  // Obtaining customizables sizes by Get Method
  try {
    await $.getJSON("http://petzonalize.up.railway.app/sizes",
      sizesJson => {
        console.log(sizesJson);
        sizes = sizesJson;
      });
  } catch (error) {
    console.log("Not sizes error: ", error);
    customizablesLoaded = false;
  }


  return [products, customizables, sizes, productsLoaded && customizablesLoaded];
};

// *********************************************************************************
// Create product cards from json files
// *********************************************************************************

const loadProducts = async intervalId => {
  const [products, customizables, sizes, productsHasLoaded] = await getProductsFromJson();

  // Hiding loading animation
  $("#loading-anim").remove()

  // Stopping loading text
  clearInterval(intervalId);

  // Loading error page or products
  if (!productsHasLoaded) {
    showErrorPage(true);

    // Deleting default card items
    $("#product-custom").remove();
    $("#product-not-custom").remove();
  } else {
    createProductsCards(products);
    sessionStorage.setItem("products", JSON.stringify(products));
    sessionStorage.setItem("customizables", JSON.stringify(customizables));
    sessionStorage.setItem("sizes", JSON.stringify(sizes));

    // Getting filter if exists
    const petFilter = sessionStorage.getItem("pet-filter");

    if (petFilter !== null) {
      const productsArray = [];
      savePropertyObjectInArray(petFilter, productsArray);
      applyProductFilters(productsArray);

      // Showing filters
      $(`#chbox-${petFilter}`).prop('checked', true);
      toggle();

      // Deleting session storage
      sessionStorage.removeItem("pet-filter");
    }
  }
};

// *********************************************************************************
// Start loading animation and load products
// *********************************************************************************

// Loading products in cards
$(document).ready(() => {
  // Start loading text in carousel
  let loadingTime = 0;
  const intervalId = setInterval(() => {
    loadingTime = ++loadingTime % 4;
    $("#loading").html("loading" + Array(loadingTime + 1).join("."));
  }, 500);

  loadProducts(intervalId);
});

// *********************************************************************************
// Change cards sizes when filter button is pressed
// *********************************************************************************

// Function to toggle cards sizes
const toggleCards = (classOne, classTwo) => {
  const cards = $(".products");

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.classList.toggle(classOne);
    card.classList.toggle(classTwo);
  }
};

// Function to toggle filters and cards sizes
const toggle = () => {
  const slideElement = $("#slide");

  // Showing or hiding filters
  slideElement.toggleClass("show");

  $("#create-product").toggleClass("d-none");
  $("#search-container").toggleClass("col-md-4 col-lg-6");
  $("#search-container").toggleClass("col-md-8 col-lg-9");

  // Changing cards sizes
  toggleCards("col-xl-4", "col-xl-6");
  toggleCards("col-md-6", "col-md-12");
}

// *********************************************************************************
// Filter products
// *********************************************************************************

const filterProducts = (searchValue = "") => {
  const isArray = Array.isArray(searchValue);
  const products = $(".products");
  let productsCounter = products.length;

  for (let i = 0; i < products.length; i++) {
    const card = $(products[i]);
    const cardName = card.find('[id*="product-name"]').text();

    if (isArray && searchValue.find(str => str === cardName) === undefined) {
      productsCounter--;
      card.addClass("d-none");
    } else if (!isArray && !cardName.toLowerCase().includes(searchValue.toLowerCase())) {
      productsCounter--;
      card.addClass("d-none");
    } else
      card.removeClass("d-none");
  }

  if (productsCounter === 0)
    showErrorPage(true);
  else
    showErrorPage(false);
};

// Input search method
const handleSearch = async () => filterProducts($("#search").val());

// Adding method to search input
$('#search').on('input', handleSearch);

const savePropertyObjectInArray = (checkboxName, petsArray = [],
  typesArray = [], categoriesArray = []) => {
  switch (checkboxName) {
    case "perros":
      petsArray.push({
        "key": "type",
        "value": "dog"
      });
      break;
    case "gatos":
      petsArray.push({
        "key": "type",
        "value": "cat"
      });
      break;
    case "petzonalizable":
      typesArray.push({
        "key": "customizable",
        "value": true
      });
      break;
    case "no petzonalizable":
      typesArray.push({
        "key": "customizable",
        "value": false
      });
      break;
    case "alimentos":
      categoriesArray.push({
        "key": "category",
        "value": "food"
      });
      break;
    case "juguetes":
      categoriesArray.push({
        "key": "category",
        "value": "toys"
      });
      break;
    case "limpieza":
      categoriesArray.push({
        "key": "category",
        "value": "cleaning"
      });
      break;
    case "hogar":
      categoriesArray.push({
        "key": "category",
        "value": "supplies"
      });
      break;
    case "salud":
      categoriesArray.push({
        "key": "category",
        "value": "health"
      });
      break;
    case "collares":
      categoriesArray.push({
        "key": "category",
        "value": "collar"
      });
      break;
    case "bowls":
      categoriesArray.push({
        "key": "category",
        "value": "bowl"
      });
      break;
    case "placas":
      categoriesArray.push({
        "key": "category",
        "value": "nameplate"
      });
      break;
    case "disfraces":
      categoriesArray.push({
        "key": "category",
        "value": "pet"
      });
      break;
  }
};

const handleFilters = async () => {
  const checkboxes = $(".form-check-input");
  const petsArray = [], typesArray = [], categoriesArray = [];

  // Getting checked checkboxes value
  checkboxes.each((_, checkbox) => {
    if ($(checkbox).is(":checked"))
      savePropertyObjectInArray($(checkbox).val(), petsArray, typesArray, categoriesArray);
  });

  applyProductFilters(petsArray, typesArray, categoriesArray);
};

const verifyIfProductHasProperties = (product, propertiesArray) => {
  if (propertiesArray.length === 0)
    return true;

  for (let i = 0; i < propertiesArray.length; i++) {
    const propertyObject = propertiesArray[i];
    const productProperty = product[propertyObject.key];

    if (productProperty === propertyObject.value || productProperty === undefined)
      return true;
  }

  return false;
};

const applyProductFilters = (petsArray = [], typesArray = [], categoriesArray = []) => {
  // Applying filters
  if (petsArray.length !== 0 || typesArray.length !== 0 || categoriesArray.length !== 0) {
    const products = JSON.parse(sessionStorage.getItem("products"));
    const filteredProducts = [];

    // Getting names for products filtered
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      if (verifyIfProductHasProperties(product, petsArray) &&
        verifyIfProductHasProperties(product, typesArray) &&
        verifyIfProductHasProperties(product, categoriesArray))
        filteredProducts.push(product.name);
    }

    // Applying filters
    filterProducts(filteredProducts);
  } else
    filterProducts();
};

const clearProductFilters = () => {
  filterProducts();

  const checkboxes = $(".form-check-input");

  // Getting checked checkboxes value
  checkboxes.each((_, checkbox) => {
    if ($(checkbox).is(":checked"))
      $(checkbox).prop('checked', false);
  });
}