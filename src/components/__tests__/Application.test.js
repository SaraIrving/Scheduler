import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, waitForElementToBeRemoved, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

import { act } from 'react-dom/test-utils';

afterEach(cleanup);

describe("Application", () => {

  

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
    debug();

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


    debug();



  } )

});




