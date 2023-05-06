describe('test login', () => {
  // login
  it('login', () => {
    cy.visit('/');
    cy.get('#input-username-for-credentials-provider').type('dylan');
    cy.get('#input-password-for-credentials-provider').type('Test1234');
    // click on login button with text "Sign in with Credentials"
    cy.contains('Sign in with Credentials').click();
  });
});

export {};