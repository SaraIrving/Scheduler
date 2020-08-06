import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "BoBo McGee",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }, 
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Bob Dog",
//       interviewer: {
//         id: 1,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Felix Cat",
//       interviewer: {
//         id: 1,
//         name: "Sven Jones",
//         avatar:  "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
// ];




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

  const appointmentsList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />
    );
  });

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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentsList}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
