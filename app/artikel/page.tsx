import Image from 'next/image'
import Link from "next/link"
import React from 'react'
import {Book} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import {App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
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
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?populate=1&fields=%7btitle%3A1%2Chero%3A1%2Cmeta%3A1%2Ctags%3A1%7D`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getMisc(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?populate=1&fields=%7btitle%3A1%2Chero%3A1%2Cmeta%3A1%2Ctags%3A1%7D`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getApps(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/apps?populate=1&fields=%7btitle%3A1%2Chero%3A1%2Cmeta%3A1%2Ctags%3A1%7D`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getAccessories(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/accessories?populate=1&fields=%7btitle%3A1%2Chero%3A1%2Cmeta%3A1%2Ctags%3A1%7D`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getMagazines(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/magazines?populate=1&fields=%7btitle%3A1%2Chero%3A1%2Cmeta%3A1%2Ctags%3A1%7D`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
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

export default async function Artikel() {

  const books:Book[] = await getBooks()
  const misc:Misc[] = await getMisc()
  const apps:App[] = await getApps()
  const accessories:Accessory[] = await getAccessories()
  const magazines:Magazine[] = await getMagazines()
  const swms:SWM[] = await getSWMs()

  const articles:(Book|Misc|App|Accessory|Magazine|SWM)[] = [...books, ...misc, ...apps, ...accessories, ...magazines, ...swms].sort((a,b) => sortDataByDate(a, b))

  return (
    <main>
      <h1>Artikel</h1>
      <section>
        <ArticleGallery articles={articles} />
      </section>
    </main>
  )
}
