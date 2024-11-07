import * as Constants from 'support/constants';

Cypress.Commands.add('stubGetBooksAPI', (mockResponse) => {
  cy.intercept(`**/getBooks`, (req) => {
    req.reply(mockResponse);
  });
});

Cypress.Commands.add('waitForBorrowBookAPI', () => {
  cy.intercept(`**/borrowBook`).as(Constants.BORROW_BOOK_API_ALIAS);
});
