describe("Home Page", () => {
  it("displays home page", () => {
    cy.visit(Cypress.env("BASE_URL"));
  });

  it("changes theme", () => {
    cy.visit(Cypress.env("BASE_URL"));

    // click "toggle" button
    cy.contains("Toggle").click();

    // check that 'dark' class exists on html root
    cy.get("html").should("have.class", "dark").and("not.have.class", "light");
  });
});
