import Image from 'next/image'
import s from "@/styles/frontpage.module.css"
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Link from "next/link"
import {Book} from "@/interfaces/interface_Book"
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

function sortData(a:Book, b:Book){
  return Math.floor(new Date(b.meta).getTime() / 1000)-Math.floor(new Date(a.meta).getTime() / 1000)
}

export default async function Home() {

  const books:Book[] = await getBooks()

  const articles:(Book[])= [...books.sort((a,b) => sortData(a, b))]

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
      <Hero articles={articles}/>
      <Categories />
    </main>
  )
}
