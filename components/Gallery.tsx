"use client"

import s from "@/styles/Gallery.module.css"
import Image from 'next/image'
import { getAspectRatio } from "@/utils"
import {Medium} from "@/interfaces/interface_Book"

interface Props{
    images: Medium[]
}

export default function Gallery({images}:Props){
    
    return (
        <div className={s.container}>
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
                                    {height: "auto", width: "90%"}
                                    :
                                    {width: "45%", height: "auto"}}
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