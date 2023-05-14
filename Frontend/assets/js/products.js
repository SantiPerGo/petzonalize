const createProductsCards = products => {
    // Ordering products by name
    products.sort((a, b) => a.name.localeCompare(b.name));

    // Creating card for each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const id = product.category.includes("customizable") ? "product-custom" : "product-not-custom" ;

      // Cloning html element
      const card = $(`#${id}`).clone().appendTo('#products-div');
      card.removeClass("d-none");

      // Changing id
      card.attr('id', `${id}-${i+1}`);

      // Changing id number of item
      card.find('[id*="product-img"]').attr('id', `${id}-img-${i+1}`);
      card.find('[id*="product-name"]').attr('id', `${id}-name-${i+1}`);
      card.find('[id*="product-price"]').attr('id', `${id}-price-${i+1}`);
      
      // Showing user data
      card.find(`[id*="${id}-img-${i+1}"]`).attr('src', product.imgUrl);
      card.find(`[id*="${id}-img-${i+1}"]`).attr('alt', product.name);
      card.find(`[id*="${id}-name-${i+1}"]`).text(product.name);

      const price = product.price === undefined ? "Variable" : `$${product.price}`;
      card.find(`[id*="${id}-price-${i+1}"]`).text(price);
    }

    // Deleting default card items
    $("#product-custom").remove();
    $("#product-not-custom").remove();
};

const loadProducts = async intervalId => {
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
            product.category !== "customizable-custome" &&
            product.category !== "customizable-pattern");

        products = products.concat(productsArray);
      });
  } catch (error) {
    console.log("Customizable products error: ", error);
    customProductsLoaded = false;
  }

  // Hiding loading animation
  $("#loading-anim").remove()

  // Stopping loading text
  clearInterval(intervalId);

  // Loading error page or products
  if(!productsLoaded && !customProductsLoaded) {
    $("#row-error").removeClass("d-none");
    $("#row-products").addClass("d-none");
  } else 
    createProductsCards(products);
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