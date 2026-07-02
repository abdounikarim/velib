describe('Affichage des informations de station', () => {
  const stationOuverte = {
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
  }

  const stationSansVelo = {
    ...stationOuverte,
    number: 2,
    name: 'Station Part-Dieu',
    available_bikes: 0,
    bgcolor: 'blue',
  }

  const stationFermee = {
    ...stationOuverte,
    number: 3,
    name: 'Station Perrache',
    status: 'CLOSED',
    bgcolor: 'red',
  }

  beforeEach(() => {
    cy.intercept('GET', 'https://maps.googleapis.com/**', { body: '' })
    cy.intercept('GET', 'https://cdn.jsdelivr.net/**', { body: '' })
    cy.intercept('GET', 'https://api.jcdecaux.com/**', { body: '[]' })
    cy.visit('/')
  })

  context('Station ouverte avec vélos disponibles', () => {
    beforeEach(() => {
      cy.window().then((win) => win.VelibInfo.show(stationOuverte))
    })

    it('affiche le bloc d\'informations', () => {
      cy.get('#infos').should('be.visible')
    })

    it('affiche le nom de la station', () => {
      cy.get('#infos').should('contain', 'Station Bellecour')
    })

    it('affiche l\'adresse', () => {
      cy.get('#infos').should('contain', '1 Place Bellecour, Lyon')
    })

    it('affiche le nombre de vélos disponibles', () => {
      cy.get('#available_bike').should('contain', '5')
    })

    it('affiche le statut "Ouverte"', () => {
      cy.get('#infos').should('contain', 'Ouverte')
    })

    it('affiche le bouton de réservation actif', () => {
      cy.get('#btnreservation').should('exist').and('not.have.class', 'disabled')
    })
  })

  context('Station ouverte sans vélos disponibles', () => {
    beforeEach(() => {
      cy.window().then((win) => win.VelibInfo.show(stationSansVelo))
    })

    it('affiche le bouton "Aucun vélo disponible" désactivé', () => {
      cy.get('#btnnoreservation').should('exist').and('have.class', 'disabled')
    })

    it('n\'affiche pas le bouton de réservation', () => {
      cy.get('#btnreservation').should('not.exist')
    })
  })

  context('Station fermée', () => {
    beforeEach(() => {
      cy.window().then((win) => win.VelibInfo.show(stationFermee))
    })

    it('affiche le bouton "Fermée" désactivé', () => {
      cy.get('#btnclosed').should('exist').and('have.class', 'disabled')
    })

    it('affiche le statut "Fermée"', () => {
      cy.get('#infos').should('contain', 'Fermée')
    })
  })

  context('Chargement depuis l\'API JCDecaux', () => {
    it('charge et affiche les stations depuis l\'API mockée', () => {
      cy.intercept('GET', 'https://api.jcdecaux.com/**', { fixture: 'stations.json' }).as('getStations')
      cy.window().then((win) => {
        win.VelibMap.map = { setCenter: () => {}, setZoom: () => {} }
        win.markerClusterer = { MarkerClusterer: function () { return {} } }
        win.VelibOpenData.getData()
      })
      cy.wait('@getStations')
      cy.window().its('VelibOpenData.locations').should('have.length', 3)
    })
  })
})
