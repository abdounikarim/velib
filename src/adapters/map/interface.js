/**
 * @typedef {Object} MapAdapter
 * @property {(element: HTMLElement, options: MapOptions) => any}            init
 * @property {(station: Station, map: any) => any}                           createMarker
 * @property {(marker: any, cb: () => void) => void}                        onMarkerClick
 * @property {(marker: any) => void}                                        animate
 * @property {(marker: any) => void}                                        stopAnimation
 * @property {(marker: any, color: 'green'|'blue'|'red'|'reserved') => void} setIcon
 * @property {(map: any, markers: any[]) => any}                            initCluster
 */

/**
 * @typedef {Object} MapOptions
 * @property {number} zoom
 * @property {{ lat: number, lng: number }} center
 */

/**
 * @typedef {Object} Station
 * @property {string} name
 * @property {string} address
 * @property {{ lat: number, lng: number }} position
 * @property {number} available_bikes
 * @property {number} available_bike_stands
 * @property {number} bike_stands
 * @property {string} bonus
 * @property {'OPEN'|'CLOSED'} status
 */
