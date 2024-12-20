import ImbsHomePage from '../support/imdbPage';
import ActorPage from '../support/actorPage';
import TopBoxOfficePage from '../support/topBoxOfficePage';
import BornTodayPage from '../support/bornTodayPage';
import Top250tvShows from '../support/top250TVshowsPage'

describe('IMDB.com page test', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Minified React error #418') ||
            err.message.includes('Minified React error #423') ||
            err.message.includes('Minified React error #425')) {
          return false;
        }
        return true;
      });

    const home = new ImbsHomePage();
    const actorPage = new ActorPage();
    const topBoxOfficePage = new TopBoxOfficePage();
    const bornTodayPage = new BornTodayPage();
    const top250tvShows = new Top250tvShows();

    beforeEach(() => {
        cy.intercept('GET', 'https://caching.graphql.imdb.com/?operationName=NavBarFlyoutCTA&variables=%7B%22isLoggedIn%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%222a375844cd5537a920b43e49cdc95896542dc46aa8429e66b407bbe8a749b9c0%22%2C%22version%22%3A1%7D%7D').as('getCookies');
        cy.viewport(1280, 720);
        cy.visit('https://www.imdb.com');
        cy.wait('@getCookies');
    })

    // Go to IMDb.com, search for Nicolas Cage and access his profile; then unfold the Upcoming tab in the Credits section, 
    // and click on the first movie with a Completed tag. We want to make sure that this scenario is working on Chrome and Firefox.
    it('Nicolas Cage Profile Test', () => {
        home.clickPreferencesAcceptButton();
        home.typeSearchActor('Nicolas Cage');
        home.clickActorSearchList('Nicolas Cage');
        actorPage.clickUpcomingButton();
        actorPage.clickFirstActorWithTagInProduction();
    });

    // Go to IMDb.com, unfold the Menu and navigate to the Top Box Office section; then click on the 2nd item on the 
    // Top box office list; then click on the IMDb Rating button, click on the Rate button, and set a 5 stars Rating and 
    // click on the Rate button in the modal
    it('Top Box Office section test', () => {
        cy.intercept('GET', 'https://api.graphql.imdb.com/?operationName=RVI_Items&variables=%7B%22count%22%3A15%2C%22locale%22%3A%22en-US%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%2232eda43bfa1053f69036b945638fc4a0ae6cc4a2429de224b3185f8b0e37717b%22%2C%22version%22%3A1%7D%7D').as('getRatingDialog')
        home.clickPreferencesAcceptButton();
        home.clickMenuButton();
        //home.clickItemTitle('Movies');
        home.clickMenuItem('Top Box Office');
        topBoxOfficePage.clickOnTheSecondItem();
        topBoxOfficePage.clickIMDbRatingButton();
        topBoxOfficePage.clickRatingButton();
        cy.wait('@getRatingDialog');
        topBoxOfficePage.click5StarsButton();
        topBoxOfficePage.clickRateButton();
    })

    // Go to IMDb.com, unfold the Menu button, and navigate to the Top 250 TV Shows section; then click on Breaking Bad, 
    // go to the Photos, display only Danny Trejo's photos, and then click on the 2nd photo in the list.
    it('Top 250 TV Shows section test', () => {
        home.clickPreferencesAcceptButton();
        home.clickMenuButton();
        //home.clickItemTitle('TV Shows');
        home.clickMenuItem('Top 250 TV Shows');
        top250tvShows.clickOnMovieNameBox('Breaking Bad')
        top250tvShows.clickOnPhotosTitleBox('Photos');
        top250tvShows.clickGalleryButton();
        top250tvShows.clickFilterButton();
        top250tvShows.selectMorePeopleDropdown();
        top250tvShows.selectActorOnDropdown('Danny Trejo');
        top250tvShows.clickCloseButton();
        top250tvShows.clickSecondPhoto();
    })

    // Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default search, 
    // then unfold Birthday and search for Celebrities born yesterday. Click on the 3rd name in the 
    // list and take a screenshot.
    it('Born today section tests', () => {
        home.clickPreferencesAcceptButton();
        home.clickMenuButton();
        //home.clickItemTitle('Celebs');
        home.clickMenuItem('Born Today');
        bornTodayPage.clickFilterName('Birthday');
        bornTodayPage.searchActorBornYesterday();
        bornTodayPage.clickThirdName();
        cy.screenshot('3th_actor_bithday');
    });

    // Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default search,
    // then unfold Birth date and search for Celebrities born the same day as today but exactly 40 years ago,
    // using the date picker for the “from” option and the string field for the “to” option. Now on the 1st 
    // result in the list, click on the 1st link you can find on the description (if any) and take a screenshot.
    it('Born today section tests', () => {
        function getDate40YearsAgo() {
            const today = new Date();
            const fortyYearsAgo = new Date(today.setFullYear(today.getFullYear() - 40));
            const year = fortyYearsAgo.getFullYear();
            const month = String(fortyYearsAgo.getMonth() + 1).padStart(2, '0');
            const day = String(fortyYearsAgo.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        const date40YearsAgo = getDate40YearsAgo();

        home.clickPreferencesAcceptButton();
        home.clickMenuButton();
        //home.clickItemTitle('Celebs');
        home.clickMenuItem('Born Today');
        bornTodayPage.deleteDefaultSearchButton();
        bornTodayPage.clickFilterName('Birth date');
        bornTodayPage.typeOnFromDateBox(date40YearsAgo);
        bornTodayPage.typeOnToDateBox(date40YearsAgo);
        bornTodayPage.clickSeeResultsButton();
        bornTodayPage.clickFirstName();
        cy.screenshot('1_actor_40_year_old');
    });
});