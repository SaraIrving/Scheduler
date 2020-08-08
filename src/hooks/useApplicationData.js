import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {

  //create state object the contains all values and updates all values except for day which is updated via setDay
  const [state, setState] = useState({day: "Monday",
                                    days: [],
                                    appointments: {},
                                    interviewers: {}
                                  });

  const setDay = day => setState({ ...state, day });

  
  // make multiple GET request to the server to get the data we need for the initial render of the page the update state with the data retrieved from the database
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

  }, [])

  const spotsRemaining = function (state, id) {
    //state is the state
    //id is the appointment id

    //make a copy of state.days for us to manipulate

    //given the list of appointments in state.appointments, filter out the onces that have an interview booked into an object that will have keys which are the appointment ids and values which are the appointment objects
   

    //loop through the object of appointments that have interviews booked and see how many of the keys match the appointment id's stored in the appointments array of each day objects in state.days, whenever they match, increase the count by one

    //subtract the count value from 5 to get the number of spots remaining

    //return spots remaining which represent the available spots left on the specified day 


  }

  // bookInterview is a function which is called inside the save function when the user clicks on the SAVE button in the form when they are creating an interview or after they have edited an existing interview, it uses the appointment id and the interview object to update the state and then makes an axios put request
  function bookInterview(id, interview){

    const appointment = {
                          ...state.appointments[id],
                          interview: {...interview}
                        };
    
    const appointments = {
                          ...state.appointments,
                          [id] : appointment
    };

    //return a Promise which holds a put request which updates the appointments with the new interview and then updates the state once the request has completed 
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

  // cancelInterview is a function that is called inside of the deleteAppointment function when the user clicks the icon to delete an existing appointment, it uses the appointment id to update the state and then makes an axios delete request 
  const cancelInterview = function(id) {
    //use appointment id to find the right appointment and set it's interview data to null
    //we have the appointment array of appointment objects that we made with getAppointmentsForDay

    //loop thorough appointments array and find the object with an id that matches the appointment id argument:
   
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
          ...state.appointments,
          [id] : appointment
    };

    
    // return a promise with a delete request to remove the interview with the corresponding appointment id and then update the state once the delete request is finished 

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

  console.log("HOOK:, state.days = ", state.days)
  console.log("HOOK:, state.appointments = ", state.appointments)
 
  return {
          state,
          setDay,
          bookInterview,
          cancelInterview
          };

}