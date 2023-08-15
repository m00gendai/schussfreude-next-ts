import Image from 'next/image'
import Link from "next/link"
import React from 'react'
import {Book,Medium} from "@/interfaces/interface_Book"
import s from "@/styles/artikel.module.css"
import ArticleGallery from '@/components/ArticleGallery'

async function getBooks(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?populate=1000&limit=5`,{
    "headers": {
      "api-key": process.env.CMS!,
    }
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Artikel() {

  const books:Book[] = await getBooks()

  const articles:(Book[])= [...books]

  return (
    <main>
      <h1>Artikel</h1>
      <section>
        <ArticleGallery articles={articles} />
      </section>
    </main>
  )
}
