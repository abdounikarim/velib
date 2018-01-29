var VelibMarkerCluster = {
    init: function() {
        var markerCluster = new MarkerClusterer(VelibMap.map, VelibMarker.locations, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

        return markerCluster;
    },
};