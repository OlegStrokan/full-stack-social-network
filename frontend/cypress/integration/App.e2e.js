import {getCyElementById} from "../utils/utils";

describe('App component', () => {

  beforeEach(() => {
    cy.visit('/')
  })
  it('App component should be render without navbar',  () => {
    getCyElementById('app-component').should('exist')
    getCyElementById('navbar').should('not.exist')

  });
})
