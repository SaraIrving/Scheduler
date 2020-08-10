// import React from "react";
import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form (props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function () {
    reset();
    props.onCancel();
  }

  console.log('FORM: props.value = ', props.value);
  console.log('FORM: props.name = ', props.name)


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
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={(event) => cancel()} danger>Cancel</Button>
      <Button onClick={(event) => props.onSave(name, interviewer)} confirm>Save</Button>
    </section>
  </section>
</main>




  )


}