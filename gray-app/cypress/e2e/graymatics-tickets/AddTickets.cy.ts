describe('test add ticket', () => {
    // login
    it('add ticket', () => {
      cy.visit('/');
      cy.get('#input-username-for-credentials-provider').type('dylan');
      cy.get('#input-password-for-credentials-provider').type('Test1234');
      // click on login button with text "Sign in with Credentials"
      cy.contains('Sign in with Credentials').click();
      cy.visit('/others/tickets');
      cy.get('#add-ticket-btn').click();
      cy.get('#assigned_to').type('dylan');
      cy.get('#assigned_by').type('test');
      cy.get('#create_ticket_btn').click();
    });
  });
  
  export {};