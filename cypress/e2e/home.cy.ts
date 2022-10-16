describe("Home Page", () => {
  before(() => {
    expect(Cypress.env('CYPRESS_BASE_URL')).to.not.equal(null);
    expect(Cypress.env('CYPRESS_BASE_URL')).to.not.equal('');
  })

  it("displays home page", () => {
    cy.visit('http://127.0.0.1:4173');
  });
});
