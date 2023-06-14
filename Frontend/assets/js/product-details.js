// *********************************************************************************
// *********************************************************************************
// Getting product info from local storage and starting color picker
// *********************************************************************************
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
    if ($(window).width() < 768) {
      const currentWidth = jQuery(window).width();
      colorWheel.resize(currentWidth/1.5);
    } else {
      const currentWidth = jQuery(window).width();
      colorWheel.resize(currentWidth/3.5);
    }
  });

  // when the user has changed color in the color picker
  colorWheel.on('input:change', color => {
    $(":root").css("--color-picker", colorWheel.color.hslaString);
    $("#reset-color-wheel").removeClass("d-none");

    if($("#pattern-container").find(".is-selected")[0] !== undefined)
      $(":root").css("--color-filter",
        `hue-rotate(${colorWheel.color.hue}deg) opacity(${colorWheel.color.alpha})`);
  })

  // Loading product data into the page
  product = JSON.parse(sessionStorage.getItem("product"));

  if (product !== undefined && product !== null) {
    const customProductForm = $("#product-custom");
    const productForm = $("#product-not-custom");

    if (product.customizable === true){
      productForm.removeClass("d-md-flex");

      $("#product-name").text(product.name);
      $("#product-price").text(product.price);
      $(":root").css("--img-mask", `url(${product.imgUrl})`);

      moveElementsInMobile();
      $(window).resize(() => moveElementsInMobile());
      loadCategoriesData();

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
          updateSelectedElement(`${product.category}-${product.properties.material}`);
          $(".collar-size").each((key, element) => $(element).removeClass("d-none"));
        } else if(product.category === "bowl") {
          $("#bowl-container").removeClass("d-none");
          $("#pet-bowl-data-container").removeClass("d-none");
          updateSelectedElement(`${product.category}-${product.properties.material}`);
          $(".bowl-size").each((key, element) => $(element).removeClass("d-none"));

          if(product.properties.material === "ceramic")
            $("#product-bowl-name").css("top", "60%");
          else
            $("#product-bowl-name").css("top", "80%");
        } else {
          $("#product-nameplate-container").removeClass("d-none");
          $("#nameplate-container").removeClass("d-none");
          $("#pet-data-container").removeClass("d-none");
          updateSelectedElement(`${product.category}-${product.properties.shape}`);
          $(".nameplate-size").each((key, element) => $(element).removeClass("d-none"));
        }
      } else {
        $("#product-buy").prop('disabled', true);
        $("#product-custome").attr("src", product.imgUrl);
        $("#product-custome").attr("alt", product.name);
        $("#pet-container").removeClass("d-none");
        $("#product-custome-container").removeClass("d-none");
        $("#custome-head-container").removeClass("d-none");
        $("#custome-body-container").removeClass("d-none");
        updateSelectedElement(`${product.category}-${product.type}`);

        $(window).resize(() => reloadCustomeSizes());
      }
    } else {
      customProductForm.removeClass("d-md-flex");
      $("#product-custom-carousel").addClass("d-none");
      productForm.removeClass("d-none");

      productForm.find('[id*="product-img"]').attr("src", product.imgUrl);
      productForm.find('[id*="product-img"]').attr("alt", product.name);
      productForm.find('[id*="product-name"]').text(product.name);
      productForm.find('[id*="product-price"]').text(product.price);
      productForm.find('[id*="product-description"]').text(product.description);

      updateShoppingCartButtons()
      $(window).resize(() => updateShoppingCartButtons());
    };

    sessionStorage.removeItem("product");
  } else
    window.location.href = 'products.html';
});

const updateShoppingCartButtons = () => {
  const buyNotCustomContainer = $("#buy-not-custom-container");
  const returnNotCustomContainer = $("#return-not-custom-container");
  const quantityContainer = $("#quantity-group-not-custom");
  const desktopContainer = $("#container-desktop");
  const mobileContainer = $("#container-mobile");

  if ($(window).width() < 768) {
    quantityContainer.appendTo(mobileContainer);
    buyNotCustomContainer.appendTo(mobileContainer);
    returnNotCustomContainer.appendTo(mobileContainer);
  } else {
    quantityContainer.appendTo(desktopContainer);
    buyNotCustomContainer.appendTo(desktopContainer);
    returnNotCustomContainer.appendTo(desktopContainer);
  }
};

