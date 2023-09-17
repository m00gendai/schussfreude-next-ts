import React from 'react'
import {Misc} from "@/interfaces/interface_Misc"
import {Tag} from "@/interfaces/interface_globals"
import ArticleGallery from '@/components/ArticleGallery'
import {headers} from "next/headers"
import Breadcrumbs from '@/components/Breadcrumbs'
import {Metadata} from "next"

  const title:string = "Gesamtübersicht Artikel mit Thema \"Allgemein\""
  const desc:string = "Alle Artikel von schussfreude.ch zum Thema Waffenrecht, Waffenerwerb, welche Waffe fürs Sportschiessen, etc. in einer Übersicht."

  export const metadata:Metadata = {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images:[
        {
          url: `https://cms.schussfreude.ch/storage/uploads/2023/08/16/joe-ei-cl8xcbco-unsplash_uid_64dcb757280d7.jpg`,
        }
      ],
      locale: "de_CH",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: desc,
      images: [`https://cms.schussfreude.ch/storage/uploads/2023/08/16/joe-ei-cl8xcbco-unsplash_uid_64dcb757280d7.jpg`],
    },
  }


async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?populate=1&fields=%7btitle%3A1%2Chero%3A1%2Cmeta%3A1%2Ctags%3A1%7D`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Page() {

    const articles:Misc[] = await getData()

    return (
        <main>
        <h1>{`Allgemein`}</h1>
        <Breadcrumbs />
        <section>
            <ArticleGallery articles={articles} />
        </section>
        </main>
    )
}
