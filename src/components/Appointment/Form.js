import React, { useState } from 'react';

//--------Component Import---------------------------------//
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

//--------Form Component------------------------------------//
export default function Form(props) {

  //------- Define states for student, interviewer, error----//
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //---reset student name textbox, interviewer and error------//
  const reset = function () {
    setStudent("")
    setInterviewer("")
    setError("")
  }

  const cancel = function () {
    reset()
    props.onCancel()
  }

  //------Form validation to ensure student name is not empty-------//
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("")
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* on submit of form prevent default behavior */}
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        {/* call InterviewerList component by passing interviewers, interviewer id, setInterviewer */}
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* Show button components with cancel and save butttons */}
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  )
};
