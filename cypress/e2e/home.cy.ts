describe("Home Page", () => {
  it("displays home page", () => {
    console.log('Crypress_base_url', Cypress.env('CYPRESS_BASE_URL'));
    cy.visit(Cypress.env('CYPRESS_BASE_URL'));
  });
});
