import MarkerCluster from './MarkerCluster';
import Reservation from "./Reservation.js";
import Station from "./Station";

export default class Marker {
    locations = []

    animate(marker) {
        console.log(marker);
        // TODO - restore animation
        //marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    check(marker) {
        const sessionStation = sessionStorage.getItem('station');
        const station = marker.name;
        if(sessionStation == station)
        {
            marker.icon = 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png';
            this.animate(marker);
        }
    }

    click(googleMapsMarker) {
        //Recharger les données au clic sur un marker
        //OpenData.getData();
        googleMapsMarker.addListener('click', function () {
            const station = new Station();
            station.show(googleMapsMarker);

            const reservation = new Reservation();

            reservation.destroyBlock();
            reservation.checkStation(googleMapsMarker);
            reservation.removeBike(googleMapsMarker);
        });
    }

    icon(marker) {
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
    }

    async initMarkers(openDataLocations) {
        const self = this;

        const { AdvancedMarkerElement } = await google.maps.importLibrary(
            "marker",
        );

        const markers = openDataLocations.map((station) => {
            self.icon(station);

            const markerImage = document.createElement('img');
            markerImage.src = self.image;

            const googleMapsMarker = new AdvancedMarkerElement({
                content: markerImage,
                position: {
                    lat: station.position['lat'],
                    lng: station.position['lng'],
                },
            });

            googleMapsMarker.address = station.address;
            googleMapsMarker.available_bike_stands = station.available_bike_stands;
            googleMapsMarker.available_bikes = station.available_bikes;
            googleMapsMarker.bike_stands = station.bike_stands;
            googleMapsMarker.bonus = station.bonus;
            googleMapsMarker.name = station.name;
            googleMapsMarker.number = station.number;
            googleMapsMarker.status = station.status;
            googleMapsMarker.id = '#'+ station.number;
            googleMapsMarker.icon = self.image;
            googleMapsMarker.bgcolor = self.bgcolor;

            self.check(googleMapsMarker);
            self.click(googleMapsMarker);
            self.locations.push(googleMapsMarker);

            return googleMapsMarker;
        });

        const markerCluster = new MarkerCluster();
        await markerCluster.init(markers);
    }

    stop() {
        const sessionStation = sessionStorage.getItem('station');
        for(let i = 0; i < this.locations.length; i++)
        {
            if(sessionStation == this.locations[i].name){
                this.locations[i].setAnimation(null);
                this.locations[i].icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            }
        }
    }
};
