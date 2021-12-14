import React,{useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment"
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


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

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((result)=>{
      console.log(result[0].data)
      console.log(result[1].data)
      console.log(result[2].data)
      
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
        return(
        <Appointment key={appointment.id}
         id={appointment.id}
         time={appointment.time}
         interview={interview} />)})}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}