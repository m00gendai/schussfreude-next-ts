"use client"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

import Image from "next/image"
import Link from "next/link"
import s from "@/styles/Swiper_Similar.module.css"
import{Book,Medium} from "@/interfaces/interface_Book"
import{Misc} from "@/interfaces/interface_Misc"
import{App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import { getAspectRatio, sortData, getCategory } from "@/utils"
import {BiChevronLeftCircle, BiChevronRightCircle} from "react-icons/bi"

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation"
import "swiper/css/scrollbar"

interface Props{
    articles:(Book[]|Misc[]|App[]|Accessory[]|Magazine[])
}

export default function Swiper_Similar({articles}:Props){

    const sortedArticles:(Book[]|Misc[]|App[]|Accessory[]|Magazine[]) = articles

    return(
        <Swiper
        style={{
            position: "relative",
            width: "100%",
            height: "auto",
        }}
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={25}
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
                    </div>
                    </div>
                </Link>
                
                </SwiperSlide>
                
                )
            })
            }
            {/** ATTN: Styles for these button are in globals.css because otherwise they do not register with swiper */}
            <div className={`similar_next`}>
                <div className={`similar_next_container`}>
            <BiChevronRightCircle />
                </div>
            </div>
            <div className={`similar_prev`}>
                <div className={`similar_prev_container`}>
            <BiChevronLeftCircle />
                </div>
            </div>
    </Swiper>

    )
}