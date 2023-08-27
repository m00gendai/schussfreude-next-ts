import React from 'react'
import {Accessory, Tag} from "@/interfaces/interface_Accessory"
import ArticleGallery from '@/components/ArticleGallery'
import {headers} from "next/headers"
import Breadcrumbs from '@/components/Breadcrumbs'
import {Metadata} from "next"

  const title:string = "Gesamtübersicht Artikel mit Thema \"Zubehör/Hilfsmittel\""
  const desc:string = "Alle Artikel von schussfreude.ch zum Thema Zubehör und Hilfsmittel fürs Schweizer Schützenwesen und Schweizer Waffen in einer Übersicht."

  export const metadata:Metadata = {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images:[
        {
          url: `https://cms.schussfreude.ch/storage/uploads/2023/08/16/gun-6199337_640_uid_64dcb8e0c7f85.jpg`,
        }
      ],
      locale: "de_CH",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: desc,
      images: [`https://cms.schussfreude.ch/storage/uploads/2023/08/16/gun-6199337_640_uid_64dcb8e0c7f85.jpg`],
    },
  }


async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/accessories?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Page() {

    const articles:Accessory[] = await getData()

    return (
        <main>
           {/*} <Breadcrumbs url={urlSplit} /> */}
        <h1>{`Allgemein`}</h1>
        <section>
            <ArticleGallery articles={articles} />
        </section>
        </main>
    )
}
