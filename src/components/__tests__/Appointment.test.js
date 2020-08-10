import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment/index";

/*
key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview} */


describe("Appointment", () => {

  const interview = {
    student: "Lydia Millier Jones",
    interviewer: { id: 1, name: "Bob", avatar: "http://something"}
  };

  it("renders without crashing", () => {
    render(<Appointment interview={interview}/>);
  });

});
