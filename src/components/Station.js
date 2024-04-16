import Reservation from './Reservation';

export default class Station extends HTMLElement {
    constructor() {
        super();
    }
    canBook(googleMapsMarker) {
        if((googleMapsMarker.status == 'Ouverte') && (googleMapsMarker.available_bikes > 0))
        {
            const button = '<div id="blockReservation"><button class="waves-effect waves-light btn" id="btnreservation"><span class="span_btn">Réserver</span> <i class="material-icons">check_circle</i></button></div>';
            $("#infos").append(button);
            this.reservation(googleMapsMarker);
        }
        else if((googleMapsMarker.status == 'Ouverte') && (googleMapsMarker.available_bikes == 0))
        {
            const button = '<div id="blockNoReservation"><button class="btn disabled" id="btnnoreservation"><span class="span_btn">Aucun vélo disponible</span> <i class="material-icons">directions_bike</i></button></div>';
            $("#infos").append(button);
            this.noReservation();
        }
        else{
            const button = '<div id="blockClosed"><button class="btn disabled" id="btnclosed"><span class="span_btn">Fermée</span> <i class="material-icons">cancel</i></button></div>';
            $("#infos").append(button);
            this.closed();
        }
    }

    checkBonus(googleMapsMarker) {
        if(googleMapsMarker.bonus == 'True' || googleMapsMarker.bonus == 'Oui'){
            googleMapsMarker.bonus = 'Oui';
            return googleMapsMarker.bonus;
        }
        googleMapsMarker.bonus = 'Non';
        return googleMapsMarker.bonus;
    }

    checkStatus(googleMapsMarker) {
        if (googleMapsMarker.status == 'OPEN' || googleMapsMarker.status == 'Ouverte') {
            googleMapsMarker.status = 'Ouverte';
            return googleMapsMarker.status;
        }
        googleMapsMarker.status = 'Fermée';
        return googleMapsMarker.status;
    }

    closed() {
        document.getElementById('btnclosed').addEventListener('click', function () {
            alert('Cette station est fermée, pas de réservation possible');
        });
    }

    createBlock(googleMapsMarker, bgcolor){
        if(bgcolor == 'green')
        {
            bgcolor = 'green accent-3';
        }
        else if (bgcolor == 'blue')
        {
            bgcolor= 'light-blue lighten-1';
        }
        else{
            bgcolor = 'red lighten-1';
        }
        console.log(googleMapsMarker);
        this.checkBonus(googleMapsMarker);
        this.checkStatus(googleMapsMarker);
        const mapComponents = document.getElementsByTagName('map-component');
        const stationComponent = document.createElement('station-component');
        stationComponent.innerHTML = `
            <div id="infos" class="grid-example col s12 m6 l4 xl3 ${bgcolor}">
                <h3>Informations de station</h3>
                <p>Nom de la station : <span class="infos_span">${googleMapsMarker.name}</span></p>
                <p>Adresse de la station : <span class="infos_span">${googleMapsMarker.address}</span></p>
                <p>Vélos disponibles : <span id="available_bike" class="infos_span">${googleMapsMarker.available_bikes}</span></p>
                <p>Emplacements disponibles : <span class="infos_span">${googleMapsMarker.available_bike_stands}</span></p>
                <p>Emplacements de vélos : <span class="infos_span">${googleMapsMarker.bike_stands}</span></p>
                <p>Station bonus : <span class="infos_span">${googleMapsMarker.bonus}</span></p>
                <p>Station : <span class="infos_span">${googleMapsMarker.status}</span></p>
            </div>`;
        const mapComponent = mapComponents[0];
        mapComponent.after(stationComponent);
        // TODO - remove jQuery
        //$("#infos").hide().fadeIn(2000);
        this.canBook(googleMapsMarker);
        if(this.responsive() < 600)
        {
            const backToMap = '<br><div id="backToMap"><button class="blue darken-1 waves-effect waves-light btn" id="btnback"><span class="span_btn">Retour à la carte</span> <i class="material-icons">map</i></button></div>';
            $("#infos").append(backToMap);
            this.move();
        }
    }

    destroyBlock() {
        if (document.getElementById('infos')) {
            document.getElementById('infos').remove();
        }
    }

    move() {
        // TODO - replace with a library for animation
        /*
        $('#btnback').click(function () {
            var elem = $('#map');
            $('html, body').animate({
                scrollTop: elem.offset().top
            }, 1000 );
        });
        var elem = $('#infos');
        $('html, body').animate({
            scrollTop: elem.offset().top
        }, 1000 );
        */
    }

    noReservation() {
        document.getElementById('btnnoreservation').addEventListener('click', function () {
            alert('Cette station n\'a pas de vélo disponible, pas de réservation possible');
        });
    }

    reduceMap() {
        document.getElementById('map').classList.remove('l12', 'xl12');
        document.getElementById('map').classList.add('l8', 'xl9');
    }

    responsive() {
        return window.innerWidth;
        //return $(window).width();
    }

    reservation(googleMapsMarker) {
        document.getElementById('btnreservation').addEventListener('click', function () {
            document.getElementById('btnreservation').classList.add('disabled');
            // TODO - duplicate instance of Reservation
            // TODO - try pass reservation from marker on marker.click to there
            const reservation = new Reservation();
            // TODO - pass info into createBlock
            reservation.createBlock(googleMapsMarker);
        });
    }

    show(googleMapsMarker) {
        this.destroyBlock();
        this.reduceMap();
        this.createBlock(googleMapsMarker, googleMapsMarker.bgcolor);
    }
};
