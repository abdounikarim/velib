import {PUBLIC_GOOGLEMAPS_API_KEY} from "$env/static/public";
import * as GMaps from "@googlemaps/js-api-loader";
import MarkerCluster from "./MarkerCluster";
import type {OpenDataLocation} from "../types/OpenDataLocation";
import Marker from "./Marker";
const { Loader } = GMaps;

export default class Map {
    map: Promise<google.maps.MapsLibrary> | null = null;
    mapElement: HTMLElement;

    constructor(mapElement: HTMLElement) {
        this.mapElement = mapElement;
    }

    async addMarkers(openDataLocations) {
        this.getMap();

        const { AdvancedMarkerElement } = await google.maps.importLibrary(
            "marker",
        );

        const markers = openDataLocations.map((station: OpenDataLocation) => {

            const marker = new Marker();
            marker.icon(station);

            const markerImage = document.createElement('img');
            markerImage.src = marker.image;

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
            googleMapsMarker.icon = marker.image;
            googleMapsMarker.bgcolor = marker.bgcolor;

            marker.check(googleMapsMarker);
            marker.click(googleMapsMarker);
            marker.locations.push(googleMapsMarker);

            return googleMapsMarker;
        });

        const markerCluster = new MarkerCluster();
        await markerCluster.init(markers, this.map);
    }

    async getMap() {
        if (this.map === null) {
            const loader = new Loader({
                apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');

            this.map = new Map(this.mapElement, {
                center: { lat: 45.7621258, lng: 4.8576067 },
                mapId: "VELIB_MAP_ID",
                zoom: 13
            });

            return this.map;
        }

        return this.map;
    }
}
