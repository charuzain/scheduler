import React from 'react';
import DayListItem from './DayListItem';


export default function DayList(props) {
  const days = props.days;
  const value = props.value;
  const onChange = props.onChange;

  return (
   <ul>
     {days.map(day=><DayListItem key={day.id} name={day.name} spots={day.spots} setDay={onChange} selected={value===day.name}/>)} 
   </ul>
  )
}


