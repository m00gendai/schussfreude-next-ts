import React from 'react'
import {Book} from "@/interfaces/interface_Book"
import ArticleGallery from '@/components/ArticleGallery'
import {headers} from "next/headers"
import Breadcrumbs from '@/components/Breadcrumbs'
import {Metadata} from "next"

  const title:string = "Gesamtübersicht Artikel über Bücher mit Bezug zum (Schweizer) Schützen- und Waffenwesen"
  const desc:string = "Alle Artikel von schussfreude.ch über Bücher (wie die Buchreihe \"Bewaffnung und Ausrüstung der Schweizer Armee seit 1817\", Ernst Grenachers Werke, etc.) in einer Übersicht."

  export const metadata:Metadata = {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images:[
        {
          url: `https://cms.schussfreude.ch/storage/uploads/2023/08/16/old-book-wooden-table_uid_64dcb99959141.jpg`,
        }
      ],
      locale: "de_CH",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: desc,
      images: [`https://cms.schussfreude.ch/storage/uploads/2023/08/16/old-book-wooden-table_uid_64dcb99959141.jpg`],
    },
  }

async function getBooks(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?populate=1`,{
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

    const articles:Book[] = await getBooks()

    return (
        <main>
           {/*} <Breadcrumbs url={urlSplit} /> */}
        <h1>{`Bücher`}</h1>
        <section>
            <ArticleGallery articles={articles} />
        </section>
        </main>
    )
}