let hasLoaded = false, isMobile = false;
const moveElementsInMobile = () => {
  // Choosing containers according actual product
  const containers = [];
  if(product.category === "collar" || product.category === "bowl" || product.category === "nameplate") {
    if(product.category === "collar")
      containers.push($("#collar-container"));
    else if(product.category === "bowl") {
      containers.push($("#bowl-container"));
      containers.push($("#pet-bowl-data-container"));
    } else {
      containers.push($("#nameplate-container"));
      containers.push($("#pet-data-container"));
    }

    containers.push($("#size-container"));
    containers.push($("#color-container"));
    containers.push($("#pattern-container"));
  } else {
    containers.push($("#pet-container"));
    containers.push($("#custome-head-container"));
    containers.push($("#custome-body-container"));
  }

  if( ($(window).width() < 768 && !isMobile) || 
    ($(window).width() >= 768 && isMobile) ) {
    hasLoaded = false;
    $(".carousel-item").remove();
  }

  if ($(window).width() < 768 && !hasLoaded) {
    console.log("loaded mobile")
    hasLoaded = true;
    isMobile = true;

    // Resizing color wheel
    const currentWidth = jQuery(window).width();
    colorWheel.resize(currentWidth/1.5);

    $("#hero-container").appendTo('#mobile-container');
    $("#hero-container").addClass("mx-auto");
    
    // Loading categories in the carousel
    containers.forEach(container => {
      const carouselItem = $("#carousel-template").clone().appendTo('#carousel-container');
      carouselItem.removeClass("d-none");
      carouselItem.addClass("carousel-item");
      carouselItem.attr("id", `carousel-${container.attr("id")}`);
      
      container.appendTo(carouselItem);
      container.addClass("w-75");
      container.addClass("mx-auto");

      $(".is-not-selected").removeClass("col-6");
      $(".is-not-selected").addClass("col-12");
      
      $(".is-selected").removeClass("col-6");
      $(".is-selected").addClass("col-12");
    });
    
    // Activating first carousel element
    const firstCarouselItem = $(`#carousel-${product.category}-container`);
    firstCarouselItem.addClass("active");
  } else if(!hasLoaded) {
    console.log("loaded desktop")
    hasLoaded = true;
    isMobile = false;

    // Resizing color wheel
    const currentWidth = jQuery(window).width();
    colorWheel.resize(currentWidth/3.5);

    $("#hero-container").appendTo('#original-hero-container');
    $("#hero-container").removeClass("mx-auto");
    
    // Loading categories in the carousel
    containers.forEach(container => {
      container.appendTo('#original-container');
      container.removeClass("w-75");
      container.removeClass("mx-auto");

      $(".is-not-selected").addClass("col-6");
      $(".is-not-selected").removeClass("col-12");

      $(".is-selected").addClass("col-6");
      $(".is-selected").removeClass("col-12");
    });
  }
};

// *********************************************************************************
// *********************************************************************************
// Function to load customizable images and prices
// *********************************************************************************
// *********************************************************************************

const loadCategoriesData = () => {
  // Loading product options like collars, bowls, nameplates or pets
  const category = product.category;
  let products = JSON.parse(sessionStorage.getItem("products"));
  products = products.filter(product => product.category === category);

  // Loading customizables like customes and patterns
  let customizables = JSON.parse(sessionStorage.getItem("customizables"));

  if(category === "collar" || category === "bowl" || category === "nameplate") {
    // load sizes
    let sizes = JSON.parse(sessionStorage.getItem("sizes"));
    sizes = sizes.filter(size => size.category === category)[0];
    delete sizes["category"];
    delete sizes["id"];
    $.each(sizes, (key, size) => loadSize(key, size));
    
    // load size and pattern
    customizables = customizables.filter(customizable => customizable.category === "pattern");
    customizables.forEach(customizable => loadProduct(customizable, customizable.type));

    if(category === "collar") {
      // load collar images and sizes
      products.forEach(product => loadProduct(product, product.properties.material));
    } else if(category === "bowl") {
      // load bowl images and sizes 
      products.forEach(product => loadProduct(product, product.properties.material));
    } else {
      // load nameplate images and sizes 
      products.forEach(product => loadProduct(product, product.properties.shape));
    }
  } else {
    // load pet, head and body images
    customizables = customizables.filter(customizable =>
      customizable.category === "custome-head" || customizable.category === "custome-body");
    customizables.forEach(customizable => loadProduct(customizable, customizable.type));
    products.forEach(product => loadProduct(product, product.type));
  }
  
  // Removing default items 
  $("#collar-template").remove();
  $("#bowl-template").remove();
  $("#nameplate-template").remove();
  $("#pet-template").remove();
  $("#size-template").remove();
  
  $("#pattern-template").remove();
  $("#custome-head-template").remove();
  $("#custome-body-template").remove();
};

