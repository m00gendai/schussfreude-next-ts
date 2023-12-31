import { notFound } from 'next/navigation'
import React from 'react'
import Gallery from '@/components/Gallery'
import {SWM} from "@/interfaces/interface_SWM"
import {Tag} from "@/interfaces/interface_globals"
import {getDate, convertDate, stringReplacer, magazineUrlReplacer} from "@/utils"
import {Metadata} from "next"
import DocumentGallery from '@/components/DocumentGallery'
import Breadcrumbs from '@/components/Breadcrumbs'
import SimilarPosts from '@/components/SimilarPosts'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/swm?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{

  const data: SWM[] = await getData()
  const decodedSlug: string = decodeURIComponent(magazineUrlReplacer(params.slug))

  const postMatch:SWM[] = data.filter(item=>{
    return magazineUrlReplacer(item.title) === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    return{
      title: "Inhalt nicht gefunden"
    }
  }

  const post: SWM = postMatch[0]

  return{
    title: `SWM ${post.title}`,
    description: stringReplacer(post.coverThemes),
    openGraph: {
      title: `SWM ${post.title}`,
      description: stringReplacer(post.coverThemes),
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
      title: `SWM ${post.title}`,
      description: stringReplacer(post.coverThemes),
      images: [`https://cms.schussfreude.ch/storage/uploads/${post.hero.path}`],
    },
  }
}

export default async function Page({params}:{params:{slug:string}}) {

  const data: SWM[] = await getData()
  const decodedSlug: string = decodeURIComponent(params.slug).toLowerCase()

  const postMatch:SWM[] = data.filter(item=>{
    return magazineUrlReplacer(item.title) === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    notFound()
  } 

  const post: SWM = postMatch[0]

  const subTags:Tag[] = postMatch[0].tags.filter(item=>{
    return item.type === "sub"
  })

  const similarPosts:SWM[] = []
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

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <Breadcrumbs />
        <section>
          <p className={"metaText"}>{`Erstpublikation am: ${convertDate(post.meta)}`}</p>
          <p className={"metaText"}>{`Zuletzt geändert am: ${getDate(post._modified)}`}</p>
        </section>
        <section>
          <h2>von Aussen</h2>
          <div dangerouslySetInnerHTML={{__html: post.outside.text}}></div>
          {post.outside.media ? <Gallery images={post.outside.media} /> :null}
          {post.outside.documents ? <DocumentGallery docs={post.outside.documents} /> : null}
        </section>
        <section>
          <h2>Inhalt</h2>
          <div dangerouslySetInnerHTML={{__html: post.content}}></div>
        </section>
        <section>
          <h2>Eindrücke</h2>
          <Gallery images={post.inside} />
        </section>
        <section>
          <h2>Beilagen</h2>
          <div dangerouslySetInnerHTML={{__html: post.additions.text}}></div>
          {post.additions.media ? <Gallery images={post.additions.media} /> :null}
          {post.additions.documents ? <DocumentGallery docs={post.additions.documents} /> : null}
        </section>
          {similarPosts.length !== 0 ? <SimilarPosts similarPosts={similarPosts} /> : null}
      </article>
      
    </main>
  )
}
