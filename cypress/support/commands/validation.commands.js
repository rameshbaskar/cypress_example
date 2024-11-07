Cypress.Commands.add('verifyAttribute', (selector, attrName, attrValue) => {
  cy.get(selector).should('have.attr', attrName, attrValue);
});

Cypress.Commands.add('verifyLink', (selector, href, opensInNewTab = false) => {
  cy.verifyAttibute(selector, 'href', href);
  if (opensInNewTab) {
    cy.verifyAttibute(selector, 'target', '_blank');
  } else {
    cy.get(selector).should('not.have.attr', 'target', '_blank');
  }
});
