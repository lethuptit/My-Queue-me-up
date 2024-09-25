const { already_exist_user_email, already_exist_user_pw,
  invalid_test_email, invalid_test_pw,
  valid_test_email, valid_test_pw
} = Cypress.env();

describe('Test signup form', () => {
  beforeEach(() => {
    cy.visit("/signup")
  })

  it.only('Validating email existed', () => {
    cy.getDataFromCypress("cy_emailinput").type(already_exist_user_email);
    cy.getDataFromCypress("cy_passwordinput").type(already_exist_user_pw);
    cy.getDataFromCypress("cy_submitbtn").click();
    cy.getDataFromCypress("cy_emailerrormsg").contains("* Email is already in use")
  })


  it.only('Validating email empty', () => {
    //cy.getDataFromCypress("cy_emailinput").type("");
    cy.getDataFromCypress("cy_passwordinput").type(invalid_test_pw);
    cy.getDataFromCypress("cy_submitbtn").click();
     cy.getDataFromCypress("cy_emailerrormsg").contains("* Invalid email format");

    // cy.getDataFromCypress("cy_emailinput")
    //   .invoke('prop', 'validationMessage')
    //   .should('equal', 'Please fill out this field.')
  })

  it.only('Validating password invalied format', () => {
    //cy.get('#email').clear().type(valid_test_email)
    cy.getDataFromCypress("cy_emailinput").type(valid_test_email);
    cy.getDataFromCypress("cy_passwordinput").type(invalid_test_pw);
    cy.getDataFromCypress("cy_submitbtn").click();
    cy.getDataFromCypress("cy_passworderrormsg").contains("* Password must be at least 6 characters long")
  })
  
  it('Validating email invalied format', () => {
    cy.getDataFromCypress("cy_emailinput").type(invalid_test_email);
    cy.getDataFromCypress("cy_passwordinput").type(invalid_test_pw);
    cy.getDataFromCypress("cy_submitbtn").click();
    cy.getDataFromCypress("cy_emailerrormsg").contains("* Invalid email format");

    // cy.get('#form-validation').within(() => {
    //   cy.getDataFromCypress("cy_passwordinput").type(invalid_test_pw).invoke('prop', 'validationMessage')
    //     .should('equal', "Please include an '@' in the email address.");
    // })

    // cy.getDataFromCypress("cy_emailinput").then(($input) => {
    //   expect($input[0].validationMessage).to.include(
    //     `Please include an '@' in the email address. 'witgmail.com' is missing an '@'.`
    //   )
    // })
  })

 

  it.only('Navigating to login page', () => {
    cy.getDataFromCypress("cy_emailinput").type(valid_test_email);
    cy.getDataFromCypress("cy_passwordinput").type(valid_test_pw);
    cy.getDataFromCypress("cy_submitbtn").click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal("Your account has been created.")
      cy.on('window:confirm', () => true)
      cy.location("pathname").should("eq", "/login")
    })
  })
})