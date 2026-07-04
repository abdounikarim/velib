const INTERCEPTS = {
  maps: ['GET', 'https://maps.googleapis.com/**', { body: '' }],
  cdn: ['GET', 'https://cdn.jsdelivr.net/**', { body: '' }],
  api: ['GET', 'https://api.jcdecaux.com/**', { body: '[]' }],
}

const stationVerte = {
  number: 1,
  name: 'Station Bellecour',
  address: '1 Place Bellecour, Lyon',
  position: { lat: 45.7578, lng: 4.832 },
  available_bikes: 5,
  available_bike_stands: 10,
  bike_stands: 15,
  bonus: 'Oui',
  status: 'OPEN',
  bgcolor: 'green',
  content: null,
  element: { classList: { add: () => {}, remove: () => {} } },
}

const stationBleue = {
  number: 2,
  name: 'Station Part-Dieu',
  address: '17 Rue Garibaldi, Lyon',
  position: { lat: 45.7605, lng: 4.8596 },
  available_bikes: 0,
  available_bike_stands: 8,
  bike_stands: 8,
  bonus: 'Non',
  status: 'OPEN',
  bgcolor: 'blue',
  content: null,
  element: { classList: { add: () => {}, remove: () => {} } },
}

const stationRouge = {
  number: 3,
  name: 'Station Perrache',
  address: '3 Cours Charlemagne, Lyon',
  position: { lat: 45.7493, lng: 4.8266 },
  available_bikes: 2,
  available_bike_stands: 3,
  bike_stands: 5,
  bonus: 'Non',
  status: 'CLOSED',
  bgcolor: 'red',
  content: null,
  element: { classList: { add: () => {}, remove: () => {} } },
}

const setup = () => {
  cy.intercept(...INTERCEPTS.maps)
  cy.intercept(...INTERCEPTS.cdn)
  cy.intercept(...INTERCEPTS.api)
  cy.visit('/')
}

