import React from 'react'
import {Artifact, Script} from "@/interfaces/interface_Artifact"
import {Metadata} from "next"
import AncientScrolls from '@/components/AncientScrolls'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/artifacts?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  const data = await getData.json()

    const sortedData:Artifact[] = data.sort((a:Artifact, b:Artifact) =>{
      const x = a.priority
      const y = b.priority

      return x > y ? 1 : x < y ? -1 : 0
    })

    return sortedData
}

async function getDocs(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/documents?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
    const data = await getData.json()
    const sortedData:Script[] = data.sort((a:Script, b:Script) =>
      a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' })
    )
  return sortedData
}
const title:string = "Zeitdokumente des Schweizer Schützen- und Waffenwesens"
  const desc:string = "Kataloge, Prospekte und sonstiges Nostalgisches zum Schweizer Schützen- und Waffenwesen, Rüstungsindustrie und Armee aus längst vergangenen Zeiten für die Nachwelt erhalten."

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

export default async function Page() {

  const artifacts: Artifact[] = await getData()
  const documents: Script[] = await getDocs()

  return (
    <main>
      <article>
        <h1>{`Zeitdokumente`}</h1>
        <section></section>
        {
          artifacts.map(artifact =>{
            return artifact.item.map((element, index) =>{
              return(
                <section key={`${element.type}_${index}`}>
                <h2>{element.type}</h2>
                <div dangerouslySetInnerHTML={{__html: element.intro}}></div>
                  {
                    documents.map(doc=>{
                      if(doc.type === element.type){
                        return <AncientScrolls doc={doc} key={doc._id}/>
                      }
                    })
                  }
                </section>
              )
            })
          })
        }
      </article>
      
    </main>
  )
}
