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


# PAT

Generate personal access token:
- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- https://docs.github.com/en/rest#oauth2-token-sent-in-a-header

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