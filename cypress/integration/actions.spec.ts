context('Actions', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('click on mat-radio-button', () => {
    cy.get('.mat-radio-button').first().click();
    cy.get(".mat-radio-button [type='radio']")
      .first()
      .check()
      .should('be.checked');
  });

  it('first mat-radio-button must be checked', () => {
    cy.get('.mat-radio-button').first().click();
    cy.get(".mat-radio-button [type='radio']")
      .first()
      .check()
      .should('be.checked');
  });
});
