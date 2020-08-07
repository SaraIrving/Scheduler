

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


export function getInterview(state, interview) {

  //This is a sample of what we want to return from this function
  // {  
  //   "student": "Lydia Miller-Jones",
  //   "interviewer": {  
  //     "id": 1,
  //     "name": "Sylvia Palmer",
  //     "avatar": "https://i.imgur.com/LpaY82x.png"
  //   }
  // }
  

  if(interview) {

  // declare the object we want to return 
  let interviewObj = {};

  // assign the student key with the value of student from teh interview prop
  interviewObj["student"] = interview.student;

  //loop through state.interviewers and find the one that matches the interview id form  the interview prop
  for (let id in state.interviewers) {
    
    if (Number(id) === interview.interviewer) {
      //then put the value of that id key as the value of interviewer in interviewObj
      interviewObj["interviewer"] = state.interviewers[id];
    }
  }
  return interviewObj;

  } else {
    return null;
  }

};



export function getInterviewersForDay(state, day) {

  //this function should return an array of interviewer objects

  //use the day argument to locate the correct day object inside state
  //pull out the interviewers array from that which contains the id's of the interviewers available on the specified day 
  //make a new array that holds the interviewer objects represented by the id's 
  //return that new array of interviewer objects 

  //check that the day argument provided matches a day in the state, if not return an empty array
  //return an empty array when there are no interviewers available in the state


  //check to see if there are any interviewers in the state ie: does the interviewer key have value and if there are days in the days array in the state
  if (state.interviewers && state.days.length !== 0) {

    // find the days array in the state
    const daysArray = state.days;

    //find the day object that matches the day argument
    let dayObj;
    for (let eachObj of daysArray) {
      if( eachObj.name === day) {
        dayObj = eachObj;
      }
    } 

    //check to see that the day could be found  
    if (dayObj) {
    
      //access the interviewers array out of dayObj
      const interviewersIdArray = dayObj.interviewers;
      
      const interviewersObjArray = [];

      for (let id of interviewersIdArray) {
        for (let interviewer in state.interviewers){
          if (id === Number(interviewer)) {
            interviewersObjArray.push(state.interviewers[interviewer]);
          }
        } 
      };

      return interviewersObjArray;

    } else {
      return [];
    }
  } else {
    return [];
  }
}
 