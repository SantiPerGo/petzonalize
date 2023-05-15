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
      card.attr('id', `${id}-${i+1}`);
      
      // Showing user data
      card.find('[id*="product-img"]').attr('src', product.imgUrl);
      card.find('[id*="product-img"]').attr('alt', product.name);
      card.find('[id*="product-name"]').text(product.name);

      const price = product.price === undefined ? "Variable" : `$${product.price}`;
      card.find('[id*="product-price"]').text(price);
    }

    // Deleting default card items
    $("#product-custom").remove();
    $("#product-not-custom").remove();
};

const showErrorPage = state => {
  if(state) {
    $("#row-error").removeClass("d-none");
    $("#row-products").addClass("d-none");
  } else {
    $("#row-error").addClass("d-none");
    $("#row-products").removeClass("d-none");
  }
};

const getProductsFromJson = async () => {
  let productsLoaded = true, customProductsLoaded = true;
  let products = [];

  try {
    await $.getJSON("../json/products.json",
    productsJson => products = productsJson.products);
  } catch (error) {
    console.log("Not customizable products error: ", error);
    productsLoaded = false;
  }

  try {
    await $.getJSON("../json/products-customizable.json", productsJson => {
        let productsArray = productsJson["products-customizable"];

        // Removing duplicates and unnecesary products
        productsArray = productsArray.filter((product, index, array) => 
          array.findIndex(product2 => 
            product2.category === product.category) === index &&
            product.category !== "custome" &&
            product.category !== "pattern");

        products = products.concat(productsArray);
      });
  } catch (error) {
    console.log("Customizable products error: ", error);
    customProductsLoaded = false;
  }

  return [products, productsLoaded && customProductsLoaded];
};

const loadProducts = async intervalId => {
  const [products, productsHasLoaded] = await getProductsFromJson();

  // Hiding loading animation
  $("#loading-anim").remove()

  // Stopping loading text
  clearInterval(intervalId);

  // Loading error page or products
  if(!productsHasLoaded)
    showErrorPage(true);
  else {
    createProductsCards(products);
    sessionStorage.setItem("products", JSON.stringify(products));
  }
};

// Loading products in cards
$(document).ready(() => {
  // Start loading text in carousel
  let loadingTime = 0;
  const intervalId = setInterval(() => {
    loadingTime = ++loadingTime % 4;
    $("#loading").html("loading"+Array(loadingTime+1).join("."));
  }, 500);

  loadProducts(intervalId);
});

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
function toggle () {
  // Showing or hiding filters
  $("#slide").toggleClass("show");

  // Changing cards sizes
  toggleCards("col-xl-4", "col-xl-6");
  toggleCards("col-md-6", "col-md-12");
}

// Filtrar productos en la barra de busqueda

const filterProducts = (searchValue = "") => {
  const isArray = Array.isArray(searchValue);
  const products = $(".products");
  let productsCounter = products.length;

  for (let i = 0; i < products.length; i++) {
    const card = $(products[i]);
    const cardName = card.find('[id*="product-name"]').text();

    if(isArray && searchValue.find(str => str === cardName) === undefined) {
      productsCounter--;
      card.addClass("d-none");
    } else if(!isArray && !cardName.toLowerCase().includes(searchValue.toLowerCase())) {
      productsCounter--;
      card.addClass("d-none");
    } else
      card.removeClass("d-none");
  }  

  console.log(productsCounter)

  if(productsCounter === 0)
    showErrorPage(true);
  else
    showErrorPage(false);
};

// Input search method
const handleSearch = async () => filterProducts($("#search").val());

// Adding method to search input
$('#search').on('input', handleSearch);

const getCheckboxObject = (checkboxName, array) => {
  switch(checkboxName) {
    case "perros":
      array.push({
        "key": "type",
        "value" : "dog"
      });
      break;
    case "gatos":
      array.push({
        "key": "type",
        "value" : "cat"
      });
      break;
    case "petzonalizable":
      array.push({
        "key": "customizable",
        "value" : true
      });
      break;
    case "no petzonalizable":
      array.push({
        "key": "customizable",
        "value" : false
      });
      break;
    case "alimentos":
      array.push({
        "key": "category",
        "value" : "food"
      });
      break;
    case "juguetes":
      array.push({
        "key": "category",
        "value" : "toys"
      });
      break;
    case "limpieza":
      array.push({
        "key": "category",
        "value" : "cleaning"
      });
      break;
    case "hogar":
      array.push({
        "key": "category",
        "value" : "supplies"
      });
      break;
    case "salud":
      array.push({
        "key": "category",
        "value" : "health"
      });
      break;
    case "collares":
      array.push({
        "key": "category",
        "value" : "collar"
      });
      break;
    case "bowls":
      array.push({
        "key": "category",
        "value" : "bowl"
      });
      break;
    case "placas":
      array.push({
        "key": "category",
        "value" : "nameplate"
      });
      break;
    case "disfraces":
      array.push({
        "key": "category",
        "value" : "pet-cat"
      });

      array.push({
        "key": "category",
        "value" : "pet-dog"
      });
      break;
  }
};

const handleFilters = async () => {
  const checkboxes = $(".form-check-input");
  const checkboxesArray = [];

  // Getting checked checkboxes value
  checkboxes.each((_, checkbox) => {
    if($(checkbox).is(":checked"))
      getCheckboxObject($(checkbox).val(), checkboxesArray);
  });

  // Applying filters
  if(checkboxesArray.length !== 0) {
    const products = JSON.parse(sessionStorage.getItem("products"));
    const filteredProducts = [];

    // Getting names for products filtered
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      for (let j = 0; j < checkboxesArray.length; j++) {
        const checkboxObject = checkboxesArray[j];
        const productProperty = product[checkboxObject.key];
      
        if(productProperty === checkboxObject.value || productProperty === undefined) {
          filteredProducts.push(product.name);
          break;
        }
      }
    }

    // Applying filters
    filterProducts(filteredProducts);
  } else
    filterProducts();
};

function clearProductFilters() {
  filterProducts();

  const checkboxes = $(".form-check-input");

  // Getting checked checkboxes value
  checkboxes.each((_, checkbox) => {
    if($(checkbox).is(":checked"))
      $(checkbox).prop('checked', false); 
  });
}