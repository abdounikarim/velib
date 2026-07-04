import { VelibMap } from './VelibMap'
import { VelibMarker } from './VelibMarker'

export const VelibMarkerCluster = {
  init(): markerClusterer.MarkerClusterer {
    return new markerClusterer.MarkerClusterer({
      map: VelibMap.map!,
      markers: VelibMarker.locations,
    })
  },
}
