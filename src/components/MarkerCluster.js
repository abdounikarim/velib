import { MarkerClusterer } from '@googlemaps/markerclusterer';
import Map from "./Map";

export default class MarkerCluster {
    async init(markerLocations) {
        const map = new Map();
        const currentMap = await map.initMap();

        new MarkerClusterer({ markers: markerLocations, map: currentMap });
    }
};
