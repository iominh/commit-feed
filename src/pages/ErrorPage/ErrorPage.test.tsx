import { describe, expect, test } from "@jest/globals";
import ErrorPage from "./ErrorPage";
import renderer from 'react-test-renderer';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import { createMemoryHistory } from 'history';
const { render } = require("@testing-library/react");
const { Router } = require("react-router-dom");

describe("ErrorPage", () => {
  it('renders component', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <ErrorPage></ErrorPage>
      </Router>
    );
    expect(history.location.pathname).toBe('/home');
  });
});
