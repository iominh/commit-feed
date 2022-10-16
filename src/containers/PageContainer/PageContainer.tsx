import { ReactElement, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Switch,
  FormGroup,
  FormControlLabel,
  CssBaseline,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Define theme settings
const light = createTheme({
  palette: {
    mode: "light",
  },
});

const dark = createTheme({
  palette: {
    mode: "dark",
  },
});

export interface AppProps {
  children: ReactElement;
  centered?: boolean;
}

const PageContainer = ({ children, centered = false }: AppProps) => {
  // The light theme is used by default
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Commit Feed</Link>
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={isDarkTheme} onChange={changeTheme} />
                }
                label="Toggle Theme"
              />
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
      {!centered ? (
        <>{children}</>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </ThemeProvider>
  );
};

export default PageContainer;
