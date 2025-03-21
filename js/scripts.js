/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
//
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});


/* Preloader */
$(window).on('load', function() {
    hideWait();
});

function hideWait() {
    var preloaderFadeOutTime = 500;
    var preloader = $('.spinner-wrapper');

    setTimeout(function() {
        preloader.fadeOut(preloaderFadeOutTime);
    }, 500);
}

function showWait() {
    var preloader = $('.spinner-wrapper');
    preloader.show();
}


$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
});

$('.scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 0);
    return false;
});



document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("emailInput").value;

    if (!validateEmail(email)) {
        alert("Por favor, ingrese un correo válido.");
        return;
    }

    let formData = new FormData();
    formData.append("email", email);

    fetch("models/send_email.php", {  // Asegúrate de que esta ruta sea accesible desde el navegador
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("successMessage").classList.remove("d-none");
            document.getElementById("emailInput").value = ""; // Limpia el campo
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error("Error:", error));
});

// Función para validar un email
function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}



