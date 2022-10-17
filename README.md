# Readme

This is Minh Nguyen's homework solution for Chronosphere
as of Oct 16, 2022. It implements the following:

- Pagespeed score of 97 for mobile and 100 for desktop
- React Router integration for http://localhost/:user/:repo
and invalid routes
- Autocomplete for user and repo names with animation through
- A table of commits showing date, author, message, and URL
with a "Load More" button at the bottom
- Header with dark + light theme
- Integration testing through Cypress
- Unit testing through Jest
- Scaffolded from Vite TypeScript

A live version is available for testing at https://commit-feed-sage.vercel.app/

## Quickstart

```
yarn install
yarn dev
```

## Testing

### Local

Run `yarn test` to run the Jest unit tests

Run `yarn cypress:run` to run the Cypress E2E tests in headless mode

Run `yarn cypress:open` to open Cypress E2E testing

### Staging / Production

In a staging environment, a github action
is executed (see .github/workflows/cypress.yml)
that copies the JSON from the repo's CYPRESS_ENV_CI
secret and uses it for the tests.