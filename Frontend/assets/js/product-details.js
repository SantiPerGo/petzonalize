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

$(document).ready(() => {
  // Forms validation
  validateForm(petDataForm);
  petDataForm.change(() => $("#reset-pet-data").removeClass("d-none"));

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
      $(":root").css("--img-mask", `url(${product.imgUrl})`);
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
// Button functions
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

const updateNotSelectedElements = selectedElement => {
  // Showing blue border on hover of not selected elements
  jQuery(".is-selected").each((index, selectedElement) => {
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