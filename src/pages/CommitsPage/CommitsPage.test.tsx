import { describe, expect, test } from "@jest/globals";
import CommitsPage from "./CommitsPage";
import renderer from 'react-test-renderer';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  }),
  useNavigate: () => ({
    to: () => {}
  })
}));

describe("CommitsPage", () => {
  it('renders component', () => {
    const component = renderer.create(
      <CommitsPage></CommitsPage>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
