import { describe, expect, test } from "@jest/globals";
import CommitsPage from "./CommitsPage";
import renderer from 'react-test-renderer';

describe("CommitsPage", () => {
  it('renders component', () => {
    const component = renderer.create(
      <CommitsPage></CommitsPage>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
