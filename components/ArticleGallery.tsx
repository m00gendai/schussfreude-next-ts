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

type Filter = "Alle Artikel" | "Book" | "Misc" | "App" | "Accessory" | "Magazine" | "SWM"
const categoryTypes = ["Alle Artikel", "Bücher", "Allgemein", "Apps", "Zubehör / Hilfsmittel", "Zeitschriften", "SWM"]

interface Props{
    articles:(Book|Misc|App|Accessory|Magazine|SWM)[]
}

export default function ArticleGallery({articles}:Props){
    const [orderBy, setOrderBy] = useState<string>("new") 
    const [filter, setFilter] = useState<Filter>("Alle Artikel")   

    function handleOrder(){
        setOrderBy(orderBy === "new" ? "old" : "new")
    }

    const sortedArticles:(Book|Misc|App|Accessory|Magazine|SWM)[] = articles.sort(sortData(orderBy))
    console.log(sortedArticles.map(article => article.tags))
    return(
        <>
        <div className={s.toolbar}>
            {/*<button className={s.button} onClick={()=>handleOrder()} style={{marginBottom: "1rem"}}>
                {orderBy === "new" ? 
                    <><MdUpdate className={s.icon} /><p className={s.buttonText}>Neueste zuerst</p></>
                    :
                    <><MdUpdate className={s.icon} style={{transform: "rotateY(180deg)"}}/><p className={s.buttonText}>Älteste zuerst</p></>
                }
            </button>*/}
            <div className={s.filters}>
                {
                    categoryTypes.map(mainTag=>{
                        return(
                            <div className={filter === mainTag ? s.filterItemSelected : s.filterItem} key={`mainTagBox_${mainTag}`}>
                                <div className={s.filterItemInner}>
                                    <label className={s.label} htmlFor={`checkbox_${mainTag}`} >{mainTag}</label>
                                    <input className={s.check} type="radio" id={`checkbox_${mainTag}`} onChange={()=>setFilter(`${mainTag as Filter}`)} name={`checkbox_${mainTag}`} value={mainTag} checked={filter === mainTag ? true : false}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className={s.grid}>
            {
            sortedArticles.map(article=>{
               if(filter === article.tags[0].item || filter === "Alle Artikel"){
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