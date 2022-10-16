describe("Home Page", () => {
  it("displays home page", () => {
    expect(Cypress.env('CYPRESS_BASE_URL')).to.not.equal(null);
    expect(Cypress.env('CYPRESS_BASE_URL')).to.not.equal('');
    cy.visit(Cypress.env('CYPRESS_BASE_URL'));
  });
});
