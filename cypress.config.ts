import { defineConfig } from "cypress";
import customViteConfig from "./vite.config";

export default defineConfig({
  // Specifies local environment variables. See .github directory
  // for other environments
  env: {
    CYPRESS_BASE_URL: 'http://127.0.0.1:5173/'
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // optionally pass in vite config
      viteConfig: customViteConfig,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
