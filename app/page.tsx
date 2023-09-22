import Image from 'next/image'
import s from "@/styles/frontpage.module.css"
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Link from "next/link"
import {Book} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import {App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
import {Tag} from "@/interfaces/interface_globals"
import { sortDataByDate } from '@/utils'
import Tab from '@/components/Tab'
import {Metadata} from "next"

const title:string = "schussfreude.ch - Die Schweizer Waffenseite!"
const desc:string = "Artikel über Zubehör, Zeitschriften, Bücher und allgemeine Belange zum Schweizer Waffen- und Schützenwesen."

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

async function getCategories(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/tags?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

//&sort=%7B_created%3A-1%7D
async function getBooks(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?sort=%7Bmeta%3A-1%7D&fields=%7Btitle%3A1%2C+meta%3A1%2C+hero%3A1%2C+tags%3A1%7D&limit=5&populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getMisc(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?sort=%7Bmeta%3A-1%7D&fields=%7Btitle%3A1%2C+meta%3A1%2C+hero%3A1%2C+tags%3A1%7D&limit=5&populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getApps(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/apps?sort=%7Bmeta%3A-1%7D&fields=%7Btitle%3A1%2C+meta%3A1%2C+hero%3A1%2C+tags%3A1%7D&limit=5&populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getAccessories(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/accessories?sort=%7Bmeta%3A-1%7D&fields=%7Btitle%3A1%2C+meta%3A1%2C+hero%3A1%2C+tags%3A1%7D&limit=5&populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getMagazines(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/magazines?sort=%7Bmeta%3A-1%7D&fields=%7Btitle%3A1%2C+meta%3A1%2C+hero%3A1%2C+tags%3A1%7D&limit=5&populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getSWMs(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/swm?sort=%7Bmeta%3A-1%7D&fields=%7Btitle%3A1%2C+meta%3A1%2C+hero%3A1%2C+tags%3A1%7D&limit=5&populate=1`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Home() {

  const books:Book[] = await getBooks()
  const misc:Misc[] = await getMisc()
  const apps:App[] = await getApps()
  const accesories:Accessory[] = await getAccessories()
  const magazines:Magazine[] = await getMagazines()
  const swms:SWM[] = await getSWMs()
  const cats:Tag[] = await getCategories()

  const articles:(Book|Misc|App|Accessory|Magazine|SWM)[]= [...books, ...misc, ...apps, ...accesories, ...magazines, ...swms].sort((a,b) => sortDataByDate(a, b))

  return (
    <main>
      {/* TODO: This section will be removed on prod */}
      <div className={s.notice}>
        <h1 className={s.h1}>schussfreude.ch</h1>
        <p className={s.p}>Vorschau der neuen schussfreude.ch-Seite.</p>
        <Link style={{display: "block", textAlign: "center"}} href="https://trello.com/b/HtQ0vFoJ/schussfreudech" target="_blank" title="Status">
          Status Fortschritt (Englisch)
        </Link>
        <div style={{width: "100%"}}></div>
        <Link style={{display: "block", textAlign: "center"}} href="https://github.com/m00gendai/schussfreude-next-ts" target="_blank" title="Github">
          Github Repository (Englisch)
        </Link>
      </div>
      {/* TODO: This will remain in prod. Delete comment then */}
      <div className={s.desktop}>
        <Hero articles={articles}/>
        <Categories cats={cats}/>
      </div>
      <Tab articles={articles} cats={cats}/>
    </main>
  )
}
