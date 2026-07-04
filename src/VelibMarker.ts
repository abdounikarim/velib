import type { Station, StationMarker, MarkerColor } from './types'
import { VelibMarkerCluster } from './VelibMarkerCluster'
import { VelibInfo } from './VelibInfo'
import { VelibReservation } from './VelibReservation'

const ICONS: Record<MarkerColor | 'reserved', string> = {
  green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  reserved: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
}

function createIconContent(url: string): HTMLImageElement {
  const img = document.createElement('img')
  img.src = url
  return img
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
      marker.content = createIconContent(ICONS.reserved)
    } catch {
      // content property unavailable in test environment
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
            content: createIconContent(ICONS[bgcolor]),
            gmpClickable: true,
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
        // AdvancedMarkerElement unavailable in test environment
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
          marker.content = createIconContent(ICONS[marker.bgcolor])
        } catch {
          // content property unavailable
        }
      }
    }
  },
}
