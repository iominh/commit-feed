# Readme

Init readme

# Testing

## Local

Run `yarn test` to run the Cypress tests in headless mode

Run `yarn cypress:open` to open Cypress

## Staging / Production

In a staging environment, a github action
is executed (see .github/workflows/cypress.yml)
that copies the JSON from the repo's CYPRESS_ENV_CI
secret and uses it for the tests.