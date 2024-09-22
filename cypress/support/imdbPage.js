class ImbsHomePage {
    elements = {
        inputSearch: () => cy.get('input[name="q"]'),
        suggestionSearchList: (actor) => cy.contains(`${actor}`),
        getPreferencesAcceptButton: () => cy.get('[data-testid="accept-button"]'),
        getMenuButton: () => cy.get('#imdbHeader-navDrawerOpen'),
        getItemTitle: () => cy.get('.navlinkcat__itemTitle'),
        getMenuItem: (menuItem) => cy.contains(menuItem),
    };

    typeSearchActor(actor) {
        this.elements.inputSearch().type(`${actor}{enter}`);
    }
    clickActorSearchList(actor) {
        this.elements.suggestionSearchList(actor).click();
    }
    clickPreferencesAcceptButton() {
        this.elements.getPreferencesAcceptButton().click();
    }
    clickMenuButton() {
        this.elements.getMenuButton().click();
    }
    clickItemTitle(title) {
        this.elements.getItemTitle().contains(title).click();
    }
    clickMenuItem(menuItem) {
        this.elements.getMenuItem(menuItem).click();
    }
}

export default ImbsHomePage;