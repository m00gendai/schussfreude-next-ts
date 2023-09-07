"use client"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

import Image from "next/image"
import Link from "next/link"
import s from "@/styles/Swiper_Similar.module.css"
import{Book} from "@/interfaces/interface_Book"
import{Misc} from "@/interfaces/interface_Misc"
import{App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
import { getCategory } from "@/utils"

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation"
import "swiper/css/scrollbar"

interface Props{
    articles:(Book[]|Misc[]|App[]|Accessory[]|Magazine[]|SWM[])
}

export default function Swiper_Similar({articles}:Props){

    const sortedArticles:(Book[]|Misc[]|App[]|Accessory[]|Magazine[]|SWM[]) = articles

    return(
        <Swiper
        style={{
            position: "relative",
            width: "100%",
            height: "auto",
        }}
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={0}
        slidesPerView={"auto"}
        navigation={{
            prevEl: '.similar_prev',
            nextEl: '.similar_next',
          }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
    >
      {
            sortedArticles.map(article=>{
                return(
                    <SwiperSlide style={{width: "auto"}} key={article._id}>
                <Link href={`/artikel/${getCategory(article.tags)}/${article.title.toLowerCase().replaceAll(" ", "-")}`} className={s.itemFrame}>
                        {article.hero ?
                    <div className={s.item}>
                        <Image
                        src={`https://cms.schussfreude.ch/storage/uploads/${article.hero.path}`}
                        alt={article.hero.description}
                        fill={true}
                        style={{objectFit: "cover"}}
                        />
                    </div> : null}
             
                    <div className={s.caption}>
                        <div className={s.title}>{article.title}</div>
                        <div className={s.date}>{article.meta}</div>
                    </div>
                </Link>
                
                </SwiperSlide>
                
                )
            })
            }
    </Swiper>

    )
}