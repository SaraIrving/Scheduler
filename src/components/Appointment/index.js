import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment (props) {

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  console.log('props inside Appointment component = ', props);

  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview);
  }
    
  return (
    <article className="appointment">
      <Header 
      time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={event => back()} />}
      
    </article>
  )
}