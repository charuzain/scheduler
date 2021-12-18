import React from 'react'

//-----------Error component --------------//

export default function Error(props) {
  const { message, onClose } = props;
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        {/* display appropriate message passed by props */}
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        /* on click of close icon pass onClose from props */
        onClick={onClose}
      />
    </main>
  )
};
