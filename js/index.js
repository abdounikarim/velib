$(document).ready(function(){
    $('.button-collapse').sideNav();
    $('.carousel.carousel-slider').carousel({indicators: true});
    VelibReservation.checkSession();
    VelibOpenData.getData();
});