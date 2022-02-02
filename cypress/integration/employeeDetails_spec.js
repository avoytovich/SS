describe('Employee details test scenarios', () => {
  it('The user navigates to the specified Employee Details page, the details and skills block are shown', () => {
    cy.visit('/employees');
    cy.waitUntilDataAppearsInTable().then(() => {
      cy.get('[data-cy=employee-list-table')
        .find('tbody tr')
        .eq(1)
        .find('a')
        .eq(0)
        .then(a => {
          cy.wrap(a).click();
          cy.get('[data-cy=employee-details-block]').should('exist');
          cy.get('[data-cy=employee-details-skill-group]').should('exist');
        });
    });
  });

  it('When the user checks each skill group, appropriate skills with levels are shown. If the employee has not entered any level of the skill - None is shown instead', () => {
    cy.get('[data-cy=employee-details-skill-group]')
      .find('p')
      .not(':contains("(0/")')
      .each(el => {
        cy.wrap(el).click();
        cy.get('[data-cy=employee-details-skill-list')
          .find('tbody tr td + td')
          .each(seniority => {
            cy.wrap(seniority).invoke('text').should('have.length.gte', 1);
          });
      });

    cy.get('[data-cy=employee-details-show-unfilled-skill-groups]').click();

    cy.get('[data-cy=employee-details-skill-group]')
      .find('p')
      .filter(':contains("(0/")')
      .each(el => {
        cy.wrap(el).click();
        cy.get('[data-cy=employee-details-skill-list')
          .find('tbody tr td + td')
          .each(seniority => {
            cy.wrap(seniority).contains('None');
          });
      });
  });

  it('If the user unchecks Show unfilled skills and Show unfilled skill groups checkboxes, only filled-in skills are shown.', () => {
    cy.get('[data-cy=employee-details-show-unfilled-skills]').click();

    cy.get('[data-cy=employee-details-skill-group]')
      .find('p')
      .filter(':contains("(0/")')
      .each(el => {
        cy.wrap(el).click();
        cy.get('[data-cy=employee-details-skill-list-grid').contains(
          // eslint-disable-next-line quotes
          "This employee doesn't have any filled skills in selected skill group"
        );
      });

    cy.get('[data-cy=employee-details-skill-group]')
      .find('p')
      .not(':contains("(0/")')
      .each(el => {
        cy.wrap(el).click();
        cy.get('[data-cy=employee-details-skill-list')
          .find('tbody tr td + td')
          .each(seniority => {
            cy.wrap(seniority).invoke('text').should('not.equal', 'None');
          });
      });
  });

  it('If the user unchecks Show unfilled skill groups checkbox, only filled-in skill groups are shown.', () => {
    cy.get('[data-cy=employee-details-show-unfilled-skill-groups]').click();

    cy.get('[data-cy=employee-details-skill-group]')
      .find('p')
      .each(el => {
        el.not(':contains("(0/")');
      });
  });

  it('If the user clicks Back icon in the Breadcrumbs area, he is navigated to the Employee list page.', () => {
    cy.get('[data-cy=employee-details-backBtn]').click();
    cy.url('equal', `${Cypress.config().baseUrl}/employees`);
  });
});
