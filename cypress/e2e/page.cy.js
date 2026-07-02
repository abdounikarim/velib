describe('Structure de la page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://maps.googleapis.com/**', { body: '' })
    cy.intercept('GET', 'https://cdn.jsdelivr.net/**', { body: '' })
    cy.intercept('GET', 'https://api.jcdecaux.com/**', { body: '[]' })
    cy.visit('/')
  })

  it('affiche le bon titre de page', () => {
    cy.title().should('eq', 'Réservation de vélibs')
  })

  it('affiche la barre de navigation', () => {
    cy.get('nav').should('be.visible')
    cy.get('.brand-logo').should('contain', 'Velib')
  })

  it('contient les liens de navigation', () => {
    cy.get('nav a[href="#index-banner"]').should('contain', 'Diaporama')
    cy.get('nav a[href="#map"]').should('contain', 'Carte')
  })

  it('affiche le titre principal', () => {
    cy.get('h1').should('contain', 'Réservation de vélibs')
  })

  it('affiche la section diaporama avec les images', () => {
    cy.get('#index-banner').should('exist')
    cy.get('.carousel-item').should('have.length', 6)
  })

  it('affiche le conteneur de la carte', () => {
    cy.get('#map').should('exist')
  })

  it('affiche le footer avec le statut de réservation', () => {
    cy.get('footer').should('be.visible')
    cy.get('#isReservation').should('contain', 'Aucune réservation en cours')
  })

  it('contient le lien mentions légales', () => {
    cy.get('footer a[href="mentions.html"]').should('contain', 'Mentions légales')
  })
})
