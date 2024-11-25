<script lang="ts">
    import { onMount } from 'svelte';
    import OpenData from "../components/OpenData";
    import Map from "../components/Map";

    // Bindings
    let mapElement: HTMLElement;

    onMount(async function () {
        const openData = new OpenData();
        const openDataStations = await openData.getData();

        const map = new Map(mapElement);
        await map.addMarkers(openDataStations);
    });
</script>

<h1>Réservation de vélibs</h1>

<div bind:this={mapElement} style:height={"100%"} style:width={"100%"}></div>
