describe('Skill neighbours test scenarios', () => {
  it('The user navigates to the specified Skill neighbours page, the skills graph and neighbours table is shown', () => {
    cy.visit('/skills');
    cy.get('[data-testid=custom-table]')
      .find('tbody tr')
      .should('have.length.gte', 2)
      .children()
      .eq(2)
      .find('a')
      .click();
    cy.get('[data-cy=neighbors-graph]').should('exist');
    cy.get('[data-cy=neighbors-table]').should('exist');
  });

  it('The table should be sorted ascending by proximity by default', () => {
    cy.get('[data-testid=custom-table]')
      .find('thead tr')
      .children()
      .first()
      .find('svg.MuiTableSortLabel-iconDirectionAsc')
      .should('be.visible');
  });

  it('When the user clicks each column header, table data is sorted by that column', () => {
    cy.get('[data-testid=custom-table]')
      .find('thead tr span')
      .each((el, index) => {
        if (index !== 0) {
          cy.wrap(el).click();
        }

        cy.wrap(el)
          .find('svg.MuiTableSortLabel-iconDirectionAsc', { timeout: 1000 })
          .should('be.visible')
          .then(() => {
            cy.wrap(el).click();
            cy.wrap(el)
              .find('svg.MuiTableSortLabel-iconDirectionAsc', { timeout: 1000 })
              .should('not.exist');
          });

        cy.wrap(el)
          .find('svg.MuiTableSortLabel-iconDirectionDesc', { timeout: 1000 })
          .should('be.visible')
          .then(() => {
            cy.wrap(el).click();
            cy.wrap(el)
              .find('svg.MuiTableSortLabel-iconDirectionAsc', { timeout: 1000 })
              .should('be.visible');
          });
      });
  });

  it('If the user clicks Back icon in the Breadcrumbs area, he is navigated to the Skills list page', () => {
    cy.get('[data-cy=neighbor-backBtn]').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/skills`);
  });
});
