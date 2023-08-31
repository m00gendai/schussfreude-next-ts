import React from 'react'
import {App} from "@/interfaces/interface_App"
import {Tag} from "@/interfaces/interface_globals"
import ArticleGallery from '@/components/ArticleGallery'
import {headers} from "next/headers"
import Breadcrumbs from '@/components/Breadcrumbs'
import {Metadata} from "next"

  const title:string = "Gesamtübersicht Artikel mit Thema \"Apps, Software und Programme\""
  const desc:string = "Alle Artikel von schussfreude.ch zum Thema Apps, Software und Programme in einer Übersicht."

  export const metadata:Metadata = {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images:[
        {
          url: `https://cms.schussfreude.ch/storage/uploads/2023/08/16/woman-4246954_640_uid_64dcbb322da74.jpg`,
        }
      ],
      locale: "de_CH",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: desc,
      images: [`https://cms.schussfreude.ch/storage/uploads/2023/08/16/woman-4246954_640_uid_64dcbb322da74.jpg`],
    },
  }


async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/apps?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Page() {

    const articles:App[] = await getData()

    return (
        <main>
           {/*} <Breadcrumbs url={urlSplit} /> */}
        <h1>{`Apps`}</h1>
        <section>
            <ArticleGallery articles={articles} />
        </section>
        </main>
    )
}
