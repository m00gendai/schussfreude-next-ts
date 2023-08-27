"use client"

import Image from "next/image"
import Link from "next/link"
import s from "@/styles/ArticleGallery.module.css"
import{Book} from "@/interfaces/interface_Book"
import{Misc} from "@/interfaces/interface_Misc"
import{App} from "@/interfaces/interface_App"
import {Accessory, Tag} from "@/interfaces/interface_Accessory"
import {useState} from "react"
import { getAspectRatio, sortData, getCategory } from "@/utils"
import { MdUpdate } from "react-icons/md";

interface Props{
    articles:(Book|Misc)[]
}

export default function ArticleGallery({articles}:Props){
    const [orderBy, setOrderBy] = useState<string>("new")
    
    

    function handleOrder(){
        setOrderBy(orderBy === "new" ? "old" : "new")
    }

    const sortedArticles:(Book|Misc|App|Accessory)[] = articles.sort(sortData(orderBy))

    return(
        <>
        <div className={s.toolbar}>
            <button className={s.button} onClick={()=>handleOrder()}>
                {orderBy === "new" ? 
                    <><MdUpdate className={s.icon} /><p className={s.buttonText}>Neueste zuerst</p></>
                    :
                    <><MdUpdate className={s.icon} style={{transform: "rotateY(180deg)"}}/><p className={s.buttonText}>Älteste zuerst</p></>
                }
            </button>
        </div>
        <div className={s.grid}>
            {
            sortedArticles.map(article=>{
                return(
                <Link href={`/artikel/${getCategory(article.tags)}/${article.title.toLowerCase().replaceAll(" ", "-")}`} key={article._id} className={s.itemFrame}>
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
            })
            }
        </div>
        </>
    )
}