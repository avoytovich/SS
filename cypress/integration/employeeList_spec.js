describe('Employee list test scenarios', () => {
  it('The user navigates to the specified employee list page, filters block and the employee list table is shown', () => {
    cy.visit('/employees');
    cy.waitUntilDataAppearsInTable();
    cy.get('[data-cy=employee-filter-block]').should('exist');
    cy.get('[data-cy=employee-list-table]').should('exist');
  });

  it('The user types the skill name in the Skill search field, the list of employees is narrowed down to the ones having that skill. The query param "skill" with the name of the typed skill is added to the URL.', () => {
    cy.getCustomTableTotalRowsCount().then(countBeforeFilter => {
      cy.get('#skill-search-input').type('React');
      cy.url().should('equal', `${Cypress.config().baseUrl}/employees?skill=React`);

      cy.get('[data-cy=employee-list-table]').find('tbody tr').should('have.length.gte', 2);

      cy.get('#skill-search-input').clear();

      cy.get('[data-cy=custom-table-pagination')
        .find('.MuiTablePagination-displayedRows')
        .contains(countBeforeFilter);
    });
  });

  it('The user enters a non-existent skill name, the results list becomes empty.', () => {
    cy.get('#skill-search-input').type('aaaa');
    cy.get('[data-cy=employee-list-table]').contains('No data received');
    cy.get('#skill-search-input').clear();
  });

  it('The user enters the employee name, the list of employees narrowed down accordingly.', () => {
    cy.getCustomTableTotalRowsCount().then(countBeforeFilter => {
      cy.get('#employee-name-input').type('Aaron');

      cy.get('[data-cy=employee-list-table]')
        .find('tbody tr')
        .should('have.length.gte', 2)
        .children()
        .eq(0)
        .contains('Aaron');

      cy.get('[data-cy=employee-cleanup-btn]').click();

      cy.get('[data-cy=custom-table-pagination')
        .find('.MuiTablePagination-displayedRows')
        .contains(countBeforeFilter);
    });
  });

  it('The user picks the Compenency(ies), the list of employees narrowed down accordingly.', () => {
    cy.getCustomTableTotalRowsCount().then(countBeforeFilter => {
      cy.get('[data-cy=employee-select-competency]').click();
      cy.get('ul.MuiList-root').children('li').eq(2).click();

      cy.get('[data-cy=employee-list-table]')
        .find('tbody tr')
        .should('have.length.gte', 2)
        .children()
        .eq(1)
        .then(td => {
          cy.wrap(td)
            .invoke('text')
            .then(tdText => {
              cy.wrap(td).contains(tdText);
            });
        });

      cy.get('[data-cy=employee-cleanup-btn]').click();

      cy.get('[data-cy=custom-table-pagination')
        .find('.MuiTablePagination-displayedRows')
        .contains(countBeforeFilter);
    });
  });

  it('The user picks the Primary Specialization(s), the list of employees narrowed down accordingly.', () => {
    cy.getCustomTableTotalRowsCount().then(countBeforeFilter => {
      cy.get('[data-cy=employee-select-specialization]').click();
      cy.get('ul.MuiList-root').children('li').eq(2).click();

      cy.get('[data-cy=employee-list-table]')
        .find('tbody tr')
        .should('have.length.gte', 2)
        .children()
        .eq(2)
        .then(td => {
          cy.wrap(td)
            .invoke('text')
            .then(tdText => {
              cy.wrap(td).contains(tdText);
            });
        });

      cy.get('[data-cy=employee-cleanup-btn]').click();

      cy.get('[data-cy=custom-table-pagination')
        .find('.MuiTablePagination-displayedRows')
        .contains(countBeforeFilter);
    });
  });

  it('If the user click employee name, he is being navigated to Employee details page.', () => {
    cy.get('[data-cy=employee-list-table]')
      .find('tbody tr')
      .should('have.length.gte', 2)
      .children()
      .eq(0)
      .then(td => {
        cy.wrap(td)
          .find('a')
          .then(link => {
            cy.wrap(link).click();
            cy.get('[data-cy=employee-details-page]').should('exist');
          });
      });
    cy.visit('/employees');
  });

  it('If the user clicks any item in the Primary Specialization column, he is being navigated to Skill Neighbours page.', () => {
    cy.get('[data-cy=employee-list-table]')
      .find('tbody tr', { timeout: 10000 })
      .should('have.length.gte', 2)
      .eq(2)
      .children()
      .eq(2)
      .then(td => {
        cy.wrap(td)
          .find('a')
          .then(link => {
            cy.wrap(link).click();
            cy.url().should(
              'equal',
              `${Cypress.config().baseUrl}/skills/${encodeURIComponent(link.text())}`
            );
          });
      });
  });
});
