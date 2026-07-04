import { VelibOpenData } from './VelibOpenData'

export const VelibMap = {
  zoom: 13,
  lat: 45.7621258,
  lng: 4.8576067,
  map: null as google.maps.Map | null,

  initMap(): google.maps.Map {
    VelibMap.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: VelibMap.zoom,
      center: { lat: VelibMap.lat, lng: VelibMap.lng },
    })
    VelibOpenData.getData()
    return VelibMap.map
  },
}
