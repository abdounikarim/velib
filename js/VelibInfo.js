var VelibInfo = {
    canBook: function (marker) {
        if((marker.status == 'Ouverte') && (marker.available_bikes > 0))
        {
            var button = '<div id="blockReservation"><button class="waves-effect waves-light btn" id="btnreservation"><span class="span_btn">Réserver</span> <i class="material-icons">check_circle</i></button></div>';
            $("#infos").append(button);
            this.reservation(marker);
        }
        else if((marker.status == 'Ouverte') && (marker.available_bikes == 0))
        {
            var button = '<div id="blockNoReservation"><button class="btn disabled" id="btnnoreservation"><span class="span_btn">Aucun vélo disponible</span> <i class="material-icons">directions_bike</i></button></div>';
            $("#infos").append(button);
            this.noReservation();
        }
        else{
            var button = '<div id="blockClosed"><button class="btn disabled" id="btnclosed"><span class="span_btn">Fermée</span> <i class="material-icons">cancel</i></button></div>';
            $("#infos").append(button);
            this.closed();
        }
    },
    checkBonus: function (marker) {
        if(marker.bonus == 'True' || marker.bonus == 'Oui'){
            marker.bonus = 'Oui';
            return marker.bonus;
        }
        marker.bonus = 'Non';
        return marker.bonus;
    },
    checkStatus: function (marker) {
        if (marker.status == 'OPEN' || marker.status == 'Ouverte') {
            marker.status = 'Ouverte';
            return marker.status;
        }
        marker.status = 'Fermée';
        return marker.status;
    },
    closed: function () {
        $('#btnclosed').click(function () {
            alert('Cette station est fermée, pas de réservation possible');
        });
    },
    createBlock: function(marker, bgcolor){
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
        this.checkBonus(marker);
        this.checkStatus(marker);
        $('#map').after('<div id="infos" class="grid-example col s12 m6 l4 xl3 '+ bgcolor+'">' +
            '<h3>Informations de station</h3>' +
            '<p>Nom de la station : <span class="infos_span">'+ marker.name +'</span></p>' +
            '<p>Adresse de la station : <span class="infos_span">'+ marker.address +'</span></p>' +
            '<p>Vélos disponibles : <span id="available_bike" class="infos_span">'+ marker.available_bikes +'</span></p>' +
            '<p>Emplacements disponibles : <span class="infos_span">'+ marker.available_bike_stands +'</span></p>' +
            '<p>Emplacements de vélos : <span class="infos_span">'+ marker.bike_stands +'</span></p>' +
            '<p>Station bonus : <span class="infos_span">'+ marker.bonus +'</span></p>' +
            '<p>Station : <span class="infos_span">'+ marker.status +'</span></p>' +
            '</div>');
        $("#infos").hide().fadeIn(2000);
        this.canBook(marker);
        if(this.responsive() < 600)
        {
            var backToMap = '<br><div id="backToMap"><button class="blue darken-1 waves-effect waves-light btn" id="btnback"><span class="span_btn">Retour à la carte</span> <i class="material-icons">map</i></button></div>';
            $("#infos").append(backToMap);
            this.move();
        }
    },
    destroyBlock: function () {
        $("#infos").remove();
    },
    move: function () {
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
    },
    noReservation: function () {
        $('#btnnoreservation').click(function () {
            alert('Cette station n\'a pas de vélo disponible, pas de réservation possible');
        });
    },
    reduceMap: function () {
        $('#map').removeClass('l12 xl12');
        $('#map').addClass('l8 xl9');
    },
    responsive: function () {
        var width = $(window).width();
        return width;
    },
    reservation: function (marker) {
        $("#btnreservation").click(function () {
            $('#btnreservation').addClass('disabled');
            VelibReservation.createBlock(marker);
        });
    },
    show: function (marker) {
        this.destroyBlock();
        this.reduceMap();
        this.createBlock(marker, marker.bgcolor);
    }
};