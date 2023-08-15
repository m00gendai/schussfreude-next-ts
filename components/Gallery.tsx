"use client"

import s from "@/styles/Gallery.module.css"
import Image from 'next/image'
import {MutableRefObject, useRef} from "react"

export interface Medium {
    path: string
    title: string
    mime: string
    type: string
    description: string
    tags: string[]
    size: number
    colors: string[]
    width: number
    height: number
    _hash: string
    _created: number
    _modified: number
    _cby: string
    folder: string
    _id: string
  }

interface Props{
    images: Medium[]
}

export default function Gallery({images}:Props){


    const captionRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    function getAspectRatio(image:Medium){
        const orientation: string = image.width > image.height ? "landscape" : image.width < image.height ? "portrait" : "square"
        if(orientation === "landscape"){
            return `${image.width/image.height}/1`
        }
        if(orientation === "portrait"){
            return `1/${image.height/image.width}`
        }
        return `1/1`
    }

    return (
        <div className={s.container}>
            {
                images.length === 1 ? 
                    <>
                    <div className={s.flex}>
                        <figure className={s.single} style={{aspectRatio: getAspectRatio(images[0])}}>
                            <Image
                                src={`https://cms.schussfreude.ch/storage/uploads/${images[0].path}`}
                                alt={images[0].description}
                                width={images[0].width}
                                height={images[0].height}
                                style={{width: "100%", height: "100%"}}
                                className={s.image}
                            />
                            <figcaption className={s.caption}>{images[0].description}</figcaption>
                        </figure>
                        
                    </div> 
                    </>
                :
                    <div className={s.grid}>
                        {images.map(image=>{
                            return(
                                <div className={s.itemFrame}>
                                    <div className={s.itemContainer}>
                                        <div className={s.item} style={image.width > image.height ? 
                                            {height: "100%", aspectRatio: getAspectRatio(image)}
                                            :
                                            {width: "100%", aspectRatio: getAspectRatio(image)}}>
                                            <Image
                                                src={`https://cms.schussfreude.ch/storage/uploads/${image.path}`}
                                                alt={image.description}
                                                fill={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
        </div>
    )
}