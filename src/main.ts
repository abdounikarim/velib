import { VelibCanvas } from './VelibCanvas'
import { VelibInfo } from './VelibInfo'
import { VelibMap } from './VelibMap'
import { VelibMarker } from './VelibMarker'
import { VelibMarkerCluster } from './VelibMarkerCluster'
import { VelibOpenData } from './VelibOpenData'
import { VelibReservation } from './VelibReservation'

declare global {
  interface Window {
    initMap: () => void
    VelibCanvas: typeof VelibCanvas
    VelibInfo: typeof VelibInfo
    VelibMap: typeof VelibMap
    VelibMarker: typeof VelibMarker
    VelibMarkerCluster: typeof VelibMarkerCluster
    VelibOpenData: typeof VelibOpenData
    VelibReservation: typeof VelibReservation
  }
}

window.initMap = () => VelibMap.initMap()
window.VelibCanvas = VelibCanvas
window.VelibInfo = VelibInfo
window.VelibMap = VelibMap
window.VelibMarker = VelibMarker
window.VelibMarkerCluster = VelibMarkerCluster
window.VelibOpenData = VelibOpenData
window.VelibReservation = VelibReservation

$(document).ready(() => {
  M.Sidenav.init(document.querySelectorAll('.sidenav'))
  M.Carousel.init(document.querySelectorAll('.carousel'), { indicators: true })
  VelibReservation.checkSession()
})
