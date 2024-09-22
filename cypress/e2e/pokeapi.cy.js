describe('PokeAPI Tests', () => {
    const baseUrl = 'https://pokeapi.co/api/v2/berry';
  
    it('should get a berry by valid id', () => {
      cy.request(`${baseUrl}/1`)
        .its('status')
        .should('equal', 200);
  
      cy.request(`${baseUrl}/1`).then((response) => {
        expect(response.body.name).to.exist; // Asegúrate de que el cuerpo tiene un nombre
      });
    });
  
    it('should return an error for invalid id', () => {
      cy.request({
        url: `${baseUrl}/99999`, // ID que no existe
        failOnStatusCode: false, // No fallar en el código de estado
      }).its('status')
        .should('equal', 404);
    });
  
    it('should get a berry by valid name', () => {
      cy.request(`${baseUrl}/cheri`)
        .its('status')
        .should('equal', 200);
  
      cy.request(`${baseUrl}/cheri`).then((response) => {
        expect(response.body.name).to.equal('cheri'); // Verifica que el nombre sea correcto
      });
    });
  
    it('should return an error for invalid name', () => {
      cy.request({
        url: `${baseUrl}/invalidname`, // Nombre que no existe
        failOnStatusCode: false, // No fallar en el código de estado
      }).its('status')
        .should('equal', 404);
    });
  
    it('should get berry flavor by valid name', () => {
      cy.request('https://pokeapi.co/api/v2/berry-flavor/spicy')
        .its('status')
        .should('equal', 200);
    });
  
    it('should find the berry with the highest potency in spicy flavor', () => {
      cy.request('https://pokeapi.co/api/v2/berry-flavor/spicy').then((response) => {
        const berries = response.body.berries;
  
        // Encuentra la berry con mayor potencia
        const berryWithHighestPotency = berries.reduce((prev, curr) => {
          return (prev.potency > curr.potency) ? prev : curr;
        });
  
        // Llamar a la API con la berry encontrada
        return cy.request(`${baseUrl}/${berryWithHighestPotency.berry.name}`)
          .its('status')
          .should('equal', 200);
      });
    });
  });