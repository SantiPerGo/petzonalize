// *********************************************************************************
// Getting product info from local storage
// *********************************************************************************

// Loading product data into the page
$(document).ready(() => {
  const product = JSON.parse(sessionStorage.getItem("product"));

  if (product !== undefined && product !== null) {
    const customProductForm = $("#product-custom");
    const productForm = $("#product-not-custom");

    if (product.customizable === true){
      customProductForm.removeClass("d-none");
      productForm.addClass("d-none");

      customProductForm.find('[id*="product-img"]').attr("src", product.imgUrl);
      customProductForm.find('[id*="product-img"]').attr("alt", product.name);
      customProductForm.find('[id*="product-name"]').text(product.name);
    } else {
      customProductForm.addClass("d-none");
      productForm.removeClass("d-none");

      productForm.find('[id*="product-img"]').attr("src", product.imgUrl);
      productForm.find('[id*="product-img"]').attr("alt", product.name);
      productForm.find('[id*="product-name"]').text(product.name);
      productForm.find('[id*="product-description"]').text(product.description);
    };

    sessionStorage.removeItem("product");
  } else
    window.location.href = 'products.html';
});

let input = document.querySelector(".circle");
input.addEventListener("mouseover", aplicarFocus);

function aplicarFocus() {
  input.focus();
}