// ─────────────────────────────────────────────────────────────────────────────
describe('Changement de station', () => {
  beforeEach(setup)

  it('remplace le bloc infos quand on change de station', () => {
    cy.window().then((win) => win.VelibInfo.show(stationVerte))
    cy.get('#infos').should('contain', 'Station Bellecour')

    cy.window().then((win) => win.VelibInfo.show(stationBleue))
    cy.get('#infos').should('contain', 'Station Part-Dieu')
    cy.get('#infos').should('not.contain', 'Station Bellecour')
  })

  it("n'affiche qu'un seul bloc #infos à la fois", () => {
    cy.window().then((win) => win.VelibInfo.show(stationVerte))
    cy.window().then((win) => win.VelibInfo.show(stationBleue))
    cy.get('#infos').should('have.length', 1)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('Alertes des boutons désactivés', () => {
  beforeEach(setup)

  it('affiche une alerte au clic sur "Fermée"', () => {
    cy.window().then((win) => win.VelibInfo.show(stationRouge))
    cy.on('window:alert', (msg) => {
      expect(msg).to.eq('Cette station est fermée, pas de réservation possible')
    })
    cy.get('#btnclosed').click({ force: true })
  })

  it('affiche une alerte au clic sur "Aucun vélo disponible"', () => {
    cy.window().then((win) => win.VelibInfo.show(stationBleue))
    cy.on('window:alert', (msg) => {
      expect(msg).to.include('pas de vélo disponible')
    })
    cy.get('#btnnoreservation').click({ force: true })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('Réservation sur une station différente', () => {
  beforeEach(() => {
    setup()
    cy.window().then((win) => {
      win.sessionStorage.setItem('station', 'Station Bellecour')
      win.sessionStorage.setItem('date', String(new Date().getTime()))
      win.sessionStorage.setItem('bikes', '4')
    })
  })

  it('autorise la réservation sur une autre station', () => {
    const autreStation = { ...stationVerte, number: 9, name: 'Station République' }
    cy.window().then((win) => {
      win.VelibInfo.show(autreStation)
      win.VelibReservation.checkStation(autreStation)
    })
    cy.get('#btnreservation').should('exist').and('not.have.class', 'disabled')
  })

  it('désactive le bouton uniquement sur la station réservée', () => {
    cy.window().then((win) => {
      win.VelibInfo.show(stationVerte)
      win.VelibReservation.checkStation(stationVerte)
    })
    cy.get('#btnreservation').should('have.class', 'disabled')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('Countdown et sessionStorage', () => {
  beforeEach(setup)

  it('affiche le countdown au chargement si une réservation active existe', () => {
    cy.window().then((win) => {
      win.sessionStorage.setItem('station', 'Station Bellecour')
      win.sessionStorage.setItem('date', String(new Date().getTime()))
      win.VelibReservation.checkSession()
    })
    cy.get('#isReservation', { timeout: 2000 }).should('contain', 'Station Bellecour')
  })

  it('affiche "Réservation expirée" quand la date est dépassée de plus de 20 min', () => {
    cy.window().then((win) => {
      const dateExpired = new Date().getTime() - 1000 * 60 * 21
      win.sessionStorage.setItem('station', 'Station Bellecour')
      win.sessionStorage.setItem('date', String(dateExpired))
      win.VelibReservation.checkSession()
    })
    cy.get('#isReservation', { timeout: 2000 }).should('contain', 'Réservation expirée')
  })

  it('affiche le countdown après rechargement de page avec une réservation active', () => {
    cy.window().then((win) => {
      win.sessionStorage.setItem('station', 'Station Bellecour')
      win.sessionStorage.setItem('date', String(new Date().getTime()))
    })
    cy.reload()
    cy.get('#isReservation', { timeout: 3000 })
      .should('contain', '1 réservation à la station : Station Bellecour')
      .and('contain', 'minutes et')
      .and('contain', 'secondes')
  })

  it('sauvegarde bikes - 1 dans sessionStorage après validation', () => {
    cy.window().then((win) => {
      win.VelibInfo.show(stationVerte)
      win.VelibReservation.createBlock(stationVerte)
    })
    cy.get('#valider').click()
    cy.window().then((win) => {
      expect(Number(win.sessionStorage.getItem('bikes'))).to.eq(stationVerte.available_bikes - 1)
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe("Gestion d'erreur réseau", () => {
  beforeEach(() => {
    cy.intercept(...INTERCEPTS.maps)
    cy.intercept(...INTERCEPTS.cdn)
    cy.visit('/')
  })

  it("ne plante pas si l'API JCDecaux répond avec une erreur 500", () => {
    cy.intercept('GET', 'https://api.jcdecaux.com/**', { statusCode: 500, body: '' })
    cy.window().then((win) => {
      win.VelibMap.map = { setCenter: () => {}, setZoom: () => {} }
      win.markerClusterer = {
        MarkerClusterer: function () {
          return {}
        },
      }
      expect(() => win.VelibOpenData.getData()).to.not.throw()
    })
    cy.get('#map').should('exist')
    cy.get('nav').should('be.visible')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('Viewport mobile', () => {
  beforeEach(() => {
    cy.viewport(375, 667)
    setup()
  })

  it('affiche le bouton "Retour à la carte" en vue mobile', () => {
    cy.window().then((win) => win.VelibInfo.show(stationVerte))
    cy.get('#btnback').should('be.visible')
  })

  it('n\'affiche pas le bouton "Retour à la carte" en desktop', () => {
    cy.viewport(1280, 800)
    cy.window().then((win) => win.VelibInfo.show(stationVerte))
    cy.get('#btnback').should('not.exist')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
describe('Canvas de signature', () => {
  beforeEach(() => {
    setup()
    cy.window().then((win) => {
      win.VelibInfo.show(stationVerte)
      win.VelibReservation.createBlock(stationVerte)
    })
  })

  it("le canvas est vide à l'ouverture", () => {
    cy.get('#canvas').then(($canvas) => {
      const canvas = $canvas[0]
      const ctx = canvas.getContext('2d')
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const hasPixels = imageData.data.some((v) => v !== 0)
      expect(hasPixels).to.be.false
    })
  })

  it('efface le canvas au clic sur "Effacer la signature"', () => {
    cy.get('#canvas').then(($canvas) => {
      const canvas = $canvas[0]
      const ctx = canvas.getContext('2d')
      ctx.fillRect(10, 10, 50, 50)
    })
    cy.get('#deleteCanvas').click()
    cy.get('#canvas').then(($canvas) => {
      const canvas = $canvas[0]
      const ctx = canvas.getContext('2d')
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const hasPixels = imageData.data.some((v) => v !== 0)
      expect(hasPixels).to.be.false
    })
  })
})
