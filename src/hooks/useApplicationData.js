import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = ()=> {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  // const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((result) => {

      setState(prev => ({ ...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data }))
    })
  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        if(state.appointments[id].interview===null){
          const days = state.days.map(day=>(
            day.appointments.includes(id) ? {...day , spots:day.spots - 1} :day
          ));
          setState(prev=>({...prev , days , appointments}))
        }
        else{
          setState(prev=>({ ...prev, appointments }) )

      }
      
    })
      

      // .catch((err) => {
      //   console.log(err)
      // })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = state.days.map(day => (
          day.appointments.includes(id)
            ? { ...day, spots: day.spots + 1 }
            : day
        ));
        setState(prev => ({ ...prev, days, appointments }));
      });
    }



  return {state , setDay, bookInterview,cancelInterview}
  
}

export default useApplicationData;