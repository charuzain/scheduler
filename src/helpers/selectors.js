
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

// console.log(getAppointmentsForDay(state,"Monday"))