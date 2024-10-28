import type {OpenDataLocation} from "../types/OpenDataLocation";
import MarkerCluster from "./MarkerCluster";

export default class Marker {
    bgcolor: string = '';
    image: string = '';
    locations = [];

    check(marker) {
        const sessionStation = sessionStorage.getItem('station');
        const station = marker.name;
        if(sessionStation == station)
        {
            marker.icon = 'https://maps.google.com/mapfiles/ms/icons/ltblue-dot.png';
            this.animate(marker);
        }
    }

    click(googleMapsMarker) {
        googleMapsMarker.addListener('click', function () {
            console.log('click on a marker');
        });
    }

    icon(marker) {
        if (marker.status === 'OPEN' && marker.available_bikes > 0) {
            this.image = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            this.bgcolor = 'green';
            return this.image;
        } else if (marker.status === 'OPEN' && marker.available_bikes == 0) {
            this.image = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            this.bgcolor = 'blue';
            return this.image;
        }
        this.image = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        this.bgcolor = 'red';
        return this.image;
    }

    async initMarkers(map, openDataLocations: OpenDataLocation[]) {
        const self = this;

        const { AdvancedMarkerElement } = await google.maps.importLibrary(
            "marker",
        );

        const markers = openDataLocations.map((station: OpenDataLocation) => {
            self.icon(station);

            const markerImage = document.createElement('img');
            markerImage.src = self.image;

            const googleMapsMarker = new AdvancedMarkerElement({
                content: markerImage,
                position: {
                    lat: station.position?.lat,
                    lng: station.position?.lng,
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
        await markerCluster.init(map, markers);
    }
};

