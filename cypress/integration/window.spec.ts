/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('cy.document() - get the document object', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('cy.title() - get the title', () => {
    cy.title().should('include', 'VAT CALCULATOR');
  });
});
