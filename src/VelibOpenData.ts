import type { Station } from './types'
import { VelibMarker } from './VelibMarker'

const contract = import.meta.env.VITE_JCDECAUX_CONTRACT ?? 'Lyon'
const apiKey = import.meta.env.VITE_JCDECAUX_API_KEY ?? ''

export const VelibOpenData = {
  url: `https://api.jcdecaux.com/vls/v1/stations?contract=${contract}&apiKey=${apiKey}`,
  locations: [] as Station[],

  getData(): void {
    $.getJSON(VelibOpenData.url, (data: Station[]) => {
      data.forEach((station) => VelibOpenData.locations.push(station))
      VelibMarker.initMarkers(VelibOpenData.locations)
    })
  },
}