const loadProduct = (product, id) => {
  const element = $(`#${product.category}-template`).clone().appendTo(`#row-${product.category}`);
  $(element).attr("id", `${product.category}-${id}`);

  const nameElement = element.find(`#${product.category}-template-text`);
  $(nameElement).attr("id", `${product.category}-${id}-text`);
  $(nameElement).text(product.name);
 
  const priceElement = element.find(`#${product.category}-template-price`);
  $(priceElement).attr("id", `${product.category}-${id}-price`);
  $(priceElement).text(`$${product.price}`);

  const imgElement = element.find("img");
  $(imgElement).attr("src", product.imgUrl);
  $(imgElement).attr("alt", product.name);
};

const loadSize = (key, size) => {
  const element = $("#size-template").clone().appendTo("#row-size");
  $(element).attr("id", `size-${key}`);

  const nameElement = element.find(`#size-template-text`);
  $(nameElement).attr("id", `size-${key}-text`);
  $(nameElement).text(size);
};

// *********************************************************************************
// *********************************************************************************
// Reset buttons functions
// *********************************************************************************
// *********************************************************************************

const resetColorWheel = () => {
  colorWheel.reset();
  $(":root").css("--color-picker", "none");
  $(":root").css("--color-filter", "none");
  $("#reset-color-wheel").addClass("d-none");
};

