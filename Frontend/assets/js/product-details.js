// *********************************************************************************
// Getting product info from local storage
// *********************************************************************************

// Loading product data into the page
$(document).ready(() => {
  const product = JSON.parse(sessionStorage.getItem("product"));

  if (product !== undefined && product !== null) {
    $("#product-img").attr("src", product.imgUrl);
    $("#product-img").attr("alt", product.name);
    $("#product-name").text(product.name);

    if (product.customizable === false)
      $("#product-description").text(product.description);
  } else {
    console.error("product doesnt exist");
  }
});

$(document).ready(() => {
  const product = JSON.parse(sessionStorage.getItem("product"));
  if (product.customizable === true) {
    document.getElementById("material-row").style.visibility = "visible";
  } else {
    document.getElementById("material-row").style.visibility = "hidden";

  }
});
