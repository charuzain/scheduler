import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
   if(props.confirm){
      buttonClass = buttonClass +" button--confirm"
   }
   if (props.danger) {
      buttonClass = buttonClass + " button--danger"
   }
   return <>
   <button onClick={props.onClick} className={buttonClass} disabled={props.disabled}>{props.children}</button>
   </>;
}
