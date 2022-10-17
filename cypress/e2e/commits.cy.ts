// EbookFoundation/free-programming-books

describe("Commits Page", () => {
  it("displays commits page", () => {
    cy.visit(
      `${Cypress.env("BASE_URL")}/EbookFoundation/free-programming-books`
    );
    cy.get("table").find("tr").should("have.length", 31);
  });

  it("changes theme", () => {
    cy.testTheme()
  });

  it("displays more rows after clicking Load More", () => {
    cy.visit(
      `${Cypress.env("BASE_URL")}/EbookFoundation/free-programming-books`
    );
    cy.get("table").find("tr").should("have.length", 31);
    cy.contains("Load More").click();
    cy.get("table").find("tr").should("have.length", 61);
  });

  it("goes to root after clicking to top left nav", () => {
    cy.visit(`${Cypress.env("BASE_URL")}/EbookFoundation/free-programming-books`);
    cy.get('table').find('tr').should('have.length', 31)
  });

});
