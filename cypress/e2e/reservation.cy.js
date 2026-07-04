describe('Flow de réservation', () => {
  const station = {
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

  beforeEach(() => {
    cy.intercept('GET', 'https://maps.googleapis.com/**', { body: '' })
    cy.intercept('GET', 'https://cdn.jsdelivr.net/**', { body: '' })
    cy.intercept('GET', 'https://api.jcdecaux.com/**', { body: '[]' })
    cy.visit('/')
    cy.window().then((win) => {
      win.VelibInfo.show(station)
      win.VelibReservation.createBlock(station)
    })
  })

  it('affiche le bloc de réservation', () => {
    cy.get('#reservation').should('be.visible')
    cy.get('#reservation').should('contain', 'Station Bellecour')
  })

  it('affiche le canvas de signature', () => {
    cy.get('#canvas').should('exist')
  })

  it('affiche le bouton "Valider la réservation"', () => {
    cy.get('#valider').should('be.visible')
  })

  it('affiche le bouton "Effacer la signature"', () => {
    cy.get('#deleteCanvas').should('be.visible')
  })

  it('valide la réservation et sauvegarde en sessionStorage', () => {
    cy.get('#valider').click()
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('station')).to.eq('Station Bellecour')
      expect(win.sessionStorage.getItem('date')).to.not.be.null
    })
  })

  it('affiche le countdown après validation', () => {
    cy.get('#valider').click()
    cy.get('#isReservation', { timeout: 2000 }).should('contain', 'Station Bellecour')
  })

  it('empêche une double réservation sur la même station', () => {
    cy.get('#valider').click()
    cy.window().then((win) => {
      win.VelibInfo.show(station)
      win.VelibReservation.checkStation(station)
    })
    cy.get('#btnreservation').should('have.class', 'disabled')
  })

  it('restaure le countdown depuis le sessionStorage au rechargement', () => {
    cy.get('#valider').click()
    cy.reload()
    cy.get('#isReservation', { timeout: 3000 }).should('contain', 'Station Bellecour')
  })
})
