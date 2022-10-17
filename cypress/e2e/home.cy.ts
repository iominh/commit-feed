describe("Home Page", () => {
  it("displays home page", () => {
    cy.visit(Cypress.env("BASE_URL"));
  });

  it("changes theme", () => {
    cy.testTheme()
  });
});
