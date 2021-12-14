import React from 'react'
import useVisualMode from 'hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './style.scss';
import Form from './Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    
    <article className="appointment">
    <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)}/>}
      {mode === CREATE && <Form interviewers={[]}
                                  onCancel={()=>{back(EMPTY)}}/>}
      {mode === SHOW && <Show student={props.interview.student}
        interviewer={props.interview.interviewer}/>}
      {/* {props.interview ? <Show {...props.interview}/> : <Empty />} */}
      {/* <article className="appointment">
        {
          props.time ? `Appointment at ${props.time}` : "No appointments"
        }
      </article> */}
    </article> 
  )
}
// student = { props.interview.student } interviewer = { props.interview.interviewer }

