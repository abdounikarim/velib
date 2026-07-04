import type { Station, StationMarker, MarkerColor } from './types'
import { VelibMarkerCluster } from './VelibMarkerCluster'
import { VelibInfo } from './VelibInfo'
import { VelibReservation } from './VelibReservation'

const ICONS: Record<MarkerColor, string> = {
  green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
}

export const VelibMarker = {
  locations: [] as StationMarker[],
  image: ICONS.green,
  bgcolor: 'green' as MarkerColor,

  animate(marker: StationMarker): void {
    marker.setAnimation(google.maps.Animation.BOUNCE)
  },

  check(marker: StationMarker): void {
    const sessionStation = sessionStorage.getItem('station')
    if (sessionStation === marker.name) {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png')
      VelibMarker.animate(marker)
    }
  },

  click(marker: StationMarker): void {
    marker.addListener('click', () => {
      VelibInfo.show(marker)
      VelibReservation.destroyBlock()
      VelibReservation.checkStation(marker)
      VelibReservation.removeBike(marker)
    })
  },

  icon(s: Station): string {
    if (s.status === 'OPEN' && s.available_bikes > 0) {
      VelibMarker.image = ICONS.green
      VelibMarker.bgcolor = 'green'
    } else if (s.status === 'OPEN' && s.available_bikes === 0) {
      VelibMarker.image = ICONS.blue
      VelibMarker.bgcolor = 'blue'
    } else {
      VelibMarker.image = ICONS.red
      VelibMarker.bgcolor = 'red'
    }
    return VelibMarker.image
  },

  initMarkers(locations: Station[]): void {
    locations.forEach((s) => {
      VelibMarker.icon(s)
      const marker = Object.assign(
        new google.maps.Marker({
          position: { lat: s.position.lat, lng: s.position.lng },
          icon: VelibMarker.image,
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
          bgcolor: VelibMarker.bgcolor,
          id: `#${s.number}`,
        }
      ) as StationMarker
      VelibMarker.check(marker)
      VelibMarker.click(marker)
      VelibMarker.locations.push(marker)
    })
    VelibMarkerCluster.init()
  },

  stop(): void {
    const sessionStation = sessionStorage.getItem('station')
    for (const marker of VelibMarker.locations) {
      if (sessionStation === marker.name) {
        marker.setAnimation(null)
        marker.setIcon(ICONS[marker.bgcolor] ?? ICONS.green)
      }
    }
  },
}