const resetPattern = () => {
  $(":root").css("--bg-image", "none");
  $(":root").css("--color-filter", "none");
  const selectedElement = $("#row-pattern").find('[class*="is-selected"]');
  selectedElement.addClass("is-not-selected");
  selectedElement.removeClass("is-selected");
  selectedElement.css("pointer-events", "auto");
  $("#reset-pattern").addClass("d-none");

  // Changing product price
  calculateProductPrice();
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

const resetCustome = id => {
  $(`#product-${id}`).addClass("d-none");
  $(`#reset-${id}`).addClass("d-none");
  const selectedElement = $(`#row-custome-${id}`).find('[class*="is-selected"]');
  selectedElement.addClass("is-not-selected");
  selectedElement.removeClass("is-selected");
  selectedElement.css("pointer-events", "auto");

  // Changing product price
  calculateProductPrice();
};

// *********************************************************************************
// *********************************************************************************
// Update buttons functions
// *********************************************************************************
// *********************************************************************************

const updatePattern = patternElement => {
  updateNotSelectedElements(patternElement);
  $(":root").css("--color-filter", `hue-rotate(${colorWheel.color.hue}deg) opacity(${colorWheel.color.alpha})`);
  $(":root").css("--bg-image", `url(${$(patternElement).find("img").attr("src")})`);
  $("#reset-pattern").removeClass("d-none");

  // Changing product price
  calculateProductPrice();
};

const updateProductImg = selectedElement => {
  // Showing blue border on hover of not selected elements
  updateNotSelectedElements(selectedElement);

  // Changing product img
  const imgUrl = $(selectedElement).find("img").attr("src");
  $("#product-img").attr("src", imgUrl);
  $(":root").css("--img-mask", `url(${imgUrl})`);

  // Changing product price
  calculateProductPrice();
};

const updateBowlImg = selectedElement => {
  updateProductImg(selectedElement);

  if(selectedElement.id === "bowl-ceramic")
    $("#product-bowl-name").css("top", "60%");
  else
    $("#product-bowl-name").css("top", "80%");
};

const updatePetImg = selectedElement => {
  updateProductImg(selectedElement);

  // Changing pet img
  const imgUrl = $(selectedElement).find("img").attr("src");
  $("#product-custome").attr("src", imgUrl);

  reloadCustomeSizes();
};

const updateCustome = (selectedElement, id) => {
  // Showing blue border on hover of not selected elements
  updateNotSelectedElements(selectedElement);

  // Changing product img
  const imgUrl = $(selectedElement).find("img").attr("src");
  $(`#product-${id}`).removeClass("d-none");
  $(`#product-${id}`).attr("src", imgUrl);
  $(`#reset-${id}`).removeClass("d-none");

  reloadCustomeSizes();

  // Changing product price
  calculateProductPrice();
};

const reloadCustomeSizes = () => {
  product.type = $("#pet-container").find(".is-selected").attr('id').replace("pet-", "");
  
  // Resizing images
  let topHeadDifference, rightHeadDifference;
  let topBodyDifference, rightBodyDifference;
  let headWindow, bodyWindow, bodyTop;
  if(product.type === "dog") {
    reloadSizeRatio("head", 2, 1.75);
    reloadSizeRatio("body", 1.5, 1.25);
    topHeadDifference = -15;
    rightHeadDifference = -5;
    topBodyDifference = -15;
    rightBodyDifference = -5;

    headWindow = 0.002 * $(window).width();
    bodyWindow = 0.001 * $(window).width();
    bodyHeadTop = 0.001 * $(window).width();
  } else  {
    reloadSizeRatio("head", 2, 1.75);
    reloadSizeRatio("body", 1.5, 1);
    topHeadDifference = -13;
    rightHeadDifference = -10;
    topBodyDifference = -13;
    rightBodyDifference = -5;
    
    headWindow = 0.0015 * $(window).width();
    bodyWindow = 0.001 * $(window).width();
    bodyHeadTop = 0.001 * $(window).width();
  }

  let head = $("#row-custome-head").find(".is-selected")[0];
  let body = $("#row-custome-body").find(".is-selected")[0];

  if(head !== undefined) {
    head = head.id.replace("custome-head-", "");
    const customeHead = searchCustomeInProducts(head);

    let top = customeHead.cssProperties[`${product.type}Top`];
    let right = customeHead.cssProperties[`${product.type}Right`];
  
    if ($(window).width() < 768) {
      top = parseInt(top.replace("%", "")) + topHeadDifference;
      right = parseInt(right.replace("%", "")) + rightHeadDifference;
    } else {
      top = parseInt(top.replace("%", "")) + headWindow + bodyHeadTop;
      right = parseInt(right.replace("%", "")) + headWindow;
    }
    
    $(":root").css("--head-top", `${top}%`);
    $(":root").css("--head-right", `${right}%`);
  }
  
  if(body !== undefined) {
    body = body.id.replace("custome-body-", "");
    const customeBody = searchCustomeInProducts(body);

    let top = customeBody.cssProperties[`${product.type}Top`];
    let right = customeBody.cssProperties[`${product.type}Right`];

    if ($(window).width() < 768) {
      top = parseInt(top.replace("%", "")) + topBodyDifference;
      right = parseInt(right.replace("%", "")) + rightBodyDifference;
    } else {
      top = parseInt(top.replace("%", "")) + bodyWindow + bodyHeadTop;
      right = parseInt(right.replace("%", "")) + bodyWindow;
    }

    $(":root").css("--body-top", `${top}%`);
    $(":root").css("--body-right", `${right}%`);
  }
};

const searchCustomeInProducts = type => {
  const customizablesJson = sessionStorage.getItem("customizables");

  if(customizablesJson !== null) {
    const customizables = JSON.parse(customizablesJson);
    const custome = customizables.filter(customizable => 
      customizable.type !== undefined && customizable.type === type);
    return custome[0];
  }

  return null;
};

const reloadSizeRatio = (id, ratio, ratioHeight) => {
  const productImg = $("#product-custome");
  const productWidth = productImg.width();
  const productHeight = productImg.height();
  const img = $(`#product-${id}`);

  img.width("");
  img.height("");

  let {width, height} = calculateAspectRatioFit(img.width(),
    img.height()/ratioHeight, productWidth/ratio, productHeight/ratio);

  img.width(width);
  img.height(height);
};

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth*ratio, height: srcHeight*ratio };
};

// *********************************************************************************
// *********************************************************************************
// Common functions
// *********************************************************************************
// *********************************************************************************

const updateSelectedElement = elementId => {
  const productContainer = $(`#${elementId}`);
  productContainer.addClass("is-selected");
  productContainer.removeClass("is-not-selected");
};

const updateNotSelectedElements = selectedElement => {
  // Showing blue border on hover of not selected elements
  $(selectedElement).parent().find(".is-selected").each((index, selectedElement) => {
    $(selectedElement).removeClass("is-selected");
    $(selectedElement).addClass("is-not-selected");
    $(selectedElement).css("pointer-events", "auto");
  });

  // Showing purple border of selected element
  $(selectedElement).addClass("is-selected");
  $(selectedElement).removeClass("is-not-selected");
  $(selectedElement).css("pointer-events", "none");

  const productName = $(selectedElement).find(`#${$(selectedElement).attr('id')}-text`).text();
  $("#product-name").text(productName);
};

