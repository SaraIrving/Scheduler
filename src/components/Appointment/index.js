import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMDELETE = "CONFIRMDELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment (props) {

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  console.log('APPOINTMENT: props = ', props);

  // save is called when a user clicks the save button on the form after putting in their details to book an appointment
  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    if (mode === EDIT) {
      props.editInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(error => transition(ERROR_SAVE, true));

    } else {
      // make a put request, when it completes transition to SHOW mode
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch(error => transition(ERROR_SAVE, true));

    }

    

  };
    
  // deleteAppointment is a function that runs when a user clicks the icon to delete an existing appointment
  function deleteAppointment() {
   

    transition(DELETING, true);

    //make a delete request, when it finished transition to EMPTY mode
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(error => transition(ERROR_DELETE, true));

  }



  return (
    <article className="appointment" data-testid="appointment">
      <Header 
      time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={event => transition(CONFIRMDELETE)} onEdit={event => transition(EDIT)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={event => back()} />}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === DELETING && <Status message={'Deleting'}/>}
      {mode === CONFIRMDELETE && <Confirm message={"Are you sure you want to delete?"} onCancel={event => back()} onConfirm={deleteAppointment}/>}
      {mode === EDIT && <Form name={props.interview.student} value={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={event => back()}/>}
      {mode === ERROR_SAVE && <Error onClose={event => back()} message={"Could not save your appointment"}/>}
      {mode === ERROR_DELETE && <Error onClose={event => back()} message={"Could not delete your appointment"}/>}
      
      
    </article>
  )
}