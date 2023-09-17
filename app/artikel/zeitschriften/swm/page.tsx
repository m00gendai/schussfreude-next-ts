import React from 'react'
import {SWM} from "@/interfaces/interface_SWM"
import ArticleGallery from '@/components/ArticleGallery'
import {headers} from "next/headers"
import Breadcrumbs from '@/components/Breadcrumbs'
import {Metadata} from "next"

  const title:string = "Gesamtübersicht Artikel über die einzelnen Ausgaben des Schweizer Waffenmagazin"
  const desc:string = "Alle Artikel von schussfreude.ch über die einzelnen Ausgaben des Schweizer Waffenmagazin in einer Übersicht."

  export const metadata:Metadata = {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images:[
        {
          url: `https://cms.schussfreude.ch/storage/uploads//2023/08/16/magazines-1108800_640_uid_64dcba79c1c00.jpg`,
        }
      ],
      locale: "de_CH",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: desc,
      images: [`https://cms.schussfreude.ch/storage/uploads//2023/08/16/magazines-1108800_640_uid_64dcba79c1c00.jpg`],
    },
  }

async function getSWMs(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/swm?populate=1&fields=%7btitle%3A1%2Chero%3A1%2Cmeta%3A1%2Ctags%3A1%7D`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Page({params}:{params:{slug:string}}) {
    const url:string = headers().get("referer") || ""
    const urlSplit:string[] = url.split("/")

    const articles:SWM[] = await getSWMs()

    return (
        <main>
        <h1>{`Schweizer Waffenmagazin`}</h1>
        <Breadcrumbs />
        <section>
            <ArticleGallery articles={articles} />
        </section>
        </main>
    )
}
