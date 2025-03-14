$(document).ready(function(){
    $('.autoplay').slick({
      slidesToShow: 3,            // Muestra 3 slides a la vez
      slidesToScroll: 1,          // Avanza 1 slide a la vez
      autoplay: true,             // Habilita autoplay
      autoplaySpeed: 2000,        // Cambia cada 2 segundos
      infinite: true,             // Hace que el carrusel sea infinito
      pauseOnHover: true,         // Pausa el autoplay cuando se pone el mouse encima
      responsive: [
        {
          breakpoint: 768,        // Para pantallas más pequeñas
          settings: {
            slidesToShow: 2,      // Muestra 2 slides
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,        // Para pantallas muy pequeñas
          settings: {
            slidesToShow: 1,      // Muestra 1 slide
            slidesToScroll: 1
          }
        }
      ]
    });
});