import React from 'react'
import './InterviewerList.scss';
import './InterviewerListItem';
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  const setInterviewer = props.setInterviewer;
  const selectedInterviewer = props.interviewer;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {interviewers.map((interviewer)=> <InterviewerListItem key={interviewer.id}
                                                        name={interviewer.name}
                                                        avatar={interviewer.avatar}
                                                        selected={selectedInterviewer === interviewer.id} 
                                                        setInterviewer={(event) => setInterviewer(interviewer.id)}/>)}
      </ul>
    </section>
  )
}
