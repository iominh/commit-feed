jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
  useNavigate: () => ({
    to: () => {},
  }),
  useRouteError: () => ({}),
}));

const MOCK_PRICES = [50, 47, 53, 50, 49, 51, 52];

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(MOCK_PRICES)
}));
