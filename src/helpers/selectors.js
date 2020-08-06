import React from "react";

export function getAppointmentsForDay(state, day) {

  //check 
  if (state.days.length !== 0){

    //find the array that contains all the day objects
    const daysArray = state.days;

    //find the object who's name matches the provided day
    let dayObj;
    for (let eachObj of daysArray) {
      if( eachObj.name === day) {
        dayObj = eachObj;
      }
    } 
    

    //check to see that the day could be found  
    if (dayObj) {

      //access the appointments array out of dayObj
      let apptArray = dayObj.appointments;
      

      //iterate through apptArray and compare where it's id matches the id of states.appointments and return that value
      //build up an array of appointment objects and return that
      //need to be able to also iterate over the keys of state.appointments

      let appointmentsForDay = [];

      for (let id of apptArray) {
        for (let apt in state.appointments) {
          if (id === Number(apt)) {
            appointmentsForDay.push(state.appointments[apt]);
          }

        }
      }
      return appointmentsForDay;
    } else {
      return [];
    }
  } else {
    return [];
  }
}