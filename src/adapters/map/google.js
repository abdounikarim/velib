/**
 * Google Maps adapter.
 * Requires: Google Maps JS API loaded via <script async defer>.
 * Requires: @googlemaps/markerclusterer v2 loaded via CDN.
 */

const ICONS = {
  green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  reserved: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
}

function colorForStation(station) {
  if (station.status === 'OPEN' && station.available_bikes > 0) return 'green'
  if (station.status === 'OPEN' && station.available_bikes === 0) return 'blue'
  return 'red'
}

/** @type {import('./interface.js').MapAdapter} */
export const googleMapsAdapter = {
  init(element, { zoom, center }) {
    return new google.maps.Map(element, { zoom, center })
  },

  createMarker(station, map) {
    const color = colorForStation(station)
    const marker = new google.maps.Marker({
      position: { lat: station.position.lat, lng: station.position.lng },
      map,
      icon: ICONS[color],
      name: station.name,
      address: station.address,
      available_bikes: station.available_bikes,
      available_bike_stands: station.available_bike_stands,
      bike_stands: station.bike_stands,
      bonus: station.bonus,
      status: station.status,
      number: station.number,
      bgcolor: color,
    })
    return marker
  },

  onMarkerClick(marker, cb) {
    marker.addListener('click', cb)
  },

  animate(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE)
  },

  stopAnimation(marker) {
    marker.setAnimation(null)
  },

  setIcon(marker, color) {
    marker.setIcon(ICONS[color] ?? ICONS.green)
  },

  initCluster(map, markers) {
    return new markerClusterer.MarkerClusterer({ map, markers })
  },
}
