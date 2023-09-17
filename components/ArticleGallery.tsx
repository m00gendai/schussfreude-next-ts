"use client"

import Image from "next/image"
import Link from "next/link"
import s from "@/styles/ArticleGallery.module.css"
import{Book} from "@/interfaces/interface_Book"
import{Misc} from "@/interfaces/interface_Misc"
import{App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
import {useEffect, useState} from "react"
import { getAspectRatio, sortData, getCategory, magazineUrlReplacer, toRGB, gradientPlaceholder } from "@/utils"
import { MdUpdate } from "react-icons/md";

interface Filters{
    [key:string]: boolean
}

interface Props{
    articles:(Book|Misc|App|Accessory|Magazine|SWM)[]
}

export default function ArticleGallery({articles}:Props){
    const [orderBy, setOrderBy] = useState<string>("new") 
    const [filters, setFilters] = useState<Filters>({})   

    function handleOrder(){
        setOrderBy(orderBy === "new" ? "old" : "new")
    }

    const sortedArticles:(Book|Misc|App|Accessory|Magazine|SWM)[] = articles.sort(sortData(orderBy))
    
    const mainTags:Filters = {}
    articles.map(article=>{
        article.tags.map(tag=>{
            if(tag.type === "main"){
                if(!mainTags[tag.item] !== undefined){
                    {mainTags[tag.item] = true}
                }
            }
        })
    })

    useEffect(()=>{
        setFilters(mainTags)
    },[])

    return(
        <>
        <div className={s.toolbar}>
            <button className={s.button} onClick={()=>handleOrder()} style={Object.keys(filters).length > 1 ? {marginBottom: "1rem"}:{}}>
                {orderBy === "new" ? 
                    <><MdUpdate className={s.icon} /><p className={s.buttonText}>Neueste zuerst</p></>
                    :
                    <><MdUpdate className={s.icon} style={{transform: "rotateY(180deg)"}}/><p className={s.buttonText}>Älteste zuerst</p></>
                }
            </button>
            {Object.keys(filters).length > 1 ? 
            <div className={s.filters}>
                {
                    Object.keys(filters).map(mainTag=>{
                        return(
                            <div className={s.filterItem} key={`mainTagBox_${mainTag}`}>
                                <div className={s.filterItemInner}>
                                    <label htmlFor={`checkbox_${mainTag}`}>{mainTag}</label>
                                    <input onChange={()=>setFilters({...filters, [mainTag]: !filters[mainTag]})} type="checkbox" id={`checkbox_${mainTag}`} name={`checkbox_${mainTag}`} value={mainTag} checked={filters[mainTag]}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            : null}
        </div>
        <div className={s.grid}>
            {
            sortedArticles.map(article=>{
               if(filters[article.tags[0].item]){
                const rgb:string[] = article.hero.colors.map(color => toRGB(color))
                return(
                <Link href={`/artikel/${getCategory(article.tags)}/${magazineUrlReplacer(article.title)}`} key={article._id} className={s.itemFrame}>
                    <div className={s.itemContainer}>
                        {article.hero ?
                    <div className={s.item} style={gradientPlaceholder(rgb)}>
                        <Image
                        src={`https://cms.schussfreude.ch/storage/uploads/${article.hero.path}`}
                        alt={article.hero.description}
                        fill={true}
                        style={{objectFit: "cover"}}
                        />
                    </div> : null}
                    </div>
                    <div className={s.caption}>
                    <div className={s.text}>
                        <div className={s.title}>{article.title}</div>
                        <div className={s.date}>{article.meta}</div>
                    </div>
                    </div>
                </Link>
                )
            }
            })
            }
        </div>
        </>
    )
}