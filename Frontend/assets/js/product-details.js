// *********************************************************************************
// Getting product info from local storage
// *********************************************************************************

const getProductDetails = productName => {
    // Getting products from storage
    const products = JSON.parse(sessionStorage.getItem("products"));

    // If product name exists, return all the data
    return products.filter(product => product.name === productName)[0];
};

// Loading product data into the page
$(document).ready(() => {
    const productName = sessionStorage.getItem("product-name");
    const product = getProductDetails(productName);
    
    if(product !== undefined) {
        $("#product-img").attr('src', product.imgUrl);
        $("#product-img").attr('alt', product.name);
        $("#product-name").text(product.name);
        $("#product-description").text(product.description);
    } else {
        console.error("product doesnt exist");
    }
});