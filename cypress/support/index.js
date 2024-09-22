Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific errors that you don't want to fail the test for
    if (err.message.includes('Invariant Violation')) {
      return false; // Prevent Cypress from failing the test
    }
    // Let other errors fail the test
  });
  