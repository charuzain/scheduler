 import React from "react";

//------------ Components and Helpers imports--------------------//
import DayList from "./DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

//------------ Application Component--------------------//
export default function Application(props) {

//----- get state, and modifier methods from custom hook---//
  const { state, 
          setDay, 
          bookInterview, 
          cancelInterview 
        } = useApplicationData();


//-----store appointments for current day-----//
  const dailyAppointments = getAppointmentsForDay(state, state.day)

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
        <DayList 
            days={state.days} 
            value={state.day} 
            onChange={setDay}
        />
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
                     bookInterview={bookInterview}
                     cancelInterview={cancelInterview}          
        />)}
        )}
        <Appointment key="last" 
                     time="5pm"
        />
      </section>
    </main>
  );
}