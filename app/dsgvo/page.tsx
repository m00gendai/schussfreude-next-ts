import { Metadata } from "next"
import React from 'react'
import {DSGVO} from "@/interfaces/interface_DSGVO"
import Breadcrumbs from "@/components/Breadcrumbs"

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/dsgvo`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

const title:string = "Zeitdokumente des Schweizer Schützen- und Waffenwesens"
  const desc:string = "Kataloge, Prospekte und Werbung zum Schweizer Schützen- und Waffenwesen aus längst vergangenen Zeiten für die Nachwelt erhalten."


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

  return (
    <main>
      <article>
      <h1>Datenschutzerklärung</h1>
      <Breadcrumbs />
      <section></section>
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
