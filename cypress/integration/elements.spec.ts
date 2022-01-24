context('Elements', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('toolbar should be shown', () => {
    cy.get('mat-toolbar').should('be.visible');
  });

  it('toolbar text be shown', () => {
    cy.get('mat-toolbar span').should('be.visible');
  });

  it('should appear three mat-radio-button ', () => {
    cy.get('.mat-radio-button').should('have.length', 3);
  });

  it('should appear three inputs', () => {
    cy.get('mat-form-field input').should('have.length', 3);
  });

  it('mat-card should be shown', () => {
    cy.get('mat-card').should('be.visible');
  });

  it('mat-radio components should be shown', () => {
    cy.get('mat-radio-group').should('be.visible');
    cy.get('mat-radio-button').should('be.visible');
  });

  it('net input should be shown', () => {
    cy.get('#netInput').should('be.visible');
  });

  it('vat input should be shown', () => {
    cy.get('#vatInput').should('be.visible');
  });

  it('gross input should be shown', () => {
    cy.get('#grossInput').should('be.visible');
  });

  it('#div-rate should be shown', () => {
    cy.get('#div-rate').should('be.visible');
  });

  it('paragraph above rates should be shown', () => {
    cy.get('#div-rate p').should('be.visible');
  });

  it('#div-inputs should be shown', () => {
    cy.get('#div-inputs').should('be.visible');
  });

  it('#div-inputs should be shown', () => {
    cy.get('#div-inputs').should('be.visible');
  });

  it('paragraph above inputs should be shown', () => {
    cy.get('#div-inputs p').should('be.visible');
  });

  it('#net-form-field should be shown', () => {
    cy.get('#net-form-field').should('be.visible');
  });

  it('#vat-form-field should be shown', () => {
    cy.get('#vat-form-field').should('be.visible');
  });

  it('#gross-form-field should be shown', () => {
    cy.get('#gross-form-field').should('be.visible');
  });

  it('euro icon should be shown in all inputs', () => {
    cy.get('#gross-form-field mat-icon').should('be.visible');
    cy.get('#vat-form-field mat-icon').should('be.visible');
    cy.get('#net-form-field mat-icon').should('be.visible');
  });

  it('mat-label should be shown in all inputs', () => {
    cy.get('#gross-form-field mat-label').should('be.visible');
    cy.get('#vat-form-field mat-label').should('be.visible');
    cy.get('#net-form-field mat-label').should('be.visible');
  });

  it('check form tag', () => {
    cy.get('form').should('be.visible');
  });
});
