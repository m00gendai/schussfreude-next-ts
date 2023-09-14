import { Metadata } from "next"
import React, { useState } from 'react'
import {DSGVO} from "@/interfaces/interface_DSGVO"
import { cookies } from "next/headers"
import s from "@/styles/CookieProvider.module.css"

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/dsgvo`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

const title:string = "Datenschutzerklärung"
  const desc:string = "Datenschutzerklärung und Cookie-Auflistung für schussfreude.ch"


export const metadata:Metadata = {
  title: title,
  description: desc,
  openGraph: {
    title: title,
    description: desc,
    images:[
      {
        url: `https://cms.schussfreude.ch/storage/uploads/2023/08/30/certificate-8195645_640.jpg`,
      }
    ],
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: desc,
    images: [`https://cms.schussfreude.ch/storage/uploads/2023/08/30/certificate-8195645_640.jpg`],
  },
}

export default async function Dsgvo() {

  const data:DSGVO[] = await getData()

  const cookieStore = cookies()
  cookieStore.getAll().map((cookie) => {
    console.log(cookie.name)
  })

  return (
    <main>
      <article>
      <h1>Datenschutzerklärung</h1>
      <section>
      </section>
      <section>
        <h2>Cookies</h2>
          <p style={{width: "100%"}}>Schussfreude.ch nutzt nachfolgend aufgelistet die aktiven Cookies:</p>
          {
            cookieStore.getAll().length !== 0 ?
              <div className={s.tableContainer}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Cookie Name</th>
                      <th>Cookie Wert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cookieStore.getAll().map((cookie) => {
                        return (
                          <tr><td>{cookie.name}</td><td>{cookie.value}</td></tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            : 
              <p>Keine aktiven Cookies</p>
          }
          <hr />
          <p style={{width: "100%"}}>Schussfreude.ch setzt folgende Cookies, sofern sie akzeptiert werden:</p>
          <div className={s.tableContainer}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Zwingend</th>
                  <th>Voraussetzung</th>
                  <th>Cookie Wert</th>
                  <th>Erklärung</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>schussfreude_analytics</td>
                  <td>ja</td>
                  <td>Cookies akzeptiert/abgelehnt</td>
                  <td><i>true</i> oder <i>false</i></td>
                  <td>
                    {`true:\nErlaubt die Erfassung durch Google Analytics\n\nfalse:\nVerbietet die Erfassung durch Google Analytics`}
                  </td>
                </tr>
                <tr>
                  <td>_ga</td>
                  <td>nein</td>
                  <td>schussfreude_analytics akzeptiert</td>
                  <td><i>{`Beispiel:\nGA1.1.991332693.1694678232`}</i></td>
                  <td>Zufallsgenerierte Nutzer-ID für Google Analytics</td>
                </tr>
                <tr>
                  <td>_ga_A2ABC2ABCD</td>
                  <td>nein</td>
                  <td>schussfreude_analytics akzeptiert</td>
                  <td><i>{`Beispiel:\nGS1.1.1694678231.1.1.1694678249.0.0.0`}</i></td>
                  <td>Zufallsgenerierte Nutzer-ID für Google Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <p style={{whiteSpace: "pre"}}>
            {`schussfreude.ch bezweckt mit den Cookies eine Analyse des Nutzerverhaltens.\nDies erlaubt es schussfreude.ch verschiedene Statistik zur Akquise der Nutzer und deren Verhalten auf der Webseite einzusehen.\nDies ermöglicht es, gegebenenfalls Anpassungen am Nutzererlebnis vorzunehmen.`}
          </p>
      </section>
      {
        data[0].section.map((section, index)=>{
          return (
            <section key={`section_${index}`}>
              <h2>{section.title}</h2>
              <div dangerouslySetInnerHTML={{__html:section.text}} style={{wordBreak: "break-word"}}></div>
            </section>
          )
        })
      }
      </article>
    </main>
  )
}
