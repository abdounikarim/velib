var VelibOpenData = {
    url:'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9d5ce692d8e3c65922de625c14f5f373869e5aff',
    locations: [],
    getData: function() {
        $.getJSON(VelibOpenData.url, function (data) {
            $.each(data, function( key, value ) {
                VelibOpenData.locations.push(value);
            });
            VelibMarker.initMarkers(VelibOpenData.locations);
        });
    },
};