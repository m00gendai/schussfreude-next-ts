"use client"

import Image from "next/image"
import s from "@/styles/ArticleGallery.module.css"
import{Book,Medium} from "@/interfaces/interface_Book"
import {useState} from "react"
import { getAspectRatio, sortData } from "@/utils"

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
            <button className={s.button} onClick={()=>handleOrder()}>{orderBy}</button>
        </div>
        <div className={s.grid}>
            {
            sortedArticles.map(article=>{
                return(
                <div key={article._id} className={s.itemFrame}>
                    <div className={s.itemContainer}>
                    <div className={s.item} style={article.hero.width > article.hero.height ? 
                        {height: "100%", aspectRatio: getAspectRatio(article.hero)}
                        :
                        {width: "100%", aspectRatio: getAspectRatio(article.hero)}}>
                        <Image
                        src={`https://cms.schussfreude.ch/storage/uploads/${article.hero.path}`}
                        alt={article.hero.description}
                        fill={true}
                        />
                    </div>
                    </div>
                    <div className={s.caption}>
                    <div className={s.text}>
                        <div className={s.title}>{article.title}</div>
                        <div className={s.date}>{article.meta}</div>
                    </div>
                    </div>
                </div>
                )
            })
            }
        </div>
        </>
    )
}