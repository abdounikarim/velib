import Canvas from "./Canvas";
import Marker from "./Marker.js";
import Station from "./Station";

/**
 * Reservation
 * @class Reservation
 * @extends HTMLElement
 */
export default class Reservation extends HTMLElement {
    /**
     * Constructor
     * @return void
     */
    constructor() {
        super();
    }

    /**
     * Check session
     * @return void
     */
    checkSession() {
        if(sessionStorage.getItem('date')){
            this.countDown();
        }
    }

    /**
     * Check station
     * TODO - check the type is right after importing the library with import
     * @param {google.maps.Marker} googleMapsMarker
     * @return void
     */
    checkStation(googleMapsMarker){
        const self = this;
        if(sessionStorage.getItem('station') == googleMapsMarker.name) {
            document.getElementById('btnreservation').innerHTML = '<span class="span_btn">Réservation en cours</span> <i class="material-icons">directions_bike</i>';
            document.getElementById('btnreservation').classList.add('disabled');
            document.getElementById('btnreservation').addEventListener('click', function () {
                alert('Vous avez déjà réservé un vélo dans cette station');
                self.removeBlock();
            });
        }
    }

    countDown() {
        const interval = setInterval(function () {
            const dateExp = Number(sessionStorage.getItem('date')) + (1000 * 60 * 20);
            const dateNow = new Date().getTime();
            const expiration = dateExp - dateNow;
            const min = Math.floor((expiration % (1000 * 60 * 60)) / (1000 * 60));
            const sec = Math.floor((expiration % (1000 * 60)) / (1000));
            if(min >= 0 && sec >= 0){
                document.getElementById('isReservation').innerHTML = '1 réservation à la station : ' + sessionStorage.getItem('station') + ' pendant ' + min + ' minutes et ' + sec + ' secondes';
            }
            else{
                clearInterval(interval);
                document.getElementById('isReservation').innerHTML = 'Réservation expirée';
            }
        }, 1000);
    }

    createBlock(googleMapsMarker) {
        this.removeBlock();
        const stationComponents = document.getElementsByTagName('station-component');
        const reservationComponent = document.createElement('reservation-component');
        reservationComponent.innerHTML = this.template(googleMapsMarker);
        const infoComponent = stationComponents[0];
        infoComponent.after(reservationComponent);
        // TODO - replace with a library for animation
        /*
        $(block).insertAfter("#infos").hide().fadeIn(2000);
        */
        const station = new Station();
        if (station.responsive() < 600) {
            this.move();
        }
        const canvas = new Canvas();
        // TODO - pass reservation to canvas (for createCanvas method)
        canvas.createCanvas(googleMapsMarker);
    }

    destroyBlock() {
        // TODO - replace with a library for animation
        $("#reservation").fadeOut(2000);
        const self = this;
        setTimeout(function() {
            self.removeBlock();
        }, 800);
    }

    move(){
        // TODO - replace with a library for animation
        const elem = $('#reservation');
        $('html, body').animate({
            scrollTop: elem.offset().top
        }, 1000 );
    }

    removeBike(googleMapsMarker) {
        const station = sessionStorage.getItem('station');
        const bikes = document.getElementById('available_bike').innerHTML;
        const left = bikes - 1;
        if(station == googleMapsMarker.name){
            document.getElementById('available_bike').innerHTML = left.toString();
            sessionStorage.setItem('bikes', left);
        }
    }

    removeBlock() {
        if (document.querySelector('reservation-component')) {
            document.querySelector('reservation-component').remove();
        }

        if (document.querySelector('canvas-component')) {
            document.querySelector('canvas-component').remove();
        }
    }

    sessionSave(date, marker) {
        sessionStorage.setItem('date', date);
        sessionStorage.setItem('station', marker.name);
        sessionStorage.setItem('bikes', marker.available_bikes);
    }

    validate(googleMapsMarker) {
        const self = this;
        document.getElementById('valider').addEventListener('click', function () {
            const marker = new Marker();
            marker.stop();
            const dateNow = new Date().getTime();
            self.sessionSave(dateNow, googleMapsMarker);
            self.checkStation(googleMapsMarker);
            self.countDown();
            self.removeBike(googleMapsMarker);
            marker.check(googleMapsMarker);
            self.destroyBlock();
        });
    }

    template(googleMapsMarker) {
        return `
            <div id="reservation" class="grid-example col s12 m6 l4 xl3 green accent-3">
                <h4>Réservation</h4>
                <p>Réserver un vélo à la station : <br>${googleMapsMarker.name}</p>
            </div>
        `;
    }
};
