var VelibMarker = {
    locations: [],
    animate: function (marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    },
    check: function (marker) {
        var sessionStation = sessionStorage.getItem('station');
        var station = marker.name;
        if(sessionStation == station)
        {
            marker.icon = 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png';
            VelibMarker.animate(marker);
        }
    },
    click: function (marker) {
        //Recharger les données au clic sur un marker
        //OpenData.getData();
        marker.addListener('click', function () {
            VelibInfo.show(marker);
            VelibReservation.destroyBlock();
            VelibReservation.checkStation(marker);
            VelibReservation.removeBike(marker);
        });
    },
    icon: function (marker) {
        if(marker.status === 'OPEN' && marker.available_bikes > 0)
        {
            this.image = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            this.bgcolor = 'green';
            return this.image;
        }
        else if(marker.status === 'OPEN' && marker.available_bikes == 0)
        {
            this.image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            this.bgcolor = 'blue';
            return this.image;
        }
        else{
            this.image = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            this.bgcolor = 'red';
            return this.image;
        }
    },
    initMarkers: function () {
        VelibOpenData.locations.forEach(function (s) {
            VelibMarker.icon(s);
            this.marker = new google.maps.Marker({
                address: s.address,
                available_bike_stands: s.available_bike_stands,
                available_bikes: s.available_bikes,
                bike_stands: s.bike_stands,
                bonus: s.bonus,
                name: s.name,
                number: s.number,
                position: {
                   lat: s.position['lat'],
                   lng: s.position['lng'],
                },
                status: s.status,
                id: '#'+ s.number,
                icon: VelibMarker.image,
                bgcolor: VelibMarker.bgcolor,
            });
            VelibMarker.check(this.marker);
            VelibMarker.click(this.marker);
            VelibMarker.locations.push(this.marker);
        });
        VelibMarkerCluster.init();
    },
    stop: function () {
        var sessionStation = sessionStorage.getItem('station');
        for(var i = 0; i < VelibMarker.locations.length; i++)
        {
            if(sessionStation == VelibMarker.locations[i].name){
                VelibMarker.locations[i].setAnimation(null);
                VelibMarker.locations[i].icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            }
        }
    }
};