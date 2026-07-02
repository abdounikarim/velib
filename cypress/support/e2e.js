// Suppress cross-origin errors from CDN scripts (no stack trace available)
Cypress.on('uncaught:exception', (err) => {
  if (err.message === 'Script error.') return false
})

// Stub Materialize, Google Maps and MarkerClusterer before the app loads.
// Using plain arrow functions instead of cy.stub() to avoid cross-origin Sinon errors.
Cypress.on('window:before:load', (win) => {
  win.M = {
    Sidenav: { init: () => {} },
    Carousel: { init: () => {} },
  }

  const mockMap = {
    setCenter: () => {},
    setZoom: () => {},
  }

  const mockMarker = function (opts) {
    return {
      ...opts,
      setAnimation: () => {},
      addListener: (event, cb) => {
        if (event === 'click') {
          win.__markerClickHandlers = win.__markerClickHandlers || []
          win.__markerClickHandlers.push({ marker: opts, cb })
        }
      },
    }
  }

  win.google = {
    maps: {
      Map: function (el) {
        el.style.height = '400px'
        return mockMap
      },
      Marker: mockMarker,
      Animation: { BOUNCE: 'BOUNCE' },
    },
  }

  win.markerClusterer = {
    MarkerClusterer: function () {
      return {}
    },
  }
})
