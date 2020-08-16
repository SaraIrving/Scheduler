import { useState, useEffect } from "react";
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
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data,
                          appointments: all[1].data,
                          interviewers: all[2].data}))
    });

  }, [])


  // bookInterview is a function which is called inside the save function when the user clicks on the SAVE button in the form when they are creating an interview, it uses the appointment id and the interview object to update the state and then makes an axios put request
  const bookInterview = function(id, interview){

    //return a Promise which holds a put request which updates the appointments with the new interview and then updates the state once the request has completed 
    return new Promise((res, rej) => {
      axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        setState((prev) => {

          //make a copy of prev.appointments and update the interview property of the appointments object that corresponds to the appointment id parameter
          const appointment = {
            ...prev.appointments[id],
            interview: {...interview}
          };
      
          //make a copy of prev.appointments and update it to have a key equal to the appointment id which has a corresponding value equal to the recently updated appointment variable
          const appointments = {
                ...prev.appointments,
                [id] : appointment
          };

           //make a copy of prev.days for us to manipulate, this will be what we use to update the value of days in the setState function
          //loop through it so we only update the spots value in the day object that matches the appointment id parameter
          const days = [...prev.days];
          for (let dayObject of days) {
            for (let appointmentId of dayObject.appointments) {
              if(appointmentId === id) {
                dayObject.spots -= 1;
              }
            }
          }

          return {...prev, appointments, days};
        });
        res(response);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      })

    });
    
  };

  // editInterview is a function which is called inside the save function when the user clicks on the SAVE button in the form when they are finished editing an existing interview , it uses the appointment id and the interview object to update the state and then makes an axios put request
  const editInterview = function (id, interview){

    //return a Promise which holds a put request which updates the appointments with the new interview and then updates the state once the request has completed 
    return new Promise((res, rej) => {
      axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        setState((prev) => {

          //make a copy of prev.appointments and update the interview property of the appointments object that corresponds to the appointment id parameter
          const appointment = {
            ...prev.appointments[id],
            interview: {...interview}
          };
      
          //make a copy of prev.appointments and update it to have a key equal to the appointment id which has a corresponding value equal to the recently updated appointment variable
          const appointments = {
                ...prev.appointments,
                [id] : appointment
          };

          return {...prev, appointments};
        });
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

    // return a promise with a delete request to remove the interview with the corresponding appointment id and then update the state once the delete request is finished 

    return new Promise((res, rej) => {
      axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState((prev) => {

          //make a copy of prev.appointments and update the interview property of the appointments object that corresponds to the appointment id parameter
          const appointment = {
            ...prev.appointments[id],
            interview: null
          };
      
          //make a copy of prev.appointments and update it to have a key equal to the appointment id which has a corresponding value equal to the recently updated appointment variable
          const appointments = {
                ...prev.appointments,
                [id] : appointment
          };

          //make a copy of prev.days for us to manipulate, this will be what we use to update the value of days in the setState function
          //loop through it so we only update the spots value in the day object that matches the appointment id parameter
          const days = [...prev.days];
          for (let dayObject of days) {
            for (let appointmentId of dayObject.appointments) {
              if(appointmentId === id) {
                dayObject.spots += 1;
              }
            }
          }

          return {...prev, appointments, days};
        });
        res(response);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      })

    });
    
  };
 
  return {
          state,
          setDay,
          bookInterview,
          editInterview,
          cancelInterview
          };

}