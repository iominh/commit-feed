describe("Home Page", () => {
  it("displays home page", () => {
    cy.visit(Cypress.env("BASE_URL"));
  });

  it("changes theme", () => {
    cy.testTheme()
  });

  it("displays user dropdown on input", () => {
    cy.visit(Cypress.env("BASE_URL"));

    // find the second input, type text to trigger auto-suggest and press down
    cy.get('input').eq(1).should('be.visible').type('EbookFoundation');
    cy.wait(500);
    cy.get('input').eq(1).type('{enter}');

  });
});
