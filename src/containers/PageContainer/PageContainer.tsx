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
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
import ErrorFallback from "@/components/ErrorFallback/ErrorFallback";

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
  // Use light theme by default
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const updateHtmlThemeClass = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }

  // Invoke changeTheme when switch has been clicked
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    const newTheme = !isDarkTheme ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    updateHtmlThemeClass(newTheme);
  };

  useEffect(() => {
    const existingPreference = localStorage.getItem('theme') ?? 'light';
    if (existingPreference) {
      setIsDarkTheme(existingPreference === 'dark')
    }
    updateHtmlThemeClass(existingPreference);
  }, []);

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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {!centered ? (
          <>{children}</>
        ) : (
          <Box
            p={4}
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
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default PageContainer;
