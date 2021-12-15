import React,{useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment"
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day : "Monday",
    days : [],
    appointments:{},
    interviewers:{}
  })
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  // const dailyInterviewers=  getInterviewersForDay(state, state.day)
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({ ...state, appointments })

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments })
      })

    .catch((err)=>{
      console.log(err)
    })
  }


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((result)=>{
      
      setState(prev => ({ ...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data}))
    })
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} value={state.day} onChange={setDay}/>

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment)=>
        { const interview = getInterview(state,appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day)
        return(
        <Appointment key={appointment.id}
         id={appointment.id}
         time={appointment.time}
         interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}/>)})}
        <Appointment key="last" 
                     time="5pm"
                    bookInterview={bookInterview} />
      </section>
    </main>
  );
}