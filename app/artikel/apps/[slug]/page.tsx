import { notFound } from 'next/navigation'
import React from 'react'
import Gallery from '@/components/Gallery'
import {App} from "@/interfaces/interface_App"
import {Tag} from "@/interfaces/interface_globals"
import {getDate, convertDate, stringReplacer, getAspectRatio, magazineUrlReplacer} from "@/utils"
import Spoiler from '@/components/Spoiler'
import {Metadata} from "next"
import DataTableApps from '@/components/DataTableApps'
import DocumentGallery from '@/components/DocumentGallery'
import Breadcrumbs from '@/components/Breadcrumbs'
import AdditionalLinks from '@/components/AdditionalLinks'
import Sources from '@/components/Sources'
import SimilarPosts from '@/components/SimilarPosts'
import Link from 'next/link'
import Image from "next/image"

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/apps?populate=1000`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{

  const data: App[] = await getData()
  const decodedSlug: string = decodeURIComponent(params.slug).toLowerCase()

  const postMatch:App[] = data.filter(item=>{
    return decodeURIComponent(item.title).toLowerCase().replaceAll(" ", "-") === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    return{
      title: "Inhalt nicht gefunden"
    }
  }

  const post: App = postMatch[0]

  return{
    title: post.title,
    description: stringReplacer(post.content[0].paragraphs[0].text[0]),
    openGraph: {
      title: post.title,
      description: stringReplacer(post.content[0].paragraphs[0].text[0]),
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
      description: stringReplacer(post.content[0].paragraphs[0].text[0]),
      images: [`https://cms.schussfreude.ch/storage/uploads/${post.hero.path}`],
    },
  }
}

export default async function Page({params}:{params:{slug:string}}) {

  const data: App[] = await getData()
  const decodedSlug: string = decodeURIComponent(params.slug).toLowerCase()

  const postMatch:App[] = data.filter(item=>{
    return magazineUrlReplacer(item.title) === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    notFound()
  }

  const subTags:Tag[] = postMatch[0].tags.filter(item=>{
    return item.type === "sub"
  })
  
  const similarPosts:App[] = data.filter(item=>{
    if(item.title !== postMatch[0].title){
      return item.tags.map(tag=>{
        return subTags.map(subTag=>{
          return tag.item === subTag.item
        })
      })
    }
  })

  const post: App = postMatch[0]

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
          <DataTableApps data={post.data}/>
        </section>
          {post.content?.map((item, index) =>{
            return (
              <section key={item.title}>
              <h2>{item.title}</h2>
              
                {item.paragraphs.map((paragraph, index) =>{
                  return (
                    <section className="subSection" key={`paragraph_${index}`}>
                      {paragraph.text ? <div key={`outsideText${index}`} dangerouslySetInnerHTML={{__html: paragraph.text}}></div> : null}
                      {paragraph.media ? <Gallery key={`outsideMedia_${index}`} images={paragraph.media} /> :null}
                      {paragraph.documents ? <DocumentGallery key={`outsideDocument_${index}`} docs={paragraph.documents} /> : null}
                      {paragraph.spoiler ? paragraph.spoiler.map((spoiler, index) => <Spoiler key={`spoiler_${index}`} content={spoiler} />) : null}
                    </section>
                  )
                })}
              </section>
              
            )
          })}
          {post.download.length !== 0 ? 
              <section>
                <h2>Erhältlich bei</h2>
                <div className="storeContainer">
                {
                  post.download.map((store, index)=>{
                    return(
                      <Link href={store.link} className="store" key={`store_${index}`}>
                        <Image src={`https://cms.schussfreude.ch/storage/uploads/${store.appstore.icon.path}`}
                        alt={store.appstore.name}
                        fill={true}
                        style={{objectFit: "contain"}}
                        />
                      </Link>
                    )
                  })
                }
                </div>
              </section>
            : null}
          {post.links.length !== 0 ? <AdditionalLinks links={post.links} /> : null}
          {post.sources.length !== 0 ? <Sources sources={post.sources} /> : null}
          {similarPosts.length !== 0 ? <SimilarPosts similarPosts={similarPosts} /> : null}
      </article>
      
    </main>
  )
}
