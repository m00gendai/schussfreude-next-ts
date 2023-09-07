import { Metadata } from "next"
import React from 'react'
import Link from "next/link"
import {Imprint} from "@/interfaces/interface_Imprint"
import s from "@/styles/Legal.module.css"

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/imprint`,{
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

export default async function Impressum() {

  const data:Imprint[] = await getData()

  return (
    <main>
      <article>
      <h1>Impressum</h1>
      <section>
        <div className={s.container}>
        {
          data[0].tiles.map((tile, index)=>{
            return (
              <div className={s.tile}>
                <h3 dangerouslySetInnerHTML={{__html:tile.title}} style={{width: "100%"}}></h3>
                <div dangerouslySetInnerHTML={{__html:tile.text}} style={{width: "100%"}}></div>
                <Link href={tile.link} target="_blank" style={{margin: "0 0 1rem 0", width: "100%"}}>{tile.link}</Link>
              </div>
            )
          })
        }
        </div>
      </section>
      {
        data[0].content.map((section, index)=>{
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
