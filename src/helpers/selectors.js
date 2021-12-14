
export function getAppointmentsForDay(state, day) {
 const appointmentForDay =[];
 for(let elem of state.days){
   if(elem.name===day){
     for(let appointment of elem.appointments){
       appointmentForDay.push(state.appointments[appointment])
     }
   }
 }
return appointmentForDay
}

export function getInterview(state,interview){
if(interview){
const interviewerId = interview.interviewer
const parsedInterview = {};
parsedInterview.student = interview.student;
parsedInterview.interviewer = state.interviewers[interviewerId]

return parsedInterview
}
return null;
}


export function getInterviewersForDay(state, day) {
  const parsedInterviewers = [];
  for(let elem of state.days){
    if(elem.name === day){
      for(let interviewer of elem.interviewers ){
        parsedInterviewers.push(state.interviewers[interviewer])
      }
    }
  }
 return parsedInterviewers
}