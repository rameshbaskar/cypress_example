import {hashPassword} from 'support/utils';

Cypress.Commands.add('login', (username, password) => {
  cy.log(`Create logged in session`);
  cy.session(username, () => {
    cy.visitHome();
    cy.request({
      method: 'POST',
      url: Cypress.env('loginUrl'),
      body: {
        username: username,
        encPassword: hashPassword(password),
      },
    }).then((response) => {
      cy.clearCookie('authToken');
      cy.setCookie('authToken', response.authToken);
    });
  });
});

Cypress.Commands.add('visitHome', () => {
  cy.log(`Navigate to home page`);
  cy.visit('');
});
