import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames"

export default function DayListItem(props) {

  const formatSpots = function(spotVal) {
    let spotString = '';
  
    if (spotVal > 1) {
      spotString += `${spotVal} spots remaining`;
    } else if (spotVal === 1) {
      spotString += `${spotVal} spot remaining`;
    }else {
      spotString += "no spots remaining";
    }
  
    return spotString;

  };
  

  let dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected}, {'day-list__item--full': props.spots === 0})

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {formatSpots(props.spots)}</h3>
    </li>
  );
}