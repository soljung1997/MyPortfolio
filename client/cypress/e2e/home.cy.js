describe('Portfolio homepage', () => {
  it('loads home and shows hero content', () => {
    cy.visit('/');
    cy.findByRole('heading', { name: /welcome to my portfolio/i }).should('be.visible');
    cy.findByText(/jee won jung/i).should('be.visible');
    cy.findAllByRole('link', { name: /about me/i }).its('length').should('be.gte', 1);
  });

  it('navigates to About Me via navbar', () => {
    cy.visit('/');
    // click the About Me link in the navbar (first match is fine here)
    cy.findAllByRole('link', { name: /about me/i }).first().click();
    cy.url().should('include', '/about');
    // optional: assert a heading if your About page has one
    // cy.findByRole('heading', { name: /about/i }).should('be.visible');
  });

  it('navigates to Projects and Services via navbar', () => {
    cy.visit('/');
    cy.findByRole('link', { name: /projects/i }).click();
    cy.url().should('include', '/projects');

    cy.findByRole('link', { name: /services/i }).click();
    cy.url().should('include', '/services');
  });
});
