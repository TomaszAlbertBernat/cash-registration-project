describe('Cash Register Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the cash register interface', () => {
    cy.contains('Cash Register').should('be.visible');
    cy.contains('Item Price: $1.87').should('be.visible');
    cy.get('input[type="number"]').should('be.visible');
    cy.contains('Calculate Change').should('be.visible');
  });

  it('calculates change correctly', () => {
    // Enter cash amount
    cy.get('input[type="number"]').type('5.00');
    
    // Click calculate button
    cy.contains('Calculate Change').click();
    
    // Wait for calculation to complete
    cy.contains('Transaction Complete', { timeout: 1000 }).should('be.visible');
    
    // Check that change breakdown is displayed
    cy.contains('ONE: $3.13').should('be.visible');
  });

  it('handles exact cash payment', () => {
    // Enter exact amount
    cy.get('input[type="number"]').type('1.87');
    
    // Click calculate button
    cy.contains('Calculate Change').click();
    
    // Check for exact cash message
    cy.contains('No change due - customer paid with exact cash', { timeout: 1000 }).should('be.visible');
  });

  it('handles insufficient funds', () => {
    // Enter amount less than price
    cy.get('input[type="number"]').type('1.00');
    
    // Button should be disabled
    cy.contains('Calculate Change').should('be.disabled');
  });

  it('shows cash drawer contents', () => {
    cy.contains('Cash Drawer Contents').should('be.visible');
    cy.contains('PENNIES').should('be.visible');
    cy.contains('NICKELS').should('be.visible');
    cy.contains('DIMES').should('be.visible');
    cy.contains('QUARTERS').should('be.visible');
  });

  it('updates cash drawer after transaction', () => {
    // Record initial amount
    cy.contains('ONES').parent().contains('$90.00');
    
    // Make a transaction
    cy.get('input[type="number"]').type('5.00');
    cy.contains('Calculate Change').click();
    
    // Wait for transaction to complete
    cy.contains('Transaction Complete', { timeout: 1000 }).should('be.visible');
    
    // Check that cash drawer was updated
    cy.contains('ONES').parent().should('not.contain', '$90.00');
  });

  it('handles keyboard navigation', () => {
    // Focus on input and use Enter key
    cy.get('input[type="number"]').type('5.00{enter}');
    
    // Should trigger calculation
    cy.contains('Transaction Complete', { timeout: 1000 }).should('be.visible');
  });
}); 