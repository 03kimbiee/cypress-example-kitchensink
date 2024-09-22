class ActorPage {
    elements = {
        upcominButton: () => cy.contains('Upcoming'),
        getUpcomingList: () => cy.get('.ipc-metadata-list-summary-item'),
        tagBoxText: (el) => Cypress.$(el).find('.ipc-inline-list').text(),
        selectMovieNameBox: (movie) => cy.wrap(movie).find('.ipc-metadata-list-summary-item__t'),
        getMovieNameText: () => cy.get('.hero__primary-text').invoke('text')
    };

    clickUpcomingButton() {
        this.elements.upcominButton().first().click();
    }
    clickFirstActorWithTagInProduction(){
        this.elements.getUpcomingList().then(($list) => {
            const firstMovie = Cypress._.find($list, (el) => {
                const text = this.elements.tagBoxText(el);
                return text.includes('In Production');
            });

            if (firstMovie) {
                this.elements.selectMovieNameBox(firstMovie).invoke('text').then((movieName) => {
                    const movieTitle = movieName.trim();
                    this.elements.selectMovieNameBox(firstMovie).click();
                    cy.wait(4000);
                    this.elements.getMovieNameText().should('include', movieTitle);
                });
            } else {
                cy.log('No movie found with "In Production" tag');
            }
        });
    }
}

export default ActorPage;
