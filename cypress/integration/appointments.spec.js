

describe("Appointments", () => {

  beforeEach(() => {
     //reset the database
     cy.request("GET", "/api/debug/reset");

     //goes to root and waits for data to load
     cy.visit("/");
    
     cy.contains("Monday");

  })
  
  it("should book an interview", () => {
    // //reset the database
    // cy.request("GET", "/api/debug/reset");

    // //goes to root and waits for data to load
    // cy.visit("/");
    
    // cy.contains("Monday");

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


  })
})