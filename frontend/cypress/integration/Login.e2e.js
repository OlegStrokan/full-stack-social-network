import {getCyElementById} from "../utils/utils";

describe('Login component', () => {

    beforeEach(() => {
        cy.visit('/')
    })
    it('User should be logged', () => {
        getCyElementById('email-input').type('oleg14ua71@gmail.com')
        getCyElementById('password-input').type('258120')
        getCyElementById('login-button').click()
        console.log(cy.url());
        cy.url().should('contain', '/profile/3')
    });
})
