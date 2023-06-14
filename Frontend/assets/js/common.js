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
        
        let isDarkMode = localStorage.getItem("is-dark-mode");

        if(isDarkMode !== null) {
            isDarkMode = isDarkMode === "true";
            switchMode(isDarkMode);
        } else 
            isDarkMode = false;

        $("#dark-mode").click(() => {
            isDarkMode = !isDarkMode;
            localStorage.setItem("is-dark-mode", isDarkMode);
            switchMode(isDarkMode);
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) 
              $("nav").addClass("nav-opaque");
            else
              $("nav").removeClass("nav-opaque");
        });
    });
    
    $.get("/assets/html/footer.html", data => $("footer").replaceWith(data));
});

const lightBlueColor = $(":root").css("--light-blue");
const blueColor = $(":root").css("--blue");
const lightPurpleColor = $(":root").css("--light-purple");
const purpleColor = $(":root").css("--purple");
const beigeColor = $(":root").css("--beige");
const brownColor = $(":root").css("--brown");
const lightGrayColor = $(":root").css("--light-gray");
const grayColor = $(":root").css("--gray");
const darkGrayColor = $(":root").css("--dark-gray");

const lightBlueFilter = $(":root").css("--light-blue-filter");
const blueFilter = $(":root").css("--blue-filter");

const cursorClick = $(":root").css("--cursor-click");
const cursorArrow = $(":root").css("--cursor-arrow");
const cursorLeft = $(":root").css("--cursor-left");
const cursorRight = $(":root").css("--cursor-right");
const cursorClickLight = $(":root").css("--cursor-click-light");
const cursorArrowLight = $(":root").css("--cursor-arrow-light");
const cursorLeftLight = $(":root").css("--cursor-left-light");
const cursorRightLight = $(":root").css("--cursor-right-light");

const switchMode = isDarkMode => {
    $("#dark-mode").attr("checked", isDarkMode);

    $(":root").css("--blue", isDarkMode ? lightBlueColor : blueColor);
    $(":root").css("--purple", isDarkMode ? lightPurpleColor : purpleColor);

    $(":root").css("--light-blue", isDarkMode ? blueColor : lightBlueColor);
    $(":root").css("--light-purple", isDarkMode ? purpleColor : lightPurpleColor);

    $(":root").css("--beige", isDarkMode ? brownColor : beigeColor);
    $(":root").css("--brown", isDarkMode ? beigeColor : brownColor);

    $(":root").css("--white", isDarkMode ? "black" : "white");
    $(":root").css("--black", isDarkMode ? "white" : "black");
    
    $(":root").css("--gray", isDarkMode ? lightGrayColor : grayColor);
    $(":root").css("--light-gray", isDarkMode ? grayColor : lightGrayColor);
    $(":root").css("--dark-gray", isDarkMode ? grayColor : darkGrayColor);

    $(":root").css("--blue-filter", isDarkMode ? lightBlueFilter : blueFilter);

    $(":root").css("--cursor-click", isDarkMode ? cursorClickLight : cursorClick);
    $(":root").css("--cursor-arrow", isDarkMode ? cursorArrowLight : cursorArrow);
    $(":root").css("--cursor-left", isDarkMode ? cursorLeftLight : cursorLeft);
    $(":root").css("--cursor-right", isDarkMode ? cursorRightLight : cursorRight);

    if(document.location.href.match(/[^\/]+$/)[0] === "index.html") {
        if(isDarkMode) 
            $("#order-img").attr("src", "assets/img/dog-cat-happy-dark.png");
        else
            $("#order-img").attr("src", "assets/img/dog-cat-happy.png");
    }

    $("img").each((key, element) => {
        if($(element).attr("src") !== undefined)
            if($(element).attr("src").includes("Logo.png") ||
                $(element).attr("src").includes("Logo Dark.png")) {
                if(!isDarkMode)
                    $(element).attr("src", "/assets/img/Logo.png");
                else 
                    $(element).attr("src", "/assets/img/Logo Dark.png");
            }
    });
};

const validateForm = form => {
    return $(form).validate({
        rules: {
            name: {
                minlength: 3,
                required: true
            },
            address: {
                minlength: 6,
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
                required: true,
                digits: true
            },
            password: {
                minlength: 8,
                required: true
            },
            confirmPassword: {
                minlength: 8,
                required: true,
                equalTo: "#confirmPassword"
            }, 
            number: {
                min: 1,
                required: true,
                digits: true
            },
            price: {
                min: 1,
                required: true,
                number: true
            },
            subject: {
                minlength: 5,
                required: true
            },
            message: {
                minlength: 5,
                required: true
            },
            description: {
                minlength: 5,
                required: true
            }
        },
        messages : {
            name: {
                required: "Debes ingresar tu nombre",
                minlength: "Tu nombre debe tener al menos 3 letras"
            },
            address: {
                required: "Debes ingresar tu dirección",
                minlength: "Tu dirección debe tener calle, colonia y código postal"
            },
            email: {
                required: "Debes ingresar tu correo",
                minlength: "Tu correo debe tener al menos 5 letras",
                email: "El correo debe tener el formato correo@empresa.dominio"
            },
            phone: {
                required: "Debes ingresar tu número telefónico",
                minlength: "Tu número debe tener 10 digitos",
                maxlength: "Tu número no puede tener más de 10 digitos",
                digits: "El valor debe ser un número entero (sin decimales)"
            },
            password: {
                required: "Debes ingresar tu contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres"
            },
            confirmPassword: {
                required: "Debes confirmar tu contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres",
                equalTo: "Las contraseñas no coinciden"
            },
            number: {
                min: "El valor debe ser al menos 1",
                required: "Debes ingresar la cantidad deseada",
                digits: "El valor debe ser un número entero (sin decimales)"
            },
            price: {
                min: "El precio debe ser al menos 1",
                required: "Debes ingresar el precio del producto",
                number: "El precio debe ser un número"
            },
            subject: {
                required: "Debes ingresar el asunto del correo",
                minlength: "El asunto debe tener al menos 5 caracteres"
            },
            message: {
                required: "Debes ingresar el mensaje del correo",
                minlength: "El mensaje debe tener al menos 5 caracteres"
            },
            description: {
                required: "Debes ingresar la descripcion del producto",
                minlength: "La descripción debe tener al menos 5 caracteres"
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