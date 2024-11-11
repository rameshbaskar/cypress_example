import * as Constants from 'support/constants';

Cypress.Commands.add('stubGetBooksAPI', (mockResponse) => {
  cy.log(`Stub /getBooks API`);
  cy.intercept(`**/getBooks`, (req) => {
    req.reply(mockResponse);
  });
});

Cypress.Commands.add('waitForBorrowBookAPI', () => {
  cy.log(`Wait for /borrowBook API`);
  cy.intercept(`**/borrowBook`).as(Constants.BORROW_BOOK_API_ALIAS);
});
