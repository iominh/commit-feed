import { ReactElement, useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Switch,
  FormGroup,
  FormControlLabel,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
}

const PageContainer = ({ children }: AppProps) => {
  // The light theme is used by default
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={isDarkTheme} onChange={changeTheme} />}
              label="Dark Theme"
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
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
    </ThemeProvider>
  );
};

export default PageContainer;
