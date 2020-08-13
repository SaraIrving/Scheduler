

describe("Appointments", () => {

  beforeEach(() => {
     //reset the database
     cy.request("GET", "/api/debug/reset");

     //goes to root and waits for data to load
     cy.visit("/");
    
     cy.contains("Monday");

  })
  
  it("should book an interview", () => {

    //clicks the add button on the second appointment 
    cy.get("[alt=Add").first().click();

    //type "Lydia Miller-Jones" into the student input field
    cy.get("[data-testid='student-name-input']").type("Lydia Miller-Jones");

    // choose "Sylvia Palmer" as the interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // clicks the Save button
    cy.contains("Save").click();

    // wait until we can see the appointment, verify that we show the student and interviewer names within and element that has the ".appointment__card--show" class.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {

    // clicks the edit button of the appointment of Archie Cohen
    cy.get("[alt='Edit']").first().click({force:true});

    //clear the input and change the name of the student on the booking 
    cy.get("[data-testid='student-name-input']").clear().type("Lydia Miller-Jones");

    // choose "Tori Malcolm" as the interviewer
     cy.get("[alt='Tori Malcolm']").click();

    // clicks the Save button
    cy.contains("Save").click();

    // wait until we can see the appointment, verify that we show the student and interviewer names within and element that has the ".appointment__card--show" class.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {

     // clicks the delete button of the appointment of Archie Cohen
     cy.get("[alt='Delete']").first().click({force:true});

     // clicks the Confirm button
     cy.contains("Confirm").click();

     // check that the "Deleting" indicator exists
     cy.contains("Deleting").should('exist');

     // check that "Deleting" indicator no longer exists
     cy.contains("Deleting").should('not.exist');

     // check that the ".appointment__card--show" element that contains the text "Archie Cohen" should not exist
     cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');

  });

})