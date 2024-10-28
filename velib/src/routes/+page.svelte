<script lang="ts">
    import { onMount } from 'svelte';
    import * as GMaps from "@googlemaps/js-api-loader";
    const { Loader } = GMaps;
    import { PUBLIC_GOOGLEMAPS_API_KEY } from '$env/static/public';

    // Bindings
    let mapElement: HTMLElement;

    onMount(async function () {
        const loader = new Loader({
            apiKey: PUBLIC_GOOGLEMAPS_API_KEY,
            version: 'weekly'
        });

        const { Map } = await loader.importLibrary('maps');

        let map = new Map(mapElement, {
            center: { lat: 45.7621258, lng: 4.8576067 },
            zoom: 13
        });
    });
</script>

<h1>Réservation de vélibs</h1>

<div bind:this={mapElement} style:height={"100%"} style:width={"100%"}></div>
