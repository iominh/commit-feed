import { cyan } from "@mui/material/colors";

describe("Error Page", () => {

    it("displays error page", () => {
      cy.visit(`${Cypress.env('BASE_URL')}/invalid/path`);
      cy.url().should('include', '/error');
    });
  });
  