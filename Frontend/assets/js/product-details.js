// *********************************************************************************
// Getting product info from local storage
// *********************************************************************************

// Loading product data into the page
$(document).ready(() => {
  const product = JSON.parse(sessionStorage.getItem("product"));

  if (product !== undefined && product !== null) {
    if (product.customizable === true){
      $("#product-custom").removeClass("d-none");
      $("#product-not-custom").addClass("d-none");
    } else {
      $("#product-custom").addClass("d-none");
      $("#product-not-custom").removeClass("d-none");
    };
    $("#product-img").attr("src", product.imgUrl);
    $("#product-img").attr("alt", product.name);
    $("#product-name").text(product.name);

    if (product.customizable === false)
      $("#product-description").text(product.description);
  } else {
    console.error("product doesnt exist");
    
  }
});
