import React, { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);

  const transition = function( updatedMode) {
    setMode(updatedMode);
  }

  return {mode, transition};

}