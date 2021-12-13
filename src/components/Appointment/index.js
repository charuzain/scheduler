import React from 'react'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './style.scss';

export default function Appointment(props) {

  return (
    
    <article className="appointment">
    <Header time={props.time}/>
      {props.interview ? <Show {...props.interview}/> : <Empty />}
      {/* <article className="appointment">
        {
          props.time ? `Appointment at ${props.time}` : "No appointments"
        }
      </article> */}
    </article> 
  )
}
// student = { props.interview.student } interviewer = { props.interview.interviewer }

