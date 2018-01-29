var VelibMap = {
    zoom: 13,
    lat: 45.7621258,
    lng: 4.8576067,
    locations: [],
    initMap: function () {
        VelibMap.map = new google.maps.Map(document.getElementById('map'), {
            zoom: VelibMap.zoom,
            center: {
                lat: VelibMap.lat,
                lng: VelibMap.lng
            }
        });
        return VelibMap.map;
    },
};