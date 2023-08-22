import { notFound } from 'next/navigation'
import Link from "next/link"
import React from 'react'
import Gallery from '@/components/Gallery'
import {Misc, Tag} from "@/interfaces/interface_Misc"
import {getDate, convertDate} from "@/utils"
import ArticleGallery from '@/components/ArticleGallery'
import Swiper_Similar from '@/components/Swiper_Similar'
import Spoiler from '@/components/Spoiler'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export default async function Page({params}:{params:{slug:string}}) {

  const data: Misc[] = await getData()
  const decodedSlug: string = decodeURIComponent(params.slug).toLowerCase()

  const postMatch:Misc[] = data.filter(item=>{
    return decodeURIComponent(item.title).toLowerCase().replaceAll(" ", "-") === decodedSlug
  })

  const subTags:Tag[] = postMatch[0].tags.filter(item=>{
    return item.type === "sub"
  })
  
  const similarPosts:Misc[] = data.filter(item=>{
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

  const post: Misc = postMatch[0]

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <section>
          <p className={"metaText"}>{`Erstpublikation am: ${convertDate(post.meta)}`}</p>
          <p className={"metaText"}>{`Zuletzt geändert am: ${getDate(post._modified)}`}</p>
          <p className={"metaText"}>{`Kategorien: `}{post.tags.map((tag, index)=>{return <span key={`tagSpan_${index}`}>{`${tag.item}${index < post.tags.length-1 ? ", " : ""}`}</span>})}</p>
        </section>
        
          {post.content?.map((item, index) =>{
            return item.paragraphs.map((paragraph, index) =>{
              return (
                <section key={`paragraph_${index}`}>
                  <h2>{paragraph.title}</h2>
                  {paragraph.text ? <div key={`outsideText${index}`}dangerouslySetInnerHTML={{__html: paragraph.text}}></div> : null}
                  {paragraph.media ? <Gallery key={`outsideMedia_${index}`} images={paragraph.media} /> :null}
                  {paragraph.spoiler ? paragraph.spoiler.map(spoiler => <Spoiler content={spoiler} />) : null}
                </section>
              )
            })
          })
            
          }

       
       
       
       
        <section>
          <h2>Ähnliche Artikel</h2>
          <Swiper_Similar articles={similarPosts}/>
        </section>
      </article>
      
    </main>
  )
}
