describe("Home Page", () => {
  it("displays home page", () => {
    cy.visit(Cypress.env('CYPRESS_BASE_URL'));
  });
});
