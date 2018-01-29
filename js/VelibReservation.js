var VelibReservation = {
    checkSession: function () {
        if(sessionStorage.getItem('date')){
            this.countDown();
        }
    },
    checkStation: function(marker){
        if(sessionStorage.getItem('station') == marker.name){
            $('#btnreservation').html('<span class="span_btn">Réservation en cours</span> <i class="material-icons">directions_bike</i>').addClass('disabled').click(function () {
                alert('Vous avez déjà réservé un vélo dans cette station');
                $('#reservation').remove();
            });
        }
    },
    countDown: function () {
        var interval = setInterval(function () {
            var dateExp = Number(sessionStorage.getItem('date')) + (1000 * 60 * 20);
            var dateNow = new Date().getTime();
            var expiration = dateExp - dateNow;
            var min = Math.floor((expiration % (1000 * 60 * 60)) / (1000 * 60));
            var sec = Math.floor((expiration % (1000 * 60)) / (1000));
            if(min >= 0 && sec >= 0){
                $('#isReservation').html('1 réservation à la station : ' + sessionStorage.getItem('station') + ' pendant ' + min + ' minutes et ' + sec + ' secondes');
            }
            else{
                clearInterval(interval);
                $('#isReservation').html('Réservation expirée');
            }
        }, 1000);
    },
    createBlock: function (marker) {
        this.removeBlock();
        var block = '<div id="reservation" class="grid-example col s12 m6 l4 xl3 green accent-3"><h4>Réservation</h4><p>Réserver un vélo à la station : <br>'+ marker.name+'</p></div>';
        $(block).insertAfter("#infos").hide().fadeIn(2000);
        if(VelibInfo.responsive() < 600){
            this.move();
        }
        VelibCanvas.createCanvas(marker);
    },
    destroyBlock: function () {
        $("#reservation").fadeOut(2000);
        setTimeout(function() {
            VelibReservation.removeBlock();
        }, 800);
    },
    move: function(){
        var elem = $('#reservation');
        $('html, body').animate({
            scrollTop: elem.offset().top
        }, 1000 );
    },
    removeBike: function (marker) {
        var station = sessionStorage.getItem('station');
        var bikes = $('#available_bike').text();
        var left = bikes - 1;
        if(station == marker.name){
            $('#available_bike').html(left);
            sessionStorage.setItem('bikes', left);
        }
    },
    removeBlock:function () {
        $('#reservation').remove();
    },
    sessionSave: function (date, marker) {
        sessionStorage.setItem('date', date);
        sessionStorage.setItem('station', marker.name);
        sessionStorage.setItem('bikes', marker.available_bikes);
    },
    validate: function (marker) {
        $('#valider').click(function () {
            VelibMarker.stop();
            var dateNow = new Date().getTime();
            VelibReservation.sessionSave(dateNow, marker);
            VelibReservation.checkStation(marker);
            VelibReservation.countDown();
            VelibReservation.removeBike(marker);
            VelibMarker.check(marker);
            VelibReservation.destroyBlock();
        });
    }
};