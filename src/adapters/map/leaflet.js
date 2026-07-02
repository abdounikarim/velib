/**
 * Leaflet adapter.
 * Requires: leaflet installed via pnpm.
 * No API key needed — uses OpenStreetMap tiles by default.
 *
 * TODO: implement clustering (install leaflet.markercluster).
 */

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function makeIcon(color) {
  return L.divIcon({
    className: `leaflet-marker leaflet-marker--${color}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })
}

function colorForStation(station) {
  if (station.status === 'OPEN' && station.available_bikes > 0) return 'green'
  if (station.status === 'OPEN' && station.available_bikes === 0) return 'blue'
  return 'red'
}

/** @type {import('./interface.js').MapAdapter} */
export const leafletAdapter = {
  init(element, { zoom, center }) {
    const map = L.map(element).setView([center.lat, center.lng], zoom)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)
    return map
  },

  createMarker(station, map) {
    const color = colorForStation(station)
    const marker = L.marker(
      [station.position.lat, station.position.lng],
      { icon: makeIcon(color) }
    ).addTo(map)
    marker._stationData = { ...station, bgcolor: color }
    return marker
  },

  onMarkerClick(marker, cb) {
    marker.on('click', cb)
  },

  animate(marker) {
    marker.getElement()?.classList.add('marker-bounce')
  },

  stopAnimation(marker) {
    marker.getElement()?.classList.remove('marker-bounce')
  },

  setIcon(marker, color) {
    marker.setIcon(makeIcon(color))
  },

  initCluster(_map, _markers) {
    console.warn('Leaflet clustering not yet implemented — install leaflet.markercluster')
  },
}
