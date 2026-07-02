var VelibMarkerCluster = {
    init: function() {
        var markerCluster = new markerClusterer.MarkerClusterer({
            map: VelibMap.map,
            markers: VelibMarker.locations,
        });

        return markerCluster;
    },
};