describe("Home Page", () => {
  it("displays home page", () => {
    expect(Cypress.env('CYPRESS_BASE_URL')).to.not.equal(null);
    expect(Cypress.env('CYPRESS_BASE_URL')).to.not.equal('');
    cy.visit('http://127.0.0.1:4173');
  });
});
