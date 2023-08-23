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
    console.log(renderCat)

    return(
        <div className={s.tab}>
            <div className={s.row}>
                <button className={s.button} style={renderCat ? {background: "gainsboro", color: "grey"} : {background: "lightgrey", color: "black"}} onClick={()=>handleClick()}>Artikel</button>
                <button className={s.button} style={renderCat ? {background: "lightgrey", color: "black"} : {background: "gainsboro", color: "grey"}} onClick={()=>handleClick()}>Kategorien</button>
            </div>
            <div className={s.container}>
             
                {renderCat ? <Categories cats={cats} /> : <Hero articles={articles} />}
            </div>
        </div>
    )
}