import React from 'react'

//------------Component Import------------------------//
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
//----------------------------------------------------//

import useVisualMode from 'hooks/useVisualMode';

import './style.scss';

//----------------------Appointment Component------------------------------//

export default function Appointment(props) {

  //------Constants-------//
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = " ERROR_DELETE";

  //------Initialize visual mode------//
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //------Save new appointment & Transition to display show component------//
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  //-----Transition to Edit------//
  function edit() {
    transition(EDIT)
  }

  //-----Before deleting an appointment display Confirm component------//
  function deleteConfirmation() {
    transition(CONFIRM)
  }

  //-----Deleting an appointment & Transition to Deleting status------//
  function deleteAppointment() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      {/* if time is passed show time otherwise show appropriate message */}
      {props.time ? <Header time={props.time} /> : <p>No Appointments</p>}

      {/* if mode is EMPTY call empty component*/}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {/* if mode is CRETE call Form component*/}
      {mode === CREATE && <Form 
                            interviewers={props.interviewers}
                            onCancel={() => { back(EMPTY) }}
                            onSave={save}
      />}

      {/* if mode is Edit call Form component with existing student and interviewer value*/}
      {mode === EDIT && <Form 
                          student={props.interview.student}
                          interviewers={props.interviewers}
                          interviewer={props.interview.interviewer.id}
                          onSave={save}
                          onCancel={() => { back() }}
      />}

      {/* if mode is Show call Show Component with student name, interviewer, editInterview and deleteConfirm */}
      {mode === SHOW && <Show 
                          student={props.interview.student}
                          interviewer={props.interview.interviewer}
                          onDelete={deleteConfirmation}
                          onEdit={edit}
      />}

      {/* for mode is SAVING, Show Saving Status Component */}
      {mode === SAVING && <Status message="Saving" />}

      {/* for mode is CONFIRM, Show Confirm Status Component */}
      {mode === CONFIRM && <Confirm 
                             message="Are you sure you would like to delete"
                             onConfirm={deleteAppointment}
                             onCancel={() => back()} />}

      {/* for mode is DELETING, Show Deleting Status Component */}
      {mode === DELETING && <Status message="Deleting" />}

      {/* for mode is ERROR_SAVE, Show Error Component with appropriate message */}
      {mode === ERROR_SAVE && <Error 
                                message="Could not add appointment"
                                onClose={() => back()} 
      />}

      {/* for mode is ERROR_DELETE, Show Error Component with appropriate message */}
      {mode === ERROR_DELETE && <Error 
                                   message="Could not delete appointment"
                                   onClose={() => back()}
       />}
    </article>
  )
};

