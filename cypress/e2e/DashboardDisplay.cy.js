describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.login('t@gmail.com', '12341234');
  });

  it('should have a bar-chart area', () => {
    cy.get('.dashboard-container').within(() => {
      cy.get('.bar-chart').should('exist');
      cy.get('.bar-chart .chart-header h6').contains('Select Queue for Bar Chart:');
      cy.get('.bar-chart .queue-select').should('exist');
      cy.get('.bar-chart').should('exist');
    });
  });

  it('should have a line-chart area', () => {
    cy.get('.dashboard-container').within(() => {
      cy.get('.line-chart').should('exist');
      cy.get('.line-chart .chart-header h6').contains('Select Queues for Line Chart:');
      cy.get('.line-chart .queue-select').should('exist');
      cy.get('.line-chart').should('exist');
    });
  });

  it('should have a stats-card area', () => {
    cy.get('.dashboard-container').within(() => {
      cy.get('.stats-cards-container').should('exist');
      cy.get('.stats-card').should('have.length', 4); //  4 stats cards
      cy.get('.stats-card').each(($el, index, $list) => {
        cy.wrap($el).should('exist');
      });
    });
  });

  it('should have a date range selector for start date and end date', () => {
    cy.get('.dashboard-content').within(() => {
      cy.get('h4').contains('Analytics Dashboard');
      cy.get('.custom-datepicker', { timeout: 10000 }).should('exist'); // Increased timeout
    });
  });
});


