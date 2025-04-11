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




    //NEW FORM
    // Select the form and its elements
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const buttonSpinner = document.getElementById('buttonSpinner');
    const buttonText = document.getElementById('buttonText');
    const successMsg = document.getElementById('submitSuccessMessage');
    const errorMsg = document.getElementById('submitErrorMessage');
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

    // Define the validation rules
    const validateForm = () => {
        let isValid = true;

        // Reset any previous error messages
        resetErrors();

        // Validate Name
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError('name', 'El nombre es requerido.');
            isValid = false;
        }

        // Validate Email
        const email = document.getElementById('email').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('email', 'El email es requerido.');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError('email', 'Por favor ingrese un email válido.');
            isValid = false;
        }

        // Validate Phone
        const phone = document.getElementById('phone').value.trim();
        if (!phone) {
            showError('phone', 'El número telefónico es requerido.');
            isValid = false;
        }

        // Validate Message
        const message = document.getElementById('message').value.trim();
        if (!message) {
            showError('message', 'El mensaje es requerido.');
            isValid = false;
        }

        return isValid;
    };

    // Show error message
    const showError = (field, message) => {
        const errorElement = document.getElementById(`${field}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Show the error message
        document.getElementById(field).classList.add('is-invalid'); // Add invalid class
    };

    // Reset errors
    const resetErrors = () => {
        const errorElements = document.querySelectorAll('.invalid-feedback');
        const inputElements = document.querySelectorAll('.form-control');

        errorElements.forEach((element) => {
            element.style.display = 'none'; // Hide the error message
        });

        inputElements.forEach((input) => {
            input.classList.remove('is-invalid'); // Remove invalid class
        });
    };


    function toggleButtonLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            buttonSpinner.classList.remove('d-none');
            buttonText.textContent = 'Enviando...';
        } else {
            submitButton.disabled = false;
            buttonSpinner.classList.add('d-none');
            buttonText.textContent = 'Enviar';
        }
    }

    function showMessage(type, message) {
        const target = type === 'success' ? successMsg : errorMsg;
        const other = type === 'success' ? errorMsg : successMsg;

        // Set message text
        target.querySelector('strong').nextSibling.textContent = ' ' + message;

        // Show the correct alert
        target.classList.remove('d-none');
        setTimeout(() => target.classList.add('show'), 100); // slight delay for smooth fade-in
        other.classList.remove('show');
        other.classList.add('d-none');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            target.classList.remove('show');
            setTimeout(() => target.classList.add('d-none'), 500); // wait for fade out
        }, 5000);
    }


    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Check if the field is valid
            if (input.validity.valid) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
    
                const feedback = input.closest('.form-floating').querySelector('.invalid-feedback');
                console.log(feedback);
                if (feedback) {
                    feedback.classList.add('d-none');
                }
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
    
                const feedback = input.closest('.form-floating').querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.classList.remove('d-none');
                }
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            
            toggleButtonLoading(true); // Show spinner
    
            // Send data to PHP script
            fetch('models/send_contact_form.php', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => response.json()) // Expecting JSON
            .then(data => {

                toggleButtonLoading(false); // Hide spinner

                //console.log('Server response:', data);
            
                if (data.status === 'success') {
                    showMessage('success', data.message);
                    form.reset();
                } else {
                    showMessage('error', data.message);
                }
            })
            .catch(error => {
                toggleButtonLoading(false); // Hide spinner
                //console.error('Error:', error);
                showMessage('error', 'Error inesperado. Intente más tarde.');
            });
        } else {
            //console.log("Form validation failed.");
        }
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





