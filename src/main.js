import '@fontsource/noticia-text';
import 'material-icons/iconfont/material-icons.css';

import App from './App'
import Reservation from './components/Reservation'
import OpenData from './api/OpenData'

const app = new App();
app.render('#app');

document.addEventListener('DOMContentLoaded', function() {
    // TODO - replace the next two lines
    $('.button-collapse').sideNav();
    $('.carousel.carousel-slider').carousel({indicators: true});
    const reservation = new Reservation();
    reservation.checkSession();
    const openData = new OpenData();
    openData.getData();
});
