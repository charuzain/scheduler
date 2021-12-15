import React from 'react'
import useVisualMode from 'hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './style.scss';
import Form from './Form';
import Status from './Status';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  console.log(props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
     transition(SAVING)

    props.bookInterview(props.id,interview).then(()=>{
      transition(SHOW)
    })
  }

  // function delete(){}

  return (
    
    <article className="appointment">
    <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers}
                                  onCancel={()=>{back(EMPTY)}}
                                  onSave={save}
                                  
                                  />}
      {mode === SHOW && <Show student={props.interview.student}
        interviewer={props.interview.interviewer}/>}
        {mode === SAVING && <Status message = {SAVING}/>}
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

