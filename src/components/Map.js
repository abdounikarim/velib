export default class Map extends HTMLElement {
    // TODO - used ?
    locations = []
    googleMapsMap = null

    /**
     * Constructor
     * @returns void
     */
    constructor () {
        super();

        this.innerHTML = this.template();
    }

    /**
     * Initialize the map
     * @returns {google.maps.Map} googleMapsMap
     */
    async initMap() {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
            "marker",
        );
        this.googleMapsMap = new Map(document.getElementById("map"), {
            center: { lat: 45.7621258, lng: 4.8576067 },
            mapId: "DEMO_MAP_ID",
            zoom: 13,
        });

        return this.googleMapsMap;
    }

    /**
     * Template
     * @returns {string}
     */
    template() {
        return `
            <div id="map" class="grid-example col s12 m12 l12 xl12"></div>
        `;
    }
}
