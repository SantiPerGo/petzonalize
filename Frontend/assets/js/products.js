const loadProducts = (products, id) => {
    // Ordering products by name
    products.sort((a, b) => a.name.localeCompare(b.name));

    // Creating card for each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
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
      card.find(`[id*="${id}-price-${i+1}"]`).text(product.price);
    }

    // Deleting default card item
    $(`#${id}`).remove();
};

// Loading products in cards
$(document).ready(() => {
  // Start loading text in carousel
  let loadingTime = 0;
  const intervalId = setInterval(() => {
    loadingTime = ++loadingTime % 4;
    $("#loading").html("loading"+Array(loadingTime+1).join("."));
  }, 500);

  $.getJSON("../json/products.json",
    productsJson => loadProducts(productsJson.products, "product-not-custom"))
      .fail(() => console.log("Error has occurred with the json"));

  $.getJSON("../json/products-customizable.json", productsJson => {
      let products = productsJson["products-customizable"];

      // Removing duplicates
      products = products.filter((product, index, array) => 
        array.findIndex(product2 => 
          product2.category === product.category) === index &&
          product.category !== "customizable-custome");

      loadProducts(products, "product-custom");
    })
      .fail(() => console.log("Error has occurred with the json"));

  // Hiding loading animation
  $("#loading-anim").remove()

  // Stopping loading text
  clearInterval(intervalId);
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