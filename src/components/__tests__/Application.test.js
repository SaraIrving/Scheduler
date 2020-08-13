import React from "react";
import axios from "axios";


import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, waitForElementToBeRemoved, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";



describe("Application", () => {

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });
  


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];


    // simulate clicking on the add appointment icon
    fireEvent.click(getByAltText(appointment, "Add"));

    // simulate filling in name in the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // simulate selecting an interviewer from the list of options by searching for the interviewers name with is the alternate text for the image, name comes from first interviewer in the list of fake data in mocks
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // simulate clicking the save button
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))

    expect(getByText(appointment, /Lydia Miller-Jones/i)).toBeInTheDocument();

    // get an array of the days, find the one that has the text "Monday"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    //1. Render the Application
    const { container, debug } = render(<Application />);

    //2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

     //3. Click the "delete" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));


    fireEvent.click(queryByAltText(appointment, "Delete"));
 

    //4. Check that the confirmation message is shown
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    

    //5. Click the "confirm" button on the confirmation
    fireEvent.click(queryByText(appointment, "Confirm"));

    //6. Check that the element with the text "Deleting" is displayed 
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
   

    //7. Wait until the element with the "Add" button is displayed
    await waitForElement(() => queryByAltText(appointment, "Add"));
    

    //8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));


    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    //1.Render the Application
    const { container, debug } = render(<Application />);

    //2.Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3.Click the "Edit" button on Archie's booked appointment 
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    //4.Simulate the name being changed to "Archie Andrews"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archie Andrews" }
    });

     // 5. simulate clicking the save button
     fireEvent.click(getByText(appointment, "Save"));

     //6. Check that "Saving" is in the document
     expect(getByText(appointment, "Saving")).toBeInTheDocument();
 
     await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
 
     //7. Check that the name has been updated
     const editedAppointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Andrews"));

     expect(getByText(editedAppointment, /Archie Andrews/i)).toBeInTheDocument();

     //8. Check that the DayListItem with the text "Monday" still has 1 spot remaining
     const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));


    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("shows a save error when failing to save an appointment", async () => {

    axios.put.mockRejectedValueOnce();

     //1.Render the Application
     const { container, debug } = render(<Application />);

     //2.Wait until the text "Archie Cohen" is displayed
     await waitForElement(() => getByText(container, "Archie Cohen"));
  
    //3. simulate clicking on the add appointment icon
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    //4.  simulate filling in name in the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //5. simulate selecting an interviewer from the list of options 
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //6. simulate clicking the save button
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))

    //7. expect the error message to show, 
    expect(getByText(appointment, "Could not save your appointment")).toBeInTheDocument();

    //8. simulate clicking on the close button of the error
    fireEvent.click(getByAltText(appointment, "Close"));

    //9. after clicking on the close button we should be returned to the Form in Create Mode, which should show the Save button
    expect(getByText(appointment, "Save")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();

    //1.Render the Application
    const { container, debug } = render(<Application />);

    //2.Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "delete" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));
 
    //4. Check that the confirmation message is shown
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    
    //5. Click the "confirm" button on the confirmation
    fireEvent.click(queryByText(appointment, "Confirm"));

  
    //6. Check that the element with the text "Deleting" is displayed 
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"))
   
    //7. expect the error message to show, 
    expect(getByText(appointment, "Could not delete your appointment")).toBeInTheDocument();

    //8. simulate clicking on the close button of the error
    fireEvent.click(getByAltText(appointment, "Close"));

    //9. should be taken back to the show state, where would  expect out appointment to still be there showing the name Archie Cohen
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

  });

});




