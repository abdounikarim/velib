export interface Station {
  number: number
  name: string
  address: string
  position: { lat: number; lng: number }
  bike_stands: number
  available_bike_stands: number
  available_bikes: number
  status: string
  bonus: boolean | string
}

export type MarkerColor = 'green' | 'blue' | 'red'

export type StationMarker = google.maps.marker.AdvancedMarkerElement & {
  address: string
  available_bike_stands: number
  available_bikes: number
  bike_stands: number
  bonus: string
  name: string
  number: number
  status: string
  bgcolor: MarkerColor
  id: string
}
