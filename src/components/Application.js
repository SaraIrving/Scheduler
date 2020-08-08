import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({day: "Monday",
                                    days: [],
                                    appointments: {},
                                    interviewers: {}
                                  });

  const setDay = day => setState({ ...state, day });

  //const setDays = days => setState(prev => ({ ...prev, days }));
                          


  useEffect(() => {

    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
    .then((all) => {
      console.log(all[2].data);
      setState(prev => ({...prev, days: all[0].data,
                          appointments: all[1].data,
                          interviewers: all[2].data}))
    });

    //axios.get('/api/days')
    //.then((response) => {setDays(response.data)});
  }, [])

  const appointments = getAppointmentsForDay(state, state.day)

  const interviewers = getInterviewersForDay(state, state.day);
  console.log('state = ', state);
  console.log('state.day = ', state.day);
  console.log('interviewers = ', interviewers);


  function bookInterview(id, interview){
    const appointment = {
                          ...state.appointments[id],
                          interview: {...interview}
                        };
    
    const appointments = {
                          ...state.appointments,
                          [id] : appointment
    };

    return new Promise((res, rej) => {
      axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        setState({...state, appointments});
        res(response);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      })

    });
    
  };

  const cancelInterview = function(id) {
    //use appointment id to find the right appointment and set it's interview data to null
    //we have the appointment array of appointment objects that we made with getAppointmentsForDay
    // console.log('APPLICATION: appointments = ', appointments);
    // console.log('APPLICATION: id parameter = ', id);

    //loop thorough appointments array and find the object with an id that matches the appointment id argument:
   
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
          ...state.appointments,
          [id] : appointment
    };

    
    //now make a delete request to update the value of interview at the given appointment id

    return new Promise((res, rej) => {
      axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({...state, appointments});
        res(response);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      })

    });
    
  };


  const appointmentsList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    );
  });

  console.log('state.appointments within Application = ', typeof state.appointments)


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment key="last" time="5pm" interviewers={interviewers} bookInterview={bookInterview} cancelInterview={cancelInterview}/>
      </section>
    </main>
  );
}
