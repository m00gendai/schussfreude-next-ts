"use client"

import s from "@/styles/Gallery.module.css"
import Image from 'next/image'
import { getAspectRatio } from "@/utils"
import {Medium} from "@/interfaces/interface_globals"
import Lightbox from "./Lightbox"
import { useState } from "react"

interface Props{
    images: Medium[]
}

export default function Gallery({images}:Props){

    const [showLightBox, setShowLightBox] = useState<boolean>(false)
    const [lightBoxIndex, setLightBoxIndex] = useState<number>(0)

    function handleClick(index:number){
        setLightBoxIndex(index)
        setShowLightBox(true)
    }

    return (
        <div className={s.container}>
            {showLightBox ? 
                images.length > 0 ? 
                    <Lightbox 
                        images={images} 
                        lightBoxIndex={lightBoxIndex} 
                        setLightBoxIndex={setLightBoxIndex} 
                        setShowLightBox={setShowLightBox}
                    />
                : null 
            : null}
            {
                images.length === 1 ? 
                    <>
                    <div className={s.flex}>
                        <figure className={s.single}>
                            <Image
                                src={`https://cms.schussfreude.ch/storage/uploads/${images[0].path}`}
                                alt={images[0].description}
                                width={images[0].width}
                                height={images[0].height}
                                style={images[0].width > images[0].height ? 
                                    {height: "auto", width: "100%"}
                                    :
                                    {width: "50%", height: "auto"}}
                                className={s.image}
                                onClick={()=>handleClick(0)}
                            />
                            <figcaption className={s.caption}>{images[0].description}</figcaption>
                        </figure>
                        
                    </div> 
                    </>
                :
                    <div className={s.grid}>
                        {images.map((image, index)=>{
                            return(
                                <div key={image._id} className={s.itemFrame}>
                                    <div className={s.itemContainer}>
                                        <div className={s.item} style={image.width > image.height ? 
                                            {height: "100%", aspectRatio: getAspectRatio(image)}
                                            :
                                            {width: "100%", aspectRatio: getAspectRatio(image)}}>
                                            <Image
                                                src={`https://cms.schussfreude.ch/storage/uploads/${image.path}`}
                                                alt={image.description}
                                                fill={true}
                                                onClick={()=>handleClick(index)}
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