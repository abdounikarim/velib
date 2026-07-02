/**
 * Map adapter loader.
 * Reads VITE_MAP from .env and returns the matching adapter.
 * Defaults to 'google'.
 *
 * Usage:
 *   import { mapAdapter } from './adapters/map/index.js'
 *   const map = mapAdapter.init(document.getElementById('map'), { zoom: 13, center })
 */

const provider = import.meta.env.VITE_MAP ?? 'google'

let adapter

if (provider === 'mapbox') {
  const { mapboxAdapter } = await import('./mapbox.js')
  adapter = mapboxAdapter
} else if (provider === 'leaflet') {
  const { leafletAdapter } = await import('./leaflet.js')
  adapter = leafletAdapter
} else {
  const { googleMapsAdapter } = await import('./google.js')
  adapter = googleMapsAdapter
}

export const mapAdapter = adapter
