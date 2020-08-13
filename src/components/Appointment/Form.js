
import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form (props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);
  const [error, setError] = useState("");

  //reset the name to be an empty string and the interviewer to be null
  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  //calls resent and then invokes the function handed down in props
  const cancel = function () {
    reset();
    props.onCancel();
  };

  //checks to see that a name has been inputted before saving, if the input box is blank is displays an error message
  const validate = function () {
    if(name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  };


  return (

    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" >
      <input
        data-testid='student-name-input'
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        /*
          This must be a controlled component
        */
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={(event) => cancel()} danger>Cancel</Button>
      <Button onClick={(event) => validate()} confirm>Save</Button>
    </section>
  </section>
</main>

  );
};