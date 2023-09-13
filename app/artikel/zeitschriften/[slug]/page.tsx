import { notFound } from 'next/navigation'
import React from 'react'
import Gallery from '@/components/Gallery'
import {Magazine} from "@/interfaces/interface_Magazine"
import {Tag} from "@/interfaces/interface_globals"
import {getDate, convertDate, stringReplacer, sortDataByIssue} from "@/utils"
import {Metadata} from "next"
import MagazineGallery from '@/components/MagazineGallery'
import { SWM } from '@/interfaces/interface_SWM'
import DocumentGallery from '@/components/DocumentGallery'
import Breadcrumbs from '@/components/Breadcrumbs'
import SimilarPosts from '@/components/SimilarPosts'

async function getData(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/magazines?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

async function getSWM(){
  const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/swm?populate=1`,{
    "headers": {
      "api-key": process.env.CMS!
    }  
  ,
  next: { revalidate: 10 } }) // TODO: Increase in prod
  
  return await getData.json()
}

export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{

  const data: Magazine[] = await getData()
  const decodedSlug: string = decodeURIComponent(params.slug).toLowerCase()

  const postMatch:Magazine[] = data.filter(item=>{
    return decodeURIComponent(item.title).toLowerCase().replaceAll(" ", "-") === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    return{
      title: "Inhalt nicht gefunden"
    }
  }

  const post: Magazine = postMatch[0]

  return{
    title: post.title,
    description: stringReplacer(post.intro[0].text),
    openGraph: {
      title: post.title,
      description: stringReplacer(post.intro[0].text),
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
      description: stringReplacer(post.intro[0].text),
      images: [`https://cms.schussfreude.ch/storage/uploads/${post.hero.path}`],
    },
  }
}

export default async function Page({params}:{params:{slug:string}}) {

  const data: Magazine[] = await getData()
  const decodedSlug: string = decodeURIComponent(params.slug).toLowerCase()

  const postMatch:Magazine[] = data.filter(item=>{
    return decodeURIComponent(item.title).toLowerCase().replaceAll(" ", "-") === decodedSlug
  })

  if(postMatch.length === 0){ // if above filter yielded no results
    notFound()
  }

  const subTags:Tag[] = postMatch[0].tags.filter(item=>{
    return item.type === "sub"
  })
  
  const similarPosts:Magazine[] = data.filter(item=>{
    if(item.title !== postMatch[0].title){
      return item.tags.map(tag=>{
        return subTags.map(subTag=>{
          return tag.item === subTag.item
        })
      })
    }
  })

  const post: Magazine = postMatch[0]

  const issues: SWM[] = await getSWM()
  const sortedIssues: SWM[] = issues.sort((a,b) =>sortDataByIssue(a,b))

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
          <h2>Übersicht der Jahrgänge</h2>
          {post.volumes.map(volume=>{
            return <a key={`anchor_${volume.volume}`} href={`#swm_${volume.volume}`}>{volume.volume}</a>
          })}
        {
          post.volumes.map(volume =>{
            return (
              <section key={`volume_${volume.volume}`}>
                <h3 id={`swm_${volume.volume}`}>{volume.volume}</h3>
                <Gallery images={volume.panorama} />
                {sortedIssues.map(issue=>{
                  if(issue.year === volume.volume){
                    return <MagazineGallery key={issue._id} issue={issue} />
                  }
                })}
              </section>
            )
          })
        }
        </section>
          {similarPosts.length !== 0 ? <SimilarPosts similarPosts={similarPosts} /> : null}
      </article>
      
    </main>
  )
}
