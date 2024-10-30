<script lang="ts">
    import { onMount } from 'svelte';
    import * as GMaps from "@googlemaps/js-api-loader";
    const { Loader } = GMaps;
    import { PUBLIC_GOOGLEMAPS_API_KEY } from '$env/static/public';
    import Marker from "../components/Marker";
    import OpenData from "../components/OpenData";

    // Bindings
    let mapElement: HTMLElement;

    onMount(async function () {
        const openData = new OpenData();
        const openDataStations = await openData.getData();

        const loader = new Loader({
            apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
            version: 'weekly'
        });

        const { Map } = await loader.importLibrary('maps');

        let map = new Map(mapElement, {
            center: { lat: 45.7621258, lng: 4.8576067 },
            mapId: "VELIB_MAP_ID",
            zoom: 13
        });

        const marker = new Marker();
        marker.initMarkers(map, openDataStations);
    });
</script>

<h1>Réservation de vélibs</h1>

<div bind:this={mapElement} style:height={"100%"} style:width={"100%"}></div>
