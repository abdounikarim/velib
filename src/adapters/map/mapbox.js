/**
 * Mapbox GL adapter.
 * Requires: mapbox-gl installed via pnpm.
 * Set VITE_MAPBOX_TOKEN in .env.
 *
 * TODO: implement clustering and colored markers.
 */

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

/** @type {import('./interface.js').MapAdapter} */
export const mapboxAdapter = {
  init(element, { zoom, center }) {
    return new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.lng, center.lat],
      zoom,
    })
  },

  createMarker(station, map) {
    const el = document.createElement('div')
    el.className = 'mapbox-marker'
    const marker = new mapboxgl.Marker(el)
      .setLngLat([station.position.lng, station.position.lat])
      .addTo(map)
    marker._stationData = station
    return marker
  },

  onMarkerClick(marker, cb) {
    marker.getElement().addEventListener('click', cb)
  },

  animate(marker) {
    marker.getElement().classList.add('marker-bounce')
  },

  stopAnimation(marker) {
    marker.getElement().classList.remove('marker-bounce')
  },

  setIcon(marker, color) {
    marker.getElement().className = `mapbox-marker mapbox-marker--${color}`
  },

  initCluster(_map, _markers) {
    console.warn('Mapbox clustering not yet implemented')
  },
}
