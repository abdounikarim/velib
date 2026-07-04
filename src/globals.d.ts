declare namespace M {
  class Sidenav {
    static init(
      el: NodeListOf<Element> | Element | Element[],
      options?: Record<string, unknown>
    ): Sidenav[]
  }
  class Carousel {
    static init(
      el: NodeListOf<Element> | Element | Element[],
      options?: Record<string, unknown>
    ): Carousel[]
  }
}

declare namespace markerClusterer {
  class MarkerClusterer {
    constructor(opts: { map: google.maps.Map; markers: google.maps.Marker[] })
  }
}
