class Top250tvShows{
    elements = {
        movieNameBox: (movieName) => cy.contains(movieName),
        titleBox: () => cy.get('.ipc-title__text'),
        galleryButton: () => cy.get('[data-testid="mv-gallery-button"]'),
        filterButton: () => cy.get('.ipc-chip-dropdown'),
        morePeopleDropdown: () => cy.get('label[for="Person-filter-select-dropdown"]'),
        personFilterDropdown: () => cy.get('#Person-filter-select-dropdown'),
        actorNameSelector: () => cy.get('.ipc-chip-list__scroller'),
        closeButton: () => cy.get('[data-testid="promptable__x"] > .ipc-icon-button'),
        secondPhotoField: () => cy.get('[data-testid="rm422650113-img-1"]')
    };

    clickOnMovieNameBox(movieName) {
        this.elements.movieNameBox(movieName).click('center', { force: true });
    }
    clickOnPhotosTitleBox(photos) {
        this.elements.titleBox().contains(photos).click();
    }
    clickGalleryButton() {
        this.elements.galleryButton().click();
    }
    clickFilterButton() {
        this.elements.filterButton().click();
    }
    selectMorePeopleDropdown() {
        this.elements.morePeopleDropdown().click({ force: true });
    }
    clickSecondPhoto() {
        this.elements.secondPhotoField().click();
    }
    selectActorOnDropdown(actorName) {
        this.elements.personFilterDropdown().select('nm0001803', { force: true });
        this.elements.actorNameSelector().eq(1).should('contain', actorName);
    }
    clickCloseButton() {
        this.elements.closeButton().click();
    }
}

export default Top250tvShows;