import { describe, expect, test } from "@jest/globals";
import ErrorPage from "./ErrorPage";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";
const { Router } = require("react-router-dom");

describe("ErrorPage", () => {
  it("renders component", () => {
    const history = createMemoryHistory({ initialEntries: ["/error"] });
    render(
      <Router location={history.location} navigator={history}>
        <ErrorPage></ErrorPage>
      </Router>
    );
    expect(history.location.pathname).toBe("/error");
  });
});
