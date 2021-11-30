// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getCustomTableTotalRowsCount', () =>
  cy
    .get('[data-cy=custom-table-pagination')
    .find('.MuiTablePagination-displayedRows')
    .invoke('text')
    .then(t => t.split('of ')[1])
);

Cypress.Commands.add('waitUntilDataAppearsInTable', () =>
  cy
    .get('[data-testid=custom-table]')
    .find('tbody tr', { timeout: 10000 })
    .should('have.length.gte', 2)
);
