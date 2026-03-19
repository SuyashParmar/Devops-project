describe('ShopSmart Flow', () => {
  it('should load the homepage and display correct title', () => {
    cy.visit('/')
    cy.contains('ShopSmart').should('be.visible')
  })
})
