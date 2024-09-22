describe('IMDB.com page test', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Minified React error #418') ||
            err.message.includes('Minified React error #423') ||
            err.message.includes('Minified React error #425')) {
          return false;
        }
        return true;
      });
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit('https://www.imdb.com');
    })

    // Go to IMDb.com, search for Nicolas Cage and access his profile; then unfold the Upcoming tab in the Credits section, 
    // and click on the first movie with a Completed tag. We want to make sure that this scenario is working on Chrome and Firefox.
    it('Nicolas Cage Profile Test', () => {
        //cy.visit('https://www.imdb.com');
        cy.get('input[name="q"]').type('Nicolas Cage{enter}');
        cy.contains('Nicolas Cage').click();
        cy.contains('Upcoming').first().click();
        cy.get('.ipc-metadata-list-summary-item').then(($list) => {
            const firstMovie = Cypress._.find($list, (el) => {
                const text = Cypress.$(el).find('.ipc-inline-list').text(); 
                return text.includes('In Production');
            });

            if (firstMovie) {
                cy.wrap(firstMovie).find('.ipc-metadata-list-summary-item__t').invoke('text').then((movieName) => {
                    const movieTitle = movieName.trim();
                    cy.wrap(firstMovie).find('.ipc-metadata-list-summary-item__t').click();
                    cy.wait(4000);
                    cy.get('.hero__primary-text').invoke('text').should('include', movieTitle);
                });
            } else {
                cy.log('No movie found with "In Production" tag');
            }
        });
    });

    // Go to IMDb.com, unfold the Menu and navigate to the Top Box Office section; then click on the 2nd item on the 
    // Top box office list; then click on the IMDb Rating button, click on the Rate button, and set a 5 stars Rating and 
    // click on the Rate button in the modal
    it('Top Box Office section test', () => {
        //cy.visit('https://www.imdb.com');
        cy.wait(2000);
        const selectYourPreferences = cy.get('[data-testid="accept-button"]');
        selectYourPreferences.click();
        cy.get('#imdbHeader-navDrawerOpen').click();
        //cy.get('.navlinkcat__itemTitle').contains('Movies').click()
        cy.contains('Top Box Office').click();
        cy.get('.ipc-metadata-list-summary-item.sc-10233bc-0.TwzGn.cli-parent').eq(1).children().first().click();
        cy.get('.sc-eb51e184-0.ghvwpw').first().click();
        cy.get('.ipc-btn__text').contains('Rate').click();
        cy.wait(1000);
        cy.get('button.ipc-starbar__rating__button[aria-label="Rate 5"]').click({ force: true });
        cy.get('.ipc-rating-prompt__rating-container > .ipc-btn').contains('Rate').click();
        cy.wait(1000);
    })

    // Go to IMDb.com, unfold the Menu button, and navigate to the Top 250 TV Shows section; then click on Breaking Bad, 
    // go to the Photos, display only Danny Trejo's photos, and then click on the 2nd photo in the list.
    it('Top 250 TV Shows section test', () => {
        //cy.visit('https://www.imdb.com');
        cy.wait(2000);
        const selectYourPreferences = cy.get('[data-testid="accept-button"]');
        selectYourPreferences.click();
        cy.get('#imdbHeader-navDrawerOpen').click();
        //cy.get('.navlinkcat__itemTitle').contains('TV Shows').click()
        cy.contains('Top 250 TV Shows').click();
        cy.contains('Breaking Bad').click('center', { force: true });
        cy.wait(2000);
        cy.get('.ipc-title__text').contains('Photos').click();
        //falla
    })

    // Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default search, then unfold Birthday 
    // and search for Celebrities born yesterday. Click on the 3rd name in the list and take a screenshot.
    it('Born today section tests', () => {
        //cy.visit('https://www.imdb.com');
        cy.wait(2000);
        const selectYourPreferences = cy.get('[data-testid="accept-button"]');
        selectYourPreferences.click();
        cy.get('#imdbHeader-navDrawerOpen').click();
        //cy.get('.navlinkcat__itemTitle').contains('Celebs').click();
        cy.contains('Born Today').click();
        cy.wait(1000);
        cy.get('.ipc-accordion__item__title').contains('Birthday').click();
        cy.get('[data-testid="birthday-input-test-id"]')
        .invoke('val')  
        .then((birthdayValue) => {
            const birthday = birthdayValue;
            let [month, day] = birthdayValue.split('-');
            day = parseInt(day) - 1;  
            if (day < 1) {
                month = parseInt(month) - 1; 
                if (month === 0) { month = 12; }
                const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  
                day = daysInMonth[month - 1];  
            }
        
            const newBirthday = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            cy.get('svg.ipc-icon.ipc-icon--clear.ipc-icon--inline.ipc-chip__post-icon').click({ force: true });
            cy.get('[data-testid="birthday-input-test-id"]').clear().type(newBirthday + '{enter}');
            cy.get('[data-testid="adv-search-get-results"]').click();
        });
        cy.get('[data-testid="nlib-title"]').eq(2).click();
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
            return `${year}-${month}-${day}`;  // Formato YYYY-MM-DD
        }
        const date40YearsAgo = getDate40YearsAgo();

        //cy.visit('https://www.imdb.com');
        cy.wait(2000);
        const selectYourPreferences = cy.get('[data-testid="accept-button"]');
        selectYourPreferences.click();
        cy.get('#imdbHeader-navDrawerOpen').click();
        //cy.get('.navlinkcat__itemTitle').contains('Celebs').click();
        cy.contains('Born Today').click();
        cy.get('svg.ipc-icon.ipc-icon--clear.ipc-icon--inline.ipc-chip__post-icon').click({ force: true }); 
        cy.contains('Birth date').click();
        cy.get('input[data-testid="birthDate-start"]').clear().type(date40YearsAgo);  
        cy.get('input[data-testid="birthDate-end"]').clear().type(date40YearsAgo);
        cy.get('[data-testid="adv-search-get-results"]').click();
        cy.get('[data-testid="nlib-title"]').first().click();
        cy.screenshot('1_actor_40_year_old');
    });
});
  