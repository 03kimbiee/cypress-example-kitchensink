class TopBoxOfficePage{
    elements = {
        getMovieList: () => cy.get('.ipc-metadata-list-summary-item.sc-10233bc-0.TwzGn.cli-parent'),
        getIMDbRatingButton: () => cy.get('.sc-eb51e184-0.ghvwpw'),
        getRatingSelector: () => cy.get('[data-testid="rating-button__user-rating__unrated"]'),
        get5StarsButton: () => cy.get('button.ipc-starbar__rating__button[aria-label="Rate 5"]'),
        getRatingButton: () => cy.get('.ipc-rating-prompt__rating-container > .ipc-btn')
    };

    clickOnTheSecondItem() {
        this.elements.getMovieList().eq(1).children().first().click();
    }
    clickIMDbRatingButton(){
        this.elements.getIMDbRatingButton().first().click();
    }
    clickRatingButton(){
        this.elements.getRatingSelector().contains('Rate').click();
    }
    click5StarsButton(){
        this.elements.get5StarsButton().click({ force: true });
    }
    clickRateButton(){
        this.elements.getRatingButton().contains('Rate').click();
    }
}

export default TopBoxOfficePage;