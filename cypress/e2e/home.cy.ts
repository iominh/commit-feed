describe("Home Page", () => {
  it("displays home page", () => {
    expect(Cypress.env('BASE_URL')).to.not.equal(null);
    expect(Cypress.env('BASE_URL')).to.not.equal('');
    cy.visit(Cypress.env('BASE_URL'));
  });
});
