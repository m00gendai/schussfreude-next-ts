import React from 'react'
import {Misc} from "@/interfaces/interface_Misc"
import ArticleGallery from '@/components/ArticleGallery'
import {headers} from "next/headers"
import Breadcrumbs from '@/components/Breadcrumbs'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?populate=1`,{
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

    const articles:Misc[] = await getData()

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
