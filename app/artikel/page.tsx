import Image from 'next/image'
import Link from "next/link"
import React from 'react'
import {Book} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import s from "@/styles/artikel.module.css"
import ArticleGallery from '@/components/ArticleGallery'
import { sortDataByDate } from '@/utils'
import { Metadata } from 'next'

const title:string = "Gesamtübersicht Artikel"
const desc:string = "Alle Artikel von schussfreude.ch in einer Übersicht."

export const metadata:Metadata = {
  title: title,
  description: desc,
  openGraph: {
    title: title,
    description: desc,
    images:[
      {
        url: `/logoSq.png`,
      }
    ],
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: desc,
    images: [`/logoSq.png`],
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
async function getMisc(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Artikel() {

  const books:Book[] = await getBooks()
  const misc:Misc[] = await getMisc()

  const articles:(Book|Misc)[] = [...books, ...misc].sort((a,b) => sortDataByDate(a, b))

  return (
    <main>
      <h1>Artikel</h1>
      <section>
        <ArticleGallery articles={articles} />
      </section>
    </main>
  )
}
