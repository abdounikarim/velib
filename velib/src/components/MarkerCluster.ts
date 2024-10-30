import * as GMarkerClusterer from "@googlemaps/markerclusterer";
const { MarkerClusterer } = GMarkerClusterer;

export default class MarkerCluster {
    async init(markers, map) {
        new MarkerClusterer({ markers, map });
    }
};
