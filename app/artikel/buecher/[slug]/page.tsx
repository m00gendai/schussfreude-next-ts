import { notFound } from 'next/navigation'
import Link from "next/link"
import React from 'react'
import Gallery from '@/components/Gallery'
import DataTableBooks from '@/components/DataTableBooks'
import {Book, Tag} from "@/interfaces/interface_Book"
import {getDate, convertDate} from "@/utils"
import ArticleGallery from '@/components/ArticleGallery'
import Swiper_Similar from '@/components/Swiper_Similar'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Page({params}:{params:{slug:string}}) {

  const data: Book[] = await getData()
  const decodedSlug: string = decodeURIComponent(params.slug).toLowerCase()

  const postMatch:Book[] = data.filter(item=>{
    return decodeURIComponent(item.title).toLowerCase().replaceAll(" ", "-") === decodedSlug
  })

  const subTags:Tag[] = postMatch[0].tags.filter(item=>{
    return item.type === "sub"
  })
  
  const similarPosts:Book[] = data.filter(item=>{
    if(item.title !== postMatch[0].title){
      return item.tags.map(tag=>{
        return subTags.map(subTag=>{
          return tag.item === subTag.item
        })
      })
    }
  })

  console.log(similarPosts)

  if(postMatch.length === 0){ // if above filter yielded no results
    notFound()
  }

  const post: Book = postMatch[0]

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <section>
          <p className={"metaText"}>{`Erstpublikation am: ${convertDate(post.meta)}`}</p>
          <p className={"metaText"}>{`Zuletzt geändert am: ${getDate(post._modified)}`}</p>
          <p className={"metaText"}>{`Kategorien: `}{post.tags.map((tag, index)=>{return <span key={`tagSpan_${index}`}>{`${tag.item}${index < post.tags.length-1 ? ", " : ""}`}</span>})}</p>
        </section>
        <section>
          <h2>Eckdaten</h2>
          <DataTableBooks data={post.data}/>
        </section>
        <section>
          <h2>Vorwort</h2>
          {post.intro?.map((item, index) =>{
            if(item.text){
              return <div key={`introText_${index}`} dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery key={`introMedia_${index}`} images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Von Aussen</h2>
          {post.outside?.map((item, index) =>{
            if(item.text){
              return <div key={`outsideText${index}`}dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery key={`outsideMedia_${index}`} images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Inhalt</h2>
          {post.content?.map((item, index) =>{
            if(item.text){
              return <div key={`contentText_${index}`} dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery key={`contentMedia_${index}`} images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Eindrücke</h2>
          {post.impressions?.map((item, index) =>{
            if(item.text){
              return <div key={`impressionsText_${index}`} dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery key={`impressionsMedia_${index}`} images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Preis & Verfügbarkeit</h2>
          {post.availability?.map((item, index) =>{
            if(item.text){
              return <div key={`availabilityText_${index}`} dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery key={`availabilityMedia_${index}`} images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Persönliches Fazit</h2>
          {post.conclusion?.map((item, index) =>{
            if(item.text){
              return <div key={`conclusionText_${index}`} dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery key={`conclusionMedia_${index}`} images={item.media} />
            }
          })}
        </section>
        <section>
          <h2>Ähnline Artikel</h2>
          <Swiper_Similar articles={similarPosts}/>
        </section>
      </article>
      
    </main>
  )
}
