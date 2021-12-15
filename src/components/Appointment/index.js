import React from 'react'
import useVisualMode from 'hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './style.scss';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

export default function Appointment(props) {

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

  function deleteConfirm(){
    transition(CONFIRM)
  }

  function deleteAppointment(){ 
   
    transition(DELETING)
    props.cancelInterview(props.id)
        .then(()=>{
          transition(EMPTY)
        })
    
  }

  return (
    
    <article className="appointment">
    <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers}
                                  onCancel={()=>{back(EMPTY)}}
                                  onSave={save}
                                  
                                  />}
        {mode === SHOW &&  <Show student={props.interview.student}
                             interviewer={props.interview.interviewer}
                             onDelete={deleteConfirm}
                            //  onEdit={}
                             />}
        {mode === SAVING && <Status message = {SAVING}/>}
        {mode === CONFIRM && <Confirm message="Are you sure you would like to delete"
                                      onConfirm={deleteAppointment}
                                      onCancel={()=>back()}/>}
       {mode === DELETING && <Status message={DELETING} />}
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