const updateText = (...selectedTexts) => {
  jQuery(".is-selected-text").each((index, selectedText) => {
    $(selectedText).removeClass("is-selected-text");
    $(selectedText).addClass("is-not-selected-text");
  });

  selectedTexts.forEach(text => {
    $(text).addClass("is-selected-text");
    $(text).removeClass("is-not-selected-text");
  });
};

const calculateProductPrice = () => {
  let totalPrice = 0;

  $(".is-selected").each((key, selectedElement) => {
    let price = $(selectedElement).find(`#${selectedElement.id}-price`).text()
    price = parseFloat(price.trim().replace("$", ""));
    totalPrice += isNaN(price) ? 0 : price;
  });

  totalPrice = Math.round(totalPrice * 100.0) / 100.0;

  $("#product-price").text(totalPrice);
  product.price = totalPrice;

  if(totalPrice == 0) 
    $("#product-buy").prop('disabled', true);
  else
    $("#product-buy").prop('disabled', false);
};

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

// *********************************************************************************
// *********************************************************************************
// Custom Products Buy and return buttons
// *********************************************************************************
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

buyButton.on('click', () => {
  if(product.category === "collar" || product.category === "bowl"  || product.category === "nameplate") {
    if($("#size-container").find(".is-selected-text")[0] === undefined) {
      const toastElement = $("#toast");
      const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
      const toastBody = $("#toast-body");
      toastBody.text("Debes elegir un tamaño antes de comprar el producto");
      toastElement.addClass("toast-error");
      toastInstance.show();
    } else
      showQuantityButtons();
  } else 
    showQuantityButtons();
});

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

  // Updating some product properties
  updateProductProperties(quantity);

  if(product.category === "collar" || product.category === "bowl" || product.category === "nameplate") {
    product.properties.color = colorWheel.color.hslaString;
    product.properties.size = $("#size-container").find(".is-selected-text").children().text();
    product.properties.pattern = $("#row-pattern").find(".is-selected").find("img").attr("src");

    if(product.category === "collar")  {
      product.properties.material = $("#collar-container").find(".is-selected").attr('id').replace("collar-", "");
    } else if(product.category === "bowl") {
      product.properties.material = $("#bowl-container").find(".is-selected").attr('id').replace("bowl-", "");
      product.properties.petname = $("#bowl-name").val();
    } else if(product.category === "nameplate") {
      product.properties.shape = $("#nameplate-container").find(".is-selected").attr('id').replace("shape-", "");
      product.properties.petname = $("#name").val();
      product.properties.petphone = $("#phone").val();
    } 
  } else {
    product.properties.body = $("#row-custome-body").find(".is-selected").find("img").attr("src");
    product.properties.head = $("#row-custome-head").find(".is-selected").find("img").attr("src");
  }

  // Adding product to the cart
  products.push(product);
  products[0].total += quantity;
  products[0].total = Math.round(products[0].total * 100.0) / 100.0;

  localStorage.setItem("shopping-cart", JSON.stringify(products));
  
  const shoppingCartCounter = $("#shopping-cart-counter");
  shoppingCartCounter.text(products[0].total);
  shoppingCartCounter.removeClass("d-none");
};

const updateProductProperties = quantity => {
  const productContainer = $(`#${product.category}-container`);
  const selectedElement = productContainer.find(".is-selected");
  product.name = selectedElement.find(`#${selectedElement.attr("id")}-text`).text();
  product.imgUrl = selectedElement.find("img").attr("src");
  product["amount"] = quantity;
};

// *********************************************************************************
// *********************************************************************************
// Not Custom Products Buy and return buttons
// *********************************************************************************
// *********************************************************************************

const productQuantityNotCustom = $("#product-quantity-not-custom");
const increaseButtonNotCustom = $("#increase-not-custom");
const decreaseButtonNotCustom = $("#decrease-not-custom");

increaseButtonNotCustom.click(() => {
  let value = parseInt(productQuantityNotCustom.val());

  if(isNaN(value))
    value = 1;
  else {
    value++;
    decreaseButtonNotCustom.prop('disabled', false);

    if((getShoppingCartLength() + value) >= 10)
      increaseButtonNotCustom.prop('disabled', true);
  } 

  productQuantityNotCustom.val(value);
});

