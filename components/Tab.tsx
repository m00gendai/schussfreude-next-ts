"use client"

import {Book} from "@/interfaces/interface_Book"
import{Tag} from "@/interfaces/interface_globals"
import {Misc} from "@/interfaces/interface_Misc"
import {App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
import s from "@/styles/Tab.module.css"
import Categories from "@/components/Categories"
import Hero from "@/components/Hero"
import {TouchEventHandler, useState} from "react"
import { render } from "react-dom"

interface Props{
    articles: (Book|Misc|App|Accessory|Magazine|SWM)[]
    cats: Tag[]
}

export default function Tab({articles, cats}:Props){

    const [renderCat, setRenderCat] = useState<boolean>(false)

    function handleClick(){
        setRenderCat(!renderCat)
    }

    function handleSwipe(){
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
                    </span>onMouseMove
                </button>
            </div>
            <div className={s.container} onTouchEnd={()=>handleSwipe()}>
             
                {renderCat ? <Categories cats={cats} /> : <Hero articles={articles} />}
            </div>
        </div>
    )
}