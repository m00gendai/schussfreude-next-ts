import Image from 'next/image'
import s from "@/styles/frontpage.module.css"
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Link from "next/link"
import {Book, Tag} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import { sortDataByDate } from '@/utils'
import Tab from '@/components/Tab'

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
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?populate=1000&limit=5`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}
async function getMisc(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?populate=1000&limit=5`,{
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
  const cats:Tag[] = await getCategories()

  const articles:(Book|Misc)[]= [...books, ...misc].sort((a,b) => sortDataByDate(a, b))

  return (
    <main>
      {/* TODO: This section will be removed on prod */}
      <h1 className={s.h1}>schussfreude.ch</h1>
      <p className={s.p}>Vorschau der neuen schussfreude.ch-Seite.</p>
      <Link style={{width: "100%", display: "block", textAlign: "center"}} href="https://a.kerika.com/acc_55R5PgME5wtTsnMjPWxYKX/board/brd_55i66YcDPJOkUPnv5C84UP" target="_blank" title="Status">
        Status Fortschritt (Englisch)
      </Link>
      <Link style={{width: "100%", display: "block", textAlign: "center"}} href="https://github.com/m00gendai/schussfreude-next-ts" target="_blank" title="Github">
        Github Repository (Englisch)
      </Link>
      {/* TODO: This will remain in prod. Delete comment then */}
      <div className={s.desktop}>
        <Hero articles={articles}/>
        <Categories cats={cats}/>
      </div>
      <Tab articles={articles} cats={cats}/>
    </main>
  )
}
