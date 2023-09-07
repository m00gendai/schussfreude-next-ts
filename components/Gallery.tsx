"use client"

import s from "@/styles/Gallery.module.css"
import Image from 'next/image'
import { toRGB, gradientPlaceholder } from "@/utils"
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
                                    {height: "auto", width: "100%", background: gradientPlaceholder(images[0].colors.map(color => color)).background}
                                    :
                                    {width: "50%", height: "auto", background: gradientPlaceholder(images[0].colors.map(color => color)).background}}
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
                            const rgb:string[] = image.colors.map(color => toRGB(color))
                            return(
                                <div key={image._id} className={s.itemFrame}>
                                    <div className={s.itemContainer}
                                    style={gradientPlaceholder(rgb)}
                                    >
                                            <Image
                                                src={`https://cms.schussfreude.ch/storage/uploads/${image.path}`}
                                                alt={image.description}
                                                fill={true}
                                                style={{objectFit: "cover"}}
                                                onClick={()=>handleClick(index)}
                                            />
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
        </div>
    )
}