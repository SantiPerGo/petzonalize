// *********************************************************************************
// Getting product info from local storage and starting color picker
// *********************************************************************************

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
        sliderType: 'hue'
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

const petDataForm = $("#pet-data-form");
const petBowlDataForm = $("#pet-bowl-data-form");
let product;

$(document).ready(() => {
  // Forms validation
  validateForm(petDataForm);
  validateForm(petBowlDataForm);
  petDataForm.change(() => $("#reset-pet-data").removeClass("d-none"));
  petBowlDataForm.change(() => $("#reset-pet-bowl-data").removeClass("d-none"));
  $("#name").on("input", () => $("#product-nameplate-name").text($("#name").val()));
  $("#phone").on("input", () => $("#product-nameplate-phone").text($("#phone").val()));
  $("#bowl-name").on("input", () => $("#product-bowl-name").text($("#bowl-name").val()));

  // Resizing color picker on window size change
  jQuery(window).resize(() => {
    const currentWidth = jQuery(window).width();
    colorWheel.resize(currentWidth/4);
  });

  // when the user has changed color in the color picker
  colorWheel.on('input:change', color => {
    $(":root").css("--color-picker", colorWheel.color.hslaString);
    $(":root").css("--color-filter", `hue-rotate(${colorWheel.color.hue}deg) opacity(${colorWheel.color.alpha})`);
    $("#reset-color-wheel").removeClass("d-none");
  })

  // Loading product data into the page
  product = JSON.parse(sessionStorage.getItem("product"));

  if (product !== undefined && product !== null) {
    const customProductForm = $("#product-custom");
    const productForm = $("#product-not-custom");

    if (product.customizable === true){
      customProductForm.removeClass("d-none");
      productForm.addClass("d-none");

      $("#product-name").text(product.name);
      $(":root").css("--img-mask", `url(${product.imgUrl})`);

      if(product.category === "collar" || product.category === "bowl" || product.category === "nameplate") {
        $("#product-img-div").removeClass("d-none");
        $("#size-container").removeClass("d-none");
        $("#color-container").removeClass("d-none");
        $("#pattern-container").removeClass("d-none");
        $("#product-img").attr("src", product.imgUrl);
        $("#product-img").attr("alt", product.name);
        $("#product-img-container").removeClass("d-none");

        if(product.category === "collar") {
          $("#collar-container").removeClass("d-none");
        } else if(product.category === "bowl") {
          $("#bowl-container").removeClass("d-none");
          $("#pet-bowl-data-container").removeClass("d-none");
        } else {
          $("#product-nameplate-container").removeClass("d-none");
          $("#shape-container").removeClass("d-none");
          $("#pet-data-container").removeClass("d-none");
        }
      } else {
        $("#product-custome").attr("src", product.imgUrl);
        $("#product-custome").attr("alt", product.name);
        $("#pet-container").removeClass("d-none");
        $("#product-custome-container").removeClass("d-none");
        $("#custome-head-container").removeClass("d-none");
        $("#custome-body-container").removeClass("d-none");
      }
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

// *********************************************************************************
// Category buttons functions
// *********************************************************************************

const updatePattern = patternElement => {
  updateNotSelectedElements(patternElement);
  $(":root").css("--bg-image", `url(${$(patternElement).children().attr("src")})`);
  $("#reset-pattern").removeClass("d-none");
};

const resetColorWheel = () => {
  colorWheel.reset();
  $(":root").css("--color-picker", "none");
  $(":root").css("--color-filter", "none");
  $("#reset-color-wheel").addClass("d-none");
};

const resetPattern = () => {
  $(":root").css("--bg-image", "none");
  const selectedElement = $("#pattern-div").find('[class*="is-selected"]');
  selectedElement.addClass("is-not-selected");
  selectedElement.removeClass("is-selected");
  $("#reset-pattern").addClass("d-none");
};

const resetPetData = () => {
  $("#reset-pet-data").addClass("d-none");
  petDataForm.find('input').each((key, input) => resetInput(input));
  $("#product-nameplate-name").text("");
  $("#product-nameplate-phone").text("");
}

const resetPetDataBowl = () => {
  $("#reset-pet-bowl-data").addClass("d-none");
  petBowlDataForm.find('input').each((key, input) => resetInput(input));
  $("#product-bowl-name").text("");
}

const resetInput = input => {
  $(input).val("");
  $(input).removeData("previousValue");
  $(input).removeAttr("aria-invalid");
  $(input).removeClass("valid");
  $(input).removeClass("invalid");
  $(input).removeClass("input-icon-valid");
  $(input).removeClass("input-icon-invalid");
  $(`#${input.id}-error`).remove();
};

const updateProductImg = selectedElement => {
  // Showing blue border on hover of not selected elements
  updateNotSelectedElements(selectedElement);

  // Changing product img
  const imgUrl = $(selectedElement).children().attr("src");
  $("#product-img").attr("src", imgUrl);
  $(":root").css("--img-mask", `url(${imgUrl})`);

  // Changing text colors
  updateText($(`#${$(selectedElement).attr("id")}-text`));
};

const updatePetImg = selectedElement => {
  updateProductImg(selectedElement);

  // Changing pet img
  const imgUrl = $(selectedElement).children().attr("src");
  $("#product-custome").attr("src", imgUrl);
};

const updateNotSelectedElements = selectedElement => {
  // Showing blue border on hover of not selected elements
  $(selectedElement).parent().find(".is-selected").each((index, selectedElement) => {
    $(selectedElement).removeClass("is-selected");
    $(selectedElement).addClass("is-not-selected");
  });

  // Showing purple border of selected element
  $(selectedElement).addClass("is-selected");
  $(selectedElement).removeClass("is-not-selected");
};

const updateText = selectedText => {
  jQuery(".is-selected-text").each((index, selectedText) => {
    $(selectedText).removeClass("is-selected-text");
    $(selectedText).addClass("is-not-selected-text");
  });

  $(selectedText).addClass("is-selected-text");
  $(selectedText).removeClass("is-not-selected-text");
};

const updateCustome = (selectedElement, id) => {
  // Showing blue border on hover of not selected elements
  updateNotSelectedElements(selectedElement);

  // Changing product img
  const imgUrl = $(selectedElement).children().attr("src");
  $(`#product-${id}`).removeClass("d-none");
  $(`#product-${id}`).attr("src", imgUrl);
  $(`#reset-${id}`).removeClass("d-none");

  const custome = searchCustomeInProducts(selectedElement);
  if(custome.type.includes("head")) {
    $(":root").css("--head-size", custome.cssProperties[`${product.type}-size`]);
    $(":root").css("--head-top", custome.cssProperties[`${product.type}-top`]);
    $(":root").css("--head-right", custome.cssProperties[`${product.type}-right`]);
  } else {
    $(":root").css("--body-size", custome.cssProperties[`${product.type}-size`]);
    $(":root").css("--body-top", custome.cssProperties[`${product.type}-top`]);
    $(":root").css("--body-right", custome.cssProperties[`${product.type}-right`]);
  }
};

const resetCustome = id => {
  $(`#product-${id}`).addClass("d-none");
  $(`#reset-${id}`).addClass("d-none");
  const selectedElement = $(`#custome-${id}-div`).find('[class*="is-selected"]');
  selectedElement.addClass("is-not-selected");
  selectedElement.removeClass("is-selected");
};

const searchCustomeInProducts = selectedElement => {
  const productsJson = sessionStorage.getItem("customes");

  if(products !== null) {
    const products = JSON.parse(productsJson);
    const custome = products.filter(product => product.type !== undefined &&
      product.type === $(selectedElement).children().attr("alt"));
    return custome[0];
  }

  return null;
};

// *********************************************************************************
// Buy and return buttons
// *********************************************************************************

const productQuantity = $("#product-quantity");
const increaseButton = $("#increase");
const decreaseButton = $("#decrease");

increaseButton.click(() => {
  let value = parseInt(productQuantity.val());

  if(isNaN(value))
    value = 1;
  else {
    value++;
    decreaseButton.prop('disabled', false);

    if((getShoppingCartLength() + value) >= 10)
      increaseButton.prop('disabled', true);
  } 

  productQuantity.val(value);
});

decreaseButton.click(() => {
  let value = parseInt(productQuantity.val());

  if(isNaN(value) || (value <= 2)) {
    value = 1;
    decreaseButton.prop('disabled', true);
  } else {
    increaseButton.prop('disabled', false);
    value--;
  }

  productQuantity.val(value);
});

const buyButton = $("#product-buy");
const returnButton = $("#product-return");
const quantityGroup = $("#quantity-group");

buyButton.on('click', () => showQuantityButtons());

returnButton.on('click', () => {
  if(getShoppingCartLength() >= 10) {
    buyButton.prop('disabled', true);
    returnButton.text("¡Carrito Lleno!");
    returnButton.on('click', () => window.location.href = 'products.html');
  } else       
    window.location.href = 'products.html';
});

const showQuantityButtons = () => {
  
  quantityGroup.removeClass("d-none");
  buyButton.text("Aceptar");
  returnButton.text("Cancelar");

  const shoppingCartLength = getShoppingCartLength();

  if(shoppingCartLength >= 9) {
    increaseButton.prop('disabled', true);
  } else
    increaseButton.prop('disabled', false);

  if(shoppingCartLength >= 10) {
    buyButton.prop('disabled', true);
    quantityGroup.addClass("d-none");
    buyButton.text("¡Carrito Lleno!");
    returnButton.text("Regresar");   
    returnButton.on('click', () => window.location.href = 'products.html');
  }

  buyButton.off('click');
  buyButton.on('click', () => {
    buyButton.prop('disabled', true);
    quantityGroup.addClass("d-none");
    returnButton.text("Regresar");  
    returnButton.on('click', () => window.location.href = 'products.html'); 

    if(shoppingCartLength < 10 && (shoppingCartLength + parseInt(productQuantity.val())) <= 10) {
      addProductsToCart(product, parseInt(productQuantity.val()));
      buyButton.text("¡Agregado al Carrito!");
    } else 
      buyButton.text("¡Carrito Lleno!");
  });

  returnButton.off('click');
  returnButton.on('click', () => {
    quantityGroup.addClass("d-none");
    productQuantity.val("1");
    buyButton.text("Comprar");
    returnButton.text("Regresar");
    decreaseButton.prop('disabled', true);

    buyButton.off('click');
    buyButton.on('click', () => showQuantityButtons());
    
    returnButton.off('click');
    returnButton.on('click', () => {
      if(shoppingCartLength >= 10) {
        buyButton.prop('disabled', true);
        quantityGroup.addClass("d-none");
        buyButton.text("¡Carrito Lleno!");
        returnButton.text("Regresar");  
        returnButton.on('click', () => window.location.href = 'products.html');
      } else       
        window.location.href = 'products.html';
    });
  });
};

const getShoppingCartLength = () => {
  const shoppingCart = localStorage.getItem("shopping-cart");
  if(shoppingCart !== null)
    return JSON.parse(shoppingCart)[0].total;
  else
    return 0;
};

const addProductsToCart = (product, quantity) => {
  const shoppingCart = localStorage.getItem("shopping-cart");
  const products = shoppingCart !== null ? JSON.parse(shoppingCart) : [{total: 0}];

  // Adding product with new property to the shopping cart
  product["amount"] = quantity;

  if(product.category === "collar" || product.category === "bowl" || product.category === "nameplate") {
    product.properties.color = colorWheel.color.hslaString;
    product.properties.size = $("#size-container").find(".is-selected-text").children().text();
    product.properties.pattern = $("#pattern-div").find(".is-selected").children().attr("src");

    if(product.category === "collar")  {
      product.imgUrl = $("#collar-container").find(".is-selected").children().attr("src");
      product.properties.material = $("#collar-container").find(".is-selected").children().attr("src");
    } else if(product.category === "bowl") {
      product.imgUrl = $("#bowl-container").find(".is-selected").children().attr("src");
      product.properties.material = $("#bowl-container").find(".is-selected").children().attr("src");
      product.properties.petname = $("#bowl-name").val();
    } else if(product.category === "nameplate") {
      product.imgUrl = $("#shape-container").find(".is-selected").children().attr("src");
      product.properties.shape = $("#shape-container").find(".is-selected").children().attr("src");
      product.properties.petname = $("#name").val();
      product.properties.petphone = $("#phone").val();
    } 
  } else {
    product.properties.body = $("#custome-body-div").find(".is-selected").children().attr("src");
    product.properties.head = $("#custome-head-div").find(".is-selected").children().attr("src");
  }

  // Adding product to the cart
  products.push(product);
  products[0].total += quantity;

  localStorage.setItem("shopping-cart", JSON.stringify(products));
  
  const shoppingCartCounter = $("#shopping-cart-counter");
  shoppingCartCounter.text(products[0].total);
  shoppingCartCounter.removeClass("d-none");
};