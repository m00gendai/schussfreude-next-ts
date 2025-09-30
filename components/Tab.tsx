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
import {TouchEvent, TouchEventHandler, useState} from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

interface Props{
    articles: (Book|Misc|App|Accessory|Magazine|SWM)[]
    cats: Tag[]
}

export default function Tab({articles, cats}:Props){

    const [renderCat, setRenderCat] = useState<boolean>(false)

    /* 
        The left/right swipe detection logic si from
        https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react 
        I adapted it for TS and my use case
    */
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const minSwipeDistance:number = 50 


    const onTouchStart = (e:TouchEvent) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }
  
  const onTouchMove = (e:TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd){
        return
    } 
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isRightSwipe && renderCat){
        setRenderCat(!renderCat)
    }
    if(isLeftSwipe && !renderCat){
        setRenderCat(!renderCat)
    }
  }

  const onClicketyClack = () =>{
    setRenderCat(!renderCat)
  }

    return(
        <div className={s.tab}>
            <div className={s.row}>
                <span className={`${s.index} leftAlign`}>
                    {renderCat ? <span className={s.label} onClick={onClicketyClack}><BiChevronLeft />{`Neueste Artikel`}</span> : null}
                </span>
                
                <span className={`${s.index} rightAlign`}>
                    {renderCat ? null : <span className={s.label} onClick={onClicketyClack}>{`Artikelkategorien`}<BiChevronRight /></span>}
                </span>
            </div>
            <div className={s.container} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
             
                {renderCat ? <Categories cats={cats} /> : <Hero articles={articles} />}
            </div>
        </div>
    )
}