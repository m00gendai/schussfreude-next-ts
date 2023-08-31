"use client"

import Image from "next/image"
import Link from "next/link"
import s from "@/styles/ArticleGallerySimilar.module.css"
import{Book} from "@/interfaces/interface_Book"
import{Misc} from "@/interfaces/interface_Misc"
import{App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
import { sortData, getCategory, magazineUrlReplacer } from "@/utils"
import { MdUpdate } from "react-icons/md";
import { useState } from "react"

interface Props{
    articles:(Book|Misc|App|Accessory|Magazine|SWM)[]
}

export default function ArticleGallery({articles}:Props){

    const [showAll, setShowAll] = useState<number>(3)
  
    function loadAll(){
        setShowAll(articles.length)
    }

    const sortedArticles:(Book|Misc|App|Accessory|Magazine|SWM)[] = articles.sort(sortData("new"))

    return(
        <div className={s.wrapper}>
        <div className={s.grid}>
            {
            sortedArticles.map((article, index)=>{
                if(index < showAll){
                return(
                <Link href={`/artikel/${getCategory(article.tags)}/${magazineUrlReplacer(article.title)}`} key={article._id} className={s.itemFrame}>
                    <div className={s.itemContainer}>
                        {article.hero ?
                    <div className={s.item}>
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
        <div className={s.toolbar}>
            <button className={s.button} onClick={()=>loadAll()}>
                {`Alle anzeigen (${sortedArticles.length})`}
            </button>
        </div>
        </div>
    )
}