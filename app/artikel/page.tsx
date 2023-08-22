import Image from 'next/image'
import Link from "next/link"
import React from 'react'
import {Book} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import s from "@/styles/artikel.module.css"
import ArticleGallery from '@/components/ArticleGallery'
import { sortDataByDate } from '@/utils'

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
