import type {OpenDataLocation} from "../types/OpenDataLocation";
import MarkerCluster from "./MarkerCluster";
import blueDot from '../images/blue-dot.png';
import greenDot from '../images/green-dot.png';
import ltBlueDot from '../images/ltblue-dot.png';
import redDot from '../images/red-dot.png';

export default class Marker {
    bgcolor: string = '';
    image: string = '';
    locations = [];

    check(marker) {
        const sessionStation = sessionStorage.getItem('station');
        const station = marker.name;
        if(sessionStation == station)
        {
            marker.icon = ltBlueDot;
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
            this.image = greenDot;
            this.bgcolor = 'green';
            return this.image;
        } else if (marker.status === 'OPEN' && marker.available_bikes == 0) {
            this.image = blueDot;
            this.bgcolor = 'blue';
            return this.image;
        }
        this.image = redDot;
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
        await markerCluster.init(markers, map);
    }
};

