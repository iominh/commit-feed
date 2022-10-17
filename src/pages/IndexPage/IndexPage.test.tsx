import { describe, expect, test } from "@jest/globals";
import IndexPage from "./IndexPage";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
const { Router } = require("react-router-dom");

describe("IndexPage", () => {
  it("renders component", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <IndexPage/>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
  });
});
