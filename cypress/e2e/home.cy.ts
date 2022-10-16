describe("Home Page", () => {
  it("displays home page", () => {
    cy.visit(Cypress.env('http://127.0.0.1:4173'));
  });
});
