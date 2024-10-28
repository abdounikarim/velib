import * as GMarkerClusterer from "@googlemaps/markerclusterer";
const { MarkerClusterer } = GMarkerClusterer;

export default class MarkerCluster {
    async init(map, markerLocations) {
        new MarkerClusterer({ markers: markerLocations, map: map });
    }
};
