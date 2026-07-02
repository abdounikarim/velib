$(document).ready(function(){
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Carousel.init(document.querySelectorAll('.carousel'), { indicators: true });
    VelibReservation.checkSession();
    // VelibOpenData.getData() is called from VelibMap.initMap
    // once the Google Maps API is ready (async callback)
});
