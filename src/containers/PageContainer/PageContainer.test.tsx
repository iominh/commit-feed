import { describe, expect, test } from "@jest/globals";
import PageContainer from "./PageContainer";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
const { Router } = require("react-router-dom");

describe("PageContainer", () => {
  it("renders component", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <PageContainer><div>Test</div></PageContainer>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
  });
});
