import * as Navbar from 'support/pages/navbar';

describe(`Navbar tests`, () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it(`should show the navbar`, () => {
    Navbar.verifyLoaded();
    Navbar.verifyLoggedOut();
  });
  it(`should have the correct mast head`, () => {
    Navbar.verifyMastHead();
  });
});
