describe('PokeAPI Tests', () => {
// Each of the URLs was tested and verified using Postman.
  const berryUrl = 'https://pokeapi.co/api/v2/berry';
  const berryFlavorUrl = 'https://pokeapi.co/api/v2/berry-flavor';

  //Make sure we can call https://pokeapi.co/api/v2/berry/{id or name}/ using a valid id, 
  //and we get expected response
  it('Should return a valid response for a valid berry ID', () => {
    cy.request({
      method: 'GET',
      url: `${berryUrl}/1/`,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
    });
  });
  
  //Check error is appearing when calling with invalid id
  it('Should return an error for an invalid berry ID', () => {
    cy.request({
      method: 'GET',
      url: `${berryUrl}/99999`, 
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404);
    });
  });
  
  //Make sure we can call https://pokeapi.co/api/v2/berry/{id or name}/ 
  //using a valid name, and we get expected response
  it('Should return a valid response for a valid berry name', () => {
    cy.request({
      method: 'GET',
      url: `${berryUrl}/cheri`,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
      expect(response.body.name).to.equal('cheri');
    })
  });
  
  //- Check error is appearing when calling with invalid name
  it('Should return an error for an invalid berry name', () => {
    cy.request({
      method: 'GET',
      url: `${berryUrl}/invalidname`, 
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404);
    });
  });

  //Make sure we can call https://pokeapi.co/api/v2/berry-flavor/{id or name}/ using a valid name, 
  //and we get the expected response.
  it('Should return a valid response for a valid berry flavor name', () => {
    cy.request({
      method: 'GET',
      url: `${berryFlavorUrl}/spicy`,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
    })
  });
  
  // Then, pick up all the berries with “spicy” flavour, check the name of the one with more 
  // “potency”, and call https://pokeapi.co/api/v2/berry/{id or name}/ using that info, making 
  // sure we get the expected responses.
  it('Should return the berry with the highest potency for the spicy flavor', () => {
    cy.request({
      method: 'GET',
      url: `${berryFlavorUrl}/spicy`,
    }).then((response) => {
      const berries = response.body.berries;
      const spicyBerries = berries.filter(berry => berry.potency > 0);
      const berryWithHighestPotency = spicyBerries.reduce((max, current) => {
        return max.potency > current.potency ? max : current;
      }, spicyBerries[0]);

    cy.request(`${berryUrl}/${berryWithHighestPotency.berry.name}/`).then(response =>{
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
      })
    });
  });
});