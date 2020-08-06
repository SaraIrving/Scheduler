import React, { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function( updatedMode) {
  
    //this does not update mode in real time!
    setMode(updatedMode);

    //create a shallow copy of the current history array, add the new mode to it and then use setHistory to make history that new array?
    const currentHistory = history.slice();
    currentHistory.push(updatedMode);
   

    //this does not update history in real time!
    setHistory(currentHistory);
  };

  const back = function () {
  
    // create a copy of the current history that can be manipulated
    const currentHistory = history.slice();

    //remove the last item from the currentHistory array to "go back"
    currentHistory.pop();

    //set the state of history to reflect the changes, does not update in real time
    setHistory(currentHistory);

    // find the last item in the current history array and set it as the new state of mode, does not update in real time
    const newMode = currentHistory.slice(-1)[0];
    setMode(newMode);
    

  };

  return {mode, transition, back };

}