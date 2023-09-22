import { notFound } from 'next/navigation'
import React from 'react'
import Gallery from '@/components/Gallery'
import DataTableBooks from '@/components/DataTableBooks'
import {Book} from "@/interfaces/interface_Book"
import {Tag} from "@/interfaces/interface_globals"
import {getDate, convertDate, stringReplacer, magazineUrlReplacer} from "@/utils"
import {Metadata} from "next"
import DocumentGallery from '@/components/DocumentGallery'
import Breadcrumbs from '@/components/Breadcrumbs'
import SimilarPosts from '@/components/SimilarPosts'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/books?populate=1000`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{

  const data: Book[] = await getData()
  const decodedSlug: string = decodeURIComponent(magazineUrlReplacer(params.slug))

  const postMatch:Book[] = data.filter(item=>{
    return magazineUrlReplacer(item.title) === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    return{
      title: "Inhalt nicht gefunden"
    }
  }

  const post: Book = postMatch[0]

  return{
    title: post.title,
    description: stringReplacer(post.seo),
    openGraph: {
      title: post.title,
      description: stringReplacer(post.seo).split("&nbsp;")[0],
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

  const data: Book[] = await getData()
  const decodedSlug: string = decodeURIComponent(magazineUrlReplacer(params.slug))

  const postMatch:Book[] = data.filter(item=>{
    return magazineUrlReplacer(item.title) === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    notFound()
  }

  const subTags:Tag[] = postMatch[0].tags.filter(item=> item.type === "sub")

  const subTagNames:string[] = subTags.map(subtag=>{
    return subtag.item
  })

  const similarPosts:Book[] = []
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

  const post = postMatch[0]

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
        <section>
          <h2>Eckdaten</h2>
          <DataTableBooks data={post.data}/>
        </section>
        <section>
          <h2>Vorwort</h2>
          {post.intro?.map((item, index) =>{
            return(
              <>
              {item.text ? <div key={`introText_${index}`}dangerouslySetInnerHTML={{__html: item.text}}></div> 
              : null}
              {item.media ? <Gallery key={`introMedia_${index}`} images={item.media} /> 
              : null}
              {item.documents ? <DocumentGallery key={`introDocs_${index}`} docs={item.documents} />
              : null}
              </>
            )
          })}
        </section>
        <section>
        <h2>Von Aussen</h2>
          {post.outside?.map((item, index) =>{
            return (
              <>
              {item.text ? <div key={`outsideText_${index}`}dangerouslySetInnerHTML={{__html: item.text}}></div> 
              : null}
              {item.media ? <Gallery key={`outsideMedia_${index}`} images={item.media} /> 
              : null}
              {item.documents ? <DocumentGallery key={`outsideDocs_s${index}`} docs={item.documents} />
              : null}
              </>
            )
          })}
        </section>
        <section>
        <h2>Inhalt</h2>
        {post.content?.map((item, index) =>{
            return (
              <>
              {item.text ? <div key={`contentText_${index}`}dangerouslySetInnerHTML={{__html: item.text}}></div> 
              : null}
              {item.media ? <Gallery key={`contentMedia_${index}`} images={item.media} /> 
              : null}
              {item.documents ? <DocumentGallery key={`contentDocs_${index}`} docs={item.documents} />
              : null}
              </>
            )
          })}
        </section>
        <section>
        <h2>Eindrücke</h2>
        {post.impressions?.map((item, index) =>{
            return (
              <>
              {item.text ? <div key={`insideText_${index}`}dangerouslySetInnerHTML={{__html: item.text}}></div> 
              : null}
              {item.media ? <Gallery key={`insideMedia_${index}`} images={item.media} /> 
              : null}
              {item.documents ? <DocumentGallery key={`insideDocs_${index}`} docs={item.documents} />
              : null}
              </>
            )
          })}
        </section>
        <section>
        <h2>Preis & Verfügbarkeit</h2>
        {post.availability?.map((item, index) =>{
            return (
              <>
              {item.text ? <div key={`availabilityText_${index}`}dangerouslySetInnerHTML={{__html: item.text}}></div> 
              : null}
              {item.media ? <Gallery key={`availabilityMedia_${index}`} images={item.media} /> 
              : null}
              {item.documents ? <DocumentGallery key={`availabilityDocs_${index}`} docs={item.documents} />
              : null}
              </>
            )
          })}
        </section>
        <section>
        <h2>Persönliches Fazit</h2>
        {post.conclusion?.map((item, index) =>{
            return (
              <>
              {item.text ? <div key={`conclusionText_${index}`}dangerouslySetInnerHTML={{__html: item.text}}></div> 
              : null}
              {item.media ? <Gallery key={`conclusionMedia_${index}`} images={item.media} /> 
              : null}
              {item.documents ? <DocumentGallery key={`conclusionDocs_${index}`} docs={item.documents} />
              : null}
              </>
            )
          })}
        </section>
          {similarPosts.length !== 0 ? <SimilarPosts similarPosts={similarPosts} /> : null}
      </article>
      
    </main>
  )
}
