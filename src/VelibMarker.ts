import type { Station, StationMarker, MarkerColor } from './types'
import { VelibMarkerCluster } from './VelibMarkerCluster'
import { VelibInfo } from './VelibInfo'
import { VelibReservation } from './VelibReservation'

const PIN_STYLES: Record<MarkerColor | 'reserved', { background: string; borderColor: string }> = {
  green: { background: '#00C853', borderColor: '#1B5E20' },
  blue: { background: '#1565C0', borderColor: '#0D47A1' },
  red: { background: '#D32F2F', borderColor: '#B71C1C' },
  reserved: { background: '#29B6F6', borderColor: '#0277BD' },
}

function createPinContent(
  style: { background: string; borderColor: string }
): google.maps.marker.PinElement {
  return new google.maps.marker.PinElement({
    background: style.background,
    borderColor: style.borderColor,
    glyphColor: '#ffffff',
  })
}

function bgcolorForStation(s: Station): MarkerColor {
  if (s.status === 'OPEN' && s.available_bikes > 0) return 'green'
  if (s.status === 'OPEN' && s.available_bikes === 0) return 'blue'
  return 'red'
}

export const VelibMarker = {
  locations: [] as StationMarker[],

  animate(marker: StationMarker): void {
    marker.element.classList.add('marker-bounce')
  },

  check(marker: StationMarker): void {
    const sessionStation = sessionStorage.getItem('station')
    if (sessionStation !== marker.name) return
    try {
      marker.content = createPinContent(PIN_STYLES.reserved)
    } catch {
      // PinElement unavailable (e.g. Maps API not loaded in test environment)
    }
    VelibMarker.animate(marker)
  },

  click(marker: StationMarker): void {
    marker.addListener('gmp-click', () => {
      VelibInfo.show(marker)
      VelibReservation.destroyBlock()
      VelibReservation.checkStation(marker)
      VelibReservation.removeBike(marker)
    })
  },

  initMarkers(locations: Station[]): void {
    locations.forEach((s) => {
      const bgcolor = bgcolorForStation(s)
      try {
        const marker = Object.assign(
          new google.maps.marker.AdvancedMarkerElement({
            position: { lat: s.position.lat, lng: s.position.lng },
            content: createPinContent(PIN_STYLES[bgcolor]),
          }),
          {
            address: s.address,
            available_bike_stands: s.available_bike_stands,
            available_bikes: s.available_bikes,
            bike_stands: s.bike_stands,
            bonus: String(s.bonus),
            name: s.name,
            number: s.number,
            status: s.status,
            bgcolor,
            id: `#${s.number}`,
          }
        ) as StationMarker
        VelibMarker.check(marker)
        VelibMarker.click(marker)
        VelibMarker.locations.push(marker)
      } catch {
        // AdvancedMarkerElement/PinElement unavailable (e.g. Maps API not loaded in test environment)
      }
    })
    VelibMarkerCluster.init()
  },

  stop(): void {
    const sessionStation = sessionStorage.getItem('station')
    for (const marker of VelibMarker.locations) {
      if (sessionStation === marker.name) {
        marker.element.classList.remove('marker-bounce')
        try {
          marker.content = createPinContent(PIN_STYLES[marker.bgcolor])
        } catch {
          // PinElement unavailable
        }
      }
    }
  },
}
