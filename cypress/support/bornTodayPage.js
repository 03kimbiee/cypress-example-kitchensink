class BornTodayPage {
    elements = {
        getNameFilter: () => cy.get('.ipc-accordion__item__title'),
        getBirthdayInput: () => cy.get('[data-testid="birthday-input-test-id"]'),
        getDefaultSearchButton: () => cy.get('svg.ipc-icon.ipc-icon--clear.ipc-icon--inline.ipc-chip__post-icon'),
        getActorName: () => cy.get('[data-testid="nlib-title"]'),
        getSeeResultsButton: () => cy.get('[data-testid="adv-search-get-results"]'),
        getFromDateBox: () => cy.get('input[data-testid="birthDate-start"]'),
        getToDateBox: () => cy.get('input[data-testid="birthDate-end"]'),
    };

    clickFilterName(name) {
        this.elements.getNameFilter().contains(name).click();
    }
    searchActorBornYesterday() {
        this.elements.getBirthdayInput()
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
            //this.elements.getDefaultSearchButton().click({ force: true });
            this.deleteDefaultSearchButton();
            this.elements.getBirthdayInput().clear().type(newBirthday + '{enter}');
            this.clickSeeResultsButton();
        });
    }
    clickThirdName() {
        this.elements.getActorName().eq(2).click();
    }
    clickFirstName(){
        this.elements.getActorName().first().click();
    }
    deleteDefaultSearchButton() {
        this.elements.getDefaultSearchButton().click({ force: true });
    }
    typeOnFromDateBox(date40YearsAgo){
        this.elements.getFromDateBox().clear().type(date40YearsAgo);  
    }
    typeOnToDateBox(date40YearsAgo){
        this.elements.getToDateBox().clear().type(date40YearsAgo);
    }
    clickSeeResultsButton(){
        this.elements.getSeeResultsButton().click();
    }

}

export default BornTodayPage