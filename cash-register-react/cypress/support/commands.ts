/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Custom command to interact with cash register
       * @example cy.calculateChange(5.00)
       */
      calculateChange(amount: number): Chainable<void>;
    }
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('calculateChange', (amount: number) => {
  cy.get('input[type="number"]').clear().type(amount.toString());
  cy.contains('Calculate Change').click();
});

// Prevent TypeScript from reading file as legacy script
export {}; 