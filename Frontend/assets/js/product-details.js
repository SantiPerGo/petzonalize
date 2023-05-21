// *********************************************************************************
// Getting product info from local storage and starting color picker
// *********************************************************************************

$(document).ready(() => {
  // Starting color picker
  const colorWheel = new iro.ColorPicker("#colorWheelDemo", {
    layout: [
      { 
        component: iro.ui.Wheel,
        options: {
          wheelLightness: true,
          wheelDirection: "anticlockwise"
        } 
      },
      {
        component: iro.ui.Slider,
        options: {
          sliderType: 'alpha'
        }
      }
    ]
  });

  // Resizing color picker on window size change
  jQuery(window).resize(() => {
    const currentWidth = jQuery(window).width();
    colorWheel.resize(currentWidth/4);
  });

  // when the user has changed color in the color picker
  colorWheel.on('input:change', color => $(":root").css("--color-picker", colorWheel.color.hslaString))

  // Loading product data into the page
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

    // sessionStorage.removeItem("product");
  } else
    window.location.href = 'products.html';
});