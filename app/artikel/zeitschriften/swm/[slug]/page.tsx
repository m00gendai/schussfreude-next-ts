import { notFound } from 'next/navigation'
import React from 'react'
import Gallery from '@/components/Gallery'
import {SWM} from "@/interfaces/interface_SWM"
import {Tag} from "@/interfaces/interface_globals"
import {getDate, convertDate, stringReplacer, magazineUrlReplacer} from "@/utils"
import Swiper_Similar from '@/components/Swiper_Similar'
import {Metadata} from "next"
import MagazineGallery from '@/components/MagazineGallery'
import ArticleGallerySimilar from '@/components/ArticleGallerySimilar'
import DocumentGallery from '@/components/DocumentGallery'
import Breadcrumbs from '@/components/Breadcrumbs'

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

  const similarPosts:SWM[] = data.filter(item=>{
    if(item.title !== postMatch[0].title){
      return item.tags.map(tag=>{
        return subTags.map(subTag=>{
          return tag.item === subTag.item
        })
      })
    }
  })

  return (
    <main>
      <article>
      <Breadcrumbs />
        <h1>{post.title}</h1>
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
        {similarPosts.length !== 0 ?
        <section>
          <h2>Ähnliche Artikel</h2>
          <div className="sliderWrapper">
            <Swiper_Similar articles={similarPosts}/>
          </div>
          <ArticleGallerySimilar articles={similarPosts} />
        </section>
        :
        null}
      </article>
      
    </main>
  )
}
