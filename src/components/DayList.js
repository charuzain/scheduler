import React from 'react';
import DayListItem from './DayListItem';


export default function DayList(props) {
  const days = props.days;   
  const selectedDay = props.day;
  const setDay = props.setDay;

  return (
   <ul>
      {days.map(day => <DayListItem key={day.id} name={day.name} spots={day.spots} 
      setDay={setDay} selected={selectedDay===day.name}/>)} 
   </ul>
  )
}


