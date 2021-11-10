describe('Skills registry test scenarios', () => {
  it('The user picks the skill group, the list of skills narrowed down accordingly', () => {
    cy.visit('/skills');
    cy.get('[data-cy=skill-group-name]').click();
    cy.get('ul.MuiList-root').children('li').should('have.length.gte', 2);
    cy.get('[data-cy=skill-group-item]');
    cy.get('.MuiBackdrop-root').click();
  });

  it('The user inputs skill name, the list of skills narrowed down accordingly', () => {
    cy.get('[data-testid=custom-table]')
      .find('tbody tr')
      .its('length')
      .then(rowCountBeforeType => {
        cy.get('#skill-name-input').type('aws', { force: true });
        cy.get('[data-testid=custom-table]')
          .find('tbody tr')
          .its('length')
          .should('not.equal', rowCountBeforeType);
      });
  });

  it('The user enters a non-existent skill name, the results list becomes empty', () => {
    cy.get('#skill-name-input').type('aaaa', { force: true });
    cy.get('[data-testid=custom-table]').should('not.exist');
  });

  it('The user selects the skill groups and skill name, then Clears the filter and observes the complete list of skills', () => {
    cy.get('[data-cy=skill-group-name]').click();
    cy.get('ul.MuiList-root').children('li').eq(3).click();
    cy.get('.MuiBackdrop-root').click();
    cy.get('[data-cy=skill-cleanup-btn]').click();
    cy.get('[data-testid=custom-table]').find('tbody tr').should('exist');
  });

  it('The user clicks the skill name and gets navigated to the skill neighbours page', () => {
    cy.get('[data-testid=custom-table]')
      .find('tbody tr td')
      .eq(2)
      .find('a')
      .then(a => {
        cy.wrap(a).click();
        cy.url().should(
          'equal',
          `${Cypress.config().baseUrl}/skills/${encodeURIComponent(a.text())}`
        );
      });
  });
});
