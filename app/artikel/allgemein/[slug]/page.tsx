import { notFound } from 'next/navigation'
import React from 'react'
import Gallery from '@/components/Gallery'
import {Misc} from "@/interfaces/interface_Misc"
import {Tag} from "@/interfaces/interface_globals"
import {getDate, convertDate, stringReplacer, magazineUrlReplacer} from "@/utils"
import Spoiler from '@/components/Spoiler'
import {Metadata} from "next"
import DocumentGallery from '@/components/DocumentGallery'
import Breadcrumbs from '@/components/Breadcrumbs'
import Sources from '@/components/Sources'
import AdditionalLinks from '@/components/AdditionalLinks'
import SimilarPosts from '@/components/SimilarPosts'
import Cards from '@/components/Cards'
import Assessment from '@/components/Assessment'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/misc?populate=1000`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{

  const data: Misc[] = await getData()
  const decodedSlug: string = decodeURIComponent(magazineUrlReplacer(params.slug))

  const postMatch:Misc[] = data.filter(item=>{
    return magazineUrlReplacer(item.title) === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    return{
      title: "Inhalt nicht gefunden"
    }
  }

  const post: Misc = postMatch[0]

  return{
    title: post.title,
    description: stringReplacer(post.seo),
    openGraph: {
      title: post.title,
      description: stringReplacer(post.seo),
      images:[
        {
          url: `https://cms.schussfreude.ch/storage/uploads/${post.hero.path}`,
          width: post.hero.width,
          height: post.hero.height
        }
      ],
      locale: "de_CH",
      type: "article"
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: stringReplacer(post.seo),
      images: [`https://cms.schussfreude.ch/storage/uploads/${post.hero.path}`],
    },
  }
}

export default async function Page({params}:{params:{slug:string}}) {

  const data: Misc[] = await getData()
  const decodedSlug: string = decodeURIComponent(magazineUrlReplacer(params.slug))

  const postMatch:Misc[] = data.filter(item=>{
    return magazineUrlReplacer(item.title) === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    notFound()
  }

  const subTags:Tag[] = postMatch[0].tags.filter(item=>{
    return item.type === "sub"
  })

  const similarPosts:Misc[] = []
  data.filter(item=>{
    if(item.title !== postMatch[0].title){
      subTags.map(subTag=>{
        item.tags.map(tag=>{
          if(!similarPosts.includes(item) && subTag.item == tag.item){
            similarPosts.push(item)
          }
        })
      })
    }
  })

  const post: Misc = postMatch[0]

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <Breadcrumbs />
        <section>
          <p className={"metaText"}>{`Erstpublikation am: ${convertDate(post.meta)}`}</p>
          <p className={"metaText"}>{`Zuletzt geändert am: ${getDate(post._modified)}`}</p>
          <p className={"metaText"}>{`Kategorien: `}{post.tags.map((tag, index)=>{return <span key={`tagSpan_${index}`}>{`${tag.item}${index < post.tags.length-1 ? ", " : ""}`}</span>})}</p>
        </section>
        
          {post.content?.map((item, index) =>{
            return (
              <>
              <h2>{item.title}</h2>
              <section key={item.title}>
                {item.paragraphs.map((paragraph, index) =>{
                  return (
                    <section className="subSection" key={`paragraph_${index}`}>
                      {paragraph.text ? <div key={`outsideText${index}`} dangerouslySetInnerHTML={{__html: paragraph.text}} style={{width: "100%"}}></div> : null}
                      {paragraph.media ? <Gallery key={`outsideMedia_${index}`} images={paragraph.media} /> :null}
                      {paragraph.documents ? <DocumentGallery key={`outsideDocument_${index}`} docs={paragraph.documents} /> : null}
                      {paragraph.spoiler ? paragraph.spoiler.map((spoiler, index) => <Spoiler key={`spoiler_${index}`} content={spoiler} />) : null}
                      {paragraph.mainCategory ? <Cards mainCategory={paragraph.mainCategory} subCategory={paragraph.subCategory} /> : null}
                      {paragraph.assessment?.pro ? <Assessment assessment={paragraph.assessment} /> : null}
                    </section>
                  )
                })}
              </section>
              </>
            )
          })}
          {post.links.length !== 0 ? <AdditionalLinks links={post.links} /> : null}
          {post.sources.length !== 0 ? <Sources sources={post.sources} /> : null}
          {similarPosts.length !== 0 ? <SimilarPosts similarPosts={similarPosts} /> : null}
      </article>
      
    </main>
  )
}
