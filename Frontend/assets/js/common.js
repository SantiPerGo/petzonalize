// Jquery to load navbar and footer
$(document).ready(function(){
    $.get("/assets/html/navbar.html", data => {
        $("nav").replaceWith(data);

        // Updating shopping cart counter
        const shoppingCart = localStorage.getItem("shopping-cart");
        if(shoppingCart !== null) {
            const products = JSON.parse(shoppingCart);
            const shoppingCartCounter = $("#shopping-cart-counter");
            shoppingCartCounter.text(products[0].total);
            shoppingCartCounter.removeClass("d-none");
        }
    });
    
    $.get("/assets/html/footer.html", data => $("footer").replaceWith(data));
});

const validateForm = form => {
    return $(form).validate({
        rules: {
            name: {
                minlength: 3,
                required: true
            },
            email: {
                minlength: 5,
                required: true,
                email: true
            },
            phone: {
                minlength: 10,
                maxlength: 10,
                required: true
            },
            password: {
                minlength: 8,
                required: true
            },
            confirmPassword: {
                minlength: 8,
                required: true,
                equalTo: "#confirmPassword"
            }
        },
        messages : {
            name: {
                required: "Debes ingresar tu nombre",
                minlength: "Tu nombre debe tener al menos 3 letras"
            },
            email: {
                required: "Debes ingresar tu correo",
                minlength: "Tu correo debe tener al menos 5 letras",
                email: "El correo debe tener el formato correo@empresa.dominio"
            },
            phone: {
                required: "Debes ingresar tu número telefónico",
                minlength: "Tu número debe tener 10 digitos",
                maxlength: "Tu número no puede tener más de 10 digitos"
            },
            password: {
                required: "Debes ingresar tu contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres"
            },
            confirmPassword: {
                required: "Debes confirmar tu contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres",
                equalTo: "Las contraseñas no coinciden"
            }
        },
        errorClass: "valid is-valid valid-feedback",
        validClass: "invalid is-invalid invalid-feedback",
        highlight: element => {
            $(element).addClass("invalid").removeClass("valid");
            $(element.form).find(`label[id=${element.id}-error]`).addClass("valid-feedback");
            $(element).removeClass('input-icon-valid').addClass('input-icon-invalid'); 
        },
        unhighlight: element => {
            $(element).removeClass("invalid").addClass("valid");
            $(element.form).find(`label[id=${element.id}-error]`).addClass("valid-feedback");
            $(element).removeClass('input-icon-invalid').addClass('input-icon-valid'); 
        }
    });    
};