import { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function( updatedMode, replace = false ) {


  
    if(replace) {
    
      // update the state of mode
      setMode(updatedMode);

       // use setHistory to update the state of history to be currentHistory
      setHistory((prev) => {
       //create a shallow copy of prev that we can alter
       const currentHistory = prev.slice();
     
        // alter currentHistory to reflect that we are replacing the current mode
        // have updatedMode take the place of the last value in currentHistory 
        currentHistory[currentHistory.length - 1] = updatedMode;
        return currentHistory
      });



    } else {
   
    // update the state of mode-this does not update until a rerender!
    setMode(updatedMode);

    // use setHistory to update the state of history to be currentHistory
    setHistory(prev => {
       //create a shallow copy of prev that we can alter
      const currentHistory = prev.slice();

      // alter currentHistory to reflect that we are adding updatedMode to the array
      currentHistory.push(updatedMode);
      return currentHistory;
    });

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



