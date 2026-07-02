import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    // Required to allow cross-origin requests to external CDN scripts
    // (Google Maps, MarkerClusterer, Materialize).
    chromeWebSecurity: false,
  },
})
