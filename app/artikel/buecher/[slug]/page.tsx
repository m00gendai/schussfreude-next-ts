import { notFound } from 'next/navigation'
import Link from "next/link"
import React from 'react'
import Gallery from '@/components/Gallery'

export interface Book {
  data: Data
  intro: Intro[]
  outside: Outside[]
  content: Content[]
  impressions: Impression[]
  availability: Availability[]
  conclusion: Conclusion[]
  tags: Tag[]
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
  title: string
  meta: string
}

export interface Data {
  title: string
  author: string
  release: string
  reprint: string
  publisher: string
  isbn: string
  pages: string
  weight: string
  dimensions: string
}

export interface Intro {
  text: string
  media: Medium[]
}

export interface Outside {
  text: string
  media: Medium[]
}

export interface Medium {
  path: string
  title: string
  mime: string
  type: string
  description: string
  tags: string[]
  size: number
  colors: string[]
  width: number
  height: number
  _hash: string
  _created: number
  _modified: number
  _cby: string
  folder: string
  _id: string
}

export interface Content {
  text: string
  media: Medium[]
}

export interface Impression {
  text: string
  media: Medium[]
}

export interface Availability {
  text: string
  media: Medium[]
}

export interface Conclusion {
  text: string
  media: Medium[]
}

export interface Tag {
  item: string
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
  _model: string
}

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?populate=1000`,{
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

  if(postMatch.length === 0){ // if above filter yielded no results
    notFound()
  }

  const post: Book = postMatch[0]

  function getDate(unix:number){
    const date: Date = new Date(unix*1000)
    return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${date.getMonth()+1 < 10 ? "0" : ""}${date.getMonth()+1}.${date.getFullYear()}`
  }
  function convertDate(dateString: string){
    const date: Date = new Date(dateString)
    return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${date.getMonth()+1 < 10 ? "0" : ""}${date.getMonth()+1}.${date.getFullYear()}`
  }

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <section>
          <p className={"metaText"}>{`Erstpublikation am: ${convertDate(post.meta)}`}</p>
          <p className={"metaText"}>{`Zuletzt geändert am: ${getDate(post._modified)}`}</p>
          <p className={"metaText"}>{`Kategorien: `}{post.tags.map((tag, index)=>{return <span>{`${tag.item}${index < post.tags.length-1 ? ", " : ""}`}</span>})}</p>
        </section>
        <section>
          <h2>Vorwort</h2>
          {post.intro?.map(item =>{
            if(item.text){
              return <div dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Von Aussen</h2>
          {post.outside?.map(item =>{
            if(item.text){
              return <div dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Inhalt</h2>
          {post.content?.map(item =>{
            if(item.text){
              return <div dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return item.media.map(element=>{
                return <p>{element.path}</p>
              })
            }
          })}
        </section>
        <section>
        <h2>Eindrücke</h2>
          {post.impressions?.map(item =>{
            if(item.text){
              return <div dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return <Gallery images={item.media} />
            }
          })}
        </section>
        <section>
        <h2>Preis & Verfügbarkeit</h2>
          {post.availability?.map(item =>{
            if(item.text){
              return <div dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return item.media.map(element=>{
                return <p>{element.path}</p>
              })
            }
          })}
        </section>
        <section>
        <h2>Persönliches Fazit</h2>
          {post.conclusion?.map(item =>{
            if(item.text){
              return <div dangerouslySetInnerHTML={{__html: item.text}}></div>
            }
            if(item.media){
              return item.media.map(element=>{
                return <p>{element.path}</p>
              })
            }
          })}
        </section>
      </article>
    </main>
  )
}
