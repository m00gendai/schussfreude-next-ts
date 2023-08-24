"use client"

import {Book, Tag} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import s from "@/styles/Tab.module.css"
import Categories from "@/components/Categories"
import Hero from "@/components/Hero"
import {useState} from "react"
import { render } from "react-dom"

interface Props{
    articles: (Book|Misc)[]
    cats: Tag[]
}

export default function Tab({articles, cats}:Props){

    const [renderCat, setRenderCat] = useState<boolean>(false)

    function handleClick(){
        setRenderCat(!renderCat)
    }

    return(
        <div className={s.tab}>
            <div className={s.row}>
                <button className={s.button} onClick={()=>handleClick()}>
                    <span 
                        className={`${s.label} rightAlign`}
                        style={renderCat ? {fontSize: "0.75rem"} : {fontSize: "1.25rem"}}
                    >
                        Artikel
                    </span>
                    <span 
                        className={`${s.label} leftAlign`}
                        style={renderCat ? {fontSize: "1.25rem"} : {fontSize: "0.75rem"}}
                    >
                        Kategorien
                    </span>
                </button>
            </div>
            <div className={s.container}>
             
                {renderCat ? <Categories cats={cats} /> : <Hero articles={articles} />}
            </div>
        </div>
    )
}