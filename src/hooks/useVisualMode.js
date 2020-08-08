import React, { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function( updatedMode, replace = false ) {

    //create a shallow copy of history that we can alter
    const currentHistory = history.slice();
  
    if(replace) {
      //set history to reflect that we are replacing the current mode
      //have updatedMode take the place of the last value in history instead of pushing it to history
      currentHistory[currentHistory.length - 1] = updatedMode;

      // update the state of mode-this does not update until a rerender!
      setMode(updatedMode);

       // use setHistory to update the state of history to be currentHistory-this does not update until a rerender!
      setHistory(prev => ([...prev, updatedMode]));



    } else {

    // add the new mode to the end of currentHistory
    currentHistory.push(updatedMode);
   
    // update the state of mode-this does not update until a rerender!
    setMode(updatedMode);

    // use setHistory to update the state of history to be currentHistory-this does not update until a rerender!
    setHistory(prev => ([...prev, updatedMode]));

    }
  };

  console.log ('mode = ', mode);

  const back = function () {
  
    // create a copy of the current history that can be manipulated
    const currentHistory = history.slice();

    if (currentHistory.length > 1) {
    //remove the last item from the currentHistory array to "go back"
    currentHistory.pop();

    //set the state of history to reflect the changes, does not update in real time
    setHistory(currentHistory);

    // find the last item in the current history array and set it as the new state of mode, does not update in real time
    const newMode = currentHistory.slice(-1)[0];
    setMode(newMode);
    };

  };

  return {mode, transition, back };

}