decreaseButtonNotCustom.click(() => {
  let value = parseInt(productQuantityNotCustom.val());

  if(isNaN(value) || (value <= 2)) {
    value = 1;
    decreaseButtonNotCustom.prop('disabled', true);
  } else {
    increaseButtonNotCustom.prop('disabled', false);
    value--;
  }

  productQuantityNotCustom.val(value);
});

const buyButtonNotCustom = $("#product-buy-not-custom");
const returnButtonNotCustom = $("#product-return-not-custom");
const quantityGroupNotCustom = $("#quantity-group-not-custom");

buyButtonNotCustom.on('click', () => showQuantityButtonsNotCustom());

returnButtonNotCustom.on('click', () => {
  if(getShoppingCartLength() >= 10) {
    buyButton.prop('disabled', true);
    returnButtonNotCustom.text("¡Carrito Lleno!");
    returnButtonNotCustom.on('click', () => window.location.href = 'products.html');
  } else       
    window.location.href = 'products.html';
});

const showQuantityButtonsNotCustom = () => {
  
  quantityGroupNotCustom.removeClass("d-none");
  buyButtonNotCustom.text("Aceptar");
  returnButtonNotCustom.text("Cancelar");

  const shoppingCartLength = getShoppingCartLength();

  if(shoppingCartLength >= 9) {
    increaseButtonNotCustom.prop('disabled', true);
  } else
    increaseButtonNotCustom.prop('disabled', false);

  if(shoppingCartLength >= 10) {
    buyButtonNotCustom.prop('disabled', true);
    quantityGroupNotCustom.addClass("d-none");
    buyButtonNotCustom.text("¡Carrito Lleno!");
    returnButtonNotCustom.text("Regresar");   
    returnButtonNotCustom.on('click', () => window.location.href = 'products.html');
  }

  buyButtonNotCustom.off('click');
  buyButtonNotCustom.on('click', () => {
    buyButtonNotCustom.prop('disabled', true);
    quantityGroupNotCustom.addClass("d-none");
    returnButtonNotCustom.text("Regresar");  
    returnButtonNotCustom.on('click', () => window.location.href = 'products.html'); 

    if(shoppingCartLength < 10 && (shoppingCartLength + parseInt(productQuantityNotCustom.val())) <= 10) {
      addProductsToCartNotCustom(product, parseInt(productQuantityNotCustom.val()));
      buyButtonNotCustom.text("¡Agregado al Carrito!");
    } else 
      buyButtonNotCustom.text("¡Carrito Lleno!");
  });

  returnButtonNotCustom.off('click');
  returnButtonNotCustom.on('click', () => {
    quantityGroupNotCustom.addClass("d-none");
    productQuantityNotCustom.val("1");
    buyButtonNotCustom.text("Comprar");
    returnButtonNotCustom.text("Regresar");
    decreaseButtonNotCustom.prop('disabled', true);

    buyButtonNotCustom.off('click');
    buyButtonNotCustom.on('click', () => showQuantityButtonsNotCustom());
    
    returnButtonNotCustom.off('click');
    returnButtonNotCustom.on('click', () => {
      if(shoppingCartLength >= 10) {
        buyButtonNotCustom.prop('disabled', true);
        quantityGroupNotCustom.addClass("d-none");
        buyButtonNotCustom.text("¡Carrito Lleno!");
        returnButtonNotCustom.text("Regresar");  
        returnButtonNotCustom.on('click', () => window.location.href = 'products.html');
      } else       
        window.location.href = 'products.html';
    });
  });
};

const addProductsToCartNotCustom = (product, quantity) => {
  const shoppingCart = localStorage.getItem("shopping-cart");
  const products = shoppingCart !== null ? JSON.parse(shoppingCart) : [{total: 0}];

  let productExistence = products.some(item => item["id"] == product.id);
  
  if(productExistence == false){
    // Adding product with new property to the shopping cart
    product["amount"] = quantity;
    products.push(product);
  }
  else if(productExistence == true){
    products.forEach( item => {
     // Adding amount to existent product 
      if(item["id"] == product.id){
        item.amount += quantity;
      }
    });
  }
  products[0].total += quantity;
  
  localStorage.setItem("shopping-cart", JSON.stringify(products));
  
  const shoppingCartCounter = $("#shopping-cart-counter");
  shoppingCartCounter.text(products[0].total);
  shoppingCartCounter.removeClass("d-none");
};