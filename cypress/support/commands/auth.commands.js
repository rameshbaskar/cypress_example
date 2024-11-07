import {hashPassword} from 'support/utils';

Cypress.Commands.add('login', (username, password) => {
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
