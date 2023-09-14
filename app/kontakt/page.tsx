"use client"

import Input from "@/components/Input"
import Text from "@/components/Textarea"
import React, { useState } from 'react'

import {isFocus, isFormValid, isFormValue, isFeedback} from "@/interfaces/interface_Kontakt"

import s from "@/styles/Kontakt.module.css"

export default function Kontakt() {

  const [focus, setFocus] = useState<isFocus>({
    name: false,
    mail: false,
    subject: false,
    message: false,
});


const [formValue, setFormValue] = useState<isFormValue>({
    name: '',
    mail: '',
    subject: '',
    message: '',
});


const [formValid, setFormValid] = useState<isFormValid>({
    name: false,
    mail: false,
    subject: false,
    message: false,
});


const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
const [feedback, setFeedback] = useState<isFeedback>({
    color: '',
    content: '',
});

const [cooldown, setCooldown] = useState<boolean>(false)

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

event.preventDefault();
if(formValue.subject !== ""){
  return
}

if(cooldown){
    setFeedbackVisible(true);
    setFeedback({ color: 'red', content: 'Bitte warten SIe 10 Sekunden zwischen dem Senden.' });
} else {
if (feedbackVisible) {
  setFeedbackVisible(false);
}
setFeedbackVisible(true);
setFeedback({ color: 'red', content: 'Einen Augenment bitte...' });

fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formValue)
  }).then(async (res) => {
      if (res.status === 200) {
          setFeedback({color: "cyan", content: "Nachricht erfolgreich übermittelt. Sie haben auch eine Kopie erhalten."})
          setCooldown(true)
          setTimeout(function(){
            setCooldown(false)
            setFeedbackVisible(false);
          }, 10000)
      } else {
          const errmsg = await res.json()
          setFeedback({color: "magenta", content: `
            Es ist etwas schiefgegangen. Bitte überprüfen Sie insbesondere Ihre angegebene E-Mail-Adresse. Ansonsten wenden SIe sich an die im Impressum angegebene Kontaktmöglichkeit.
            Fehler: ${res.status} 
            Meldung ${errmsg.err}
          `})
      }
    })
}}

  return (
    <main>
      <article>
        <h1>Kontakt</h1>
        <section></section>
        <form className={s.form} onSubmit={(event) => handleSubmit(event)}>
      <Input
        tag="name"
        type="text"
        content="Name *"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      />
      <Input
        tag="mail"
        type="email"
        content="E-Mail *"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      /><div style={{position: "absolute", left: "-100000px"}}>
      <Input
        tag="subject"
        type="text"
        content="Betreff"
        pattern={undefined}
        formValue={formValue}
        focus={focus}
        formValid={formValid}
        setFormValid={setFormValid}
        setFormValue={setFormValue}
        setFocus={setFocus}
      /></div>
      <Text
        tag="message"
        content="Nachricht *"
        formValue={formValue}
        focus={focus}
        setFormValue={setFormValue}
        setFocus={setFocus}
      />
      <div className="buttonContainerSingle">
        <div className="buttonBg">
          <input type="submit" className="button" value="Abschicken" />
        </div>
      </div>
      {feedbackVisible ? (
        <p style={{ color: feedback.color, width: "100%", textAlign: "center"}}>{feedback.content}</p>
      ) : null}
    </form>
      </article>
    </main>
  )
}
