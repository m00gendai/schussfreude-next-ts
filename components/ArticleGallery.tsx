"use client"

import Image from "next/image"
import Link from "next/link"
import s from "@/styles/ArticleGallery.module.css"
import{Book,Medium} from "@/interfaces/interface_Book"
import {useState} from "react"
import { getAspectRatio, sortData, getCategory } from "@/utils"
import { MdUpdate } from "react-icons/md";

interface Props{
    articles:(Book[])
}

export default function ArticleGallery({articles}:Props){
    const [orderBy, setOrderBy] = useState<string>("new")
    
    

    function handleOrder(){
        setOrderBy(orderBy === "new" ? "old" : "new")
    }

    const sortedArticles:(Book[]) = articles.sort(sortData(orderBy))

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
                    <div className={s.item} style={article.hero.width > article.hero.height ? 
                        {height: "100%", aspectRatio: getAspectRatio(article.hero)}
                        :
                        {width: "100%", aspectRatio: getAspectRatio(article.hero)}}>
                        <Image
                        src={`https://cms.schussfreude.ch/storage/uploads/${article.hero.path}`}
                        alt={article.hero.description}
                        fill={true}
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