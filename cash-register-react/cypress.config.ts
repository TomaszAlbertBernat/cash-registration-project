import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents() {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 720,
}) 