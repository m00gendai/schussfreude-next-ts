"use client"

import {Medium} from "@/interfaces/interface_globals"
import s from "@/styles/Lightbox.module.css"
import { useState } from 'react';
import Image from "next/image"

interface Props{
    images: Medium[]
    lightBoxIndex: number
    setLightBoxIndex: React.Dispatch<React.SetStateAction<number>>
    setShowLightBox: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Lightbox({images, lightBoxIndex, setLightBoxIndex, setShowLightBox}:Props){

    const [currentImg, setCurrentImg] = useState<Medium>(images[lightBoxIndex])
    const [showCaption, setShowCaption] = useState<boolean>(true)

    function handleClose(){
        setShowLightBox(false)
    }
    
    function handleLever(){
        setShowCaption(!showCaption)
    }

    function handleNavigation(direction:string){
        if(direction === "prev"){
            setLightBoxIndex(lightBoxIndex => lightBoxIndex === 0 ? images.length-1 : lightBoxIndex-1)
            setCurrentImg(images[lightBoxIndex])
        }
        if(direction === "next"){
            setLightBoxIndex(lightBoxIndex => lightBoxIndex === images.length-1 ? 0 : lightBoxIndex+1)
            setCurrentImg(images[lightBoxIndex])
        }
    }

    return(
        <div className={s.veil}>
            <div className={s.modal}>
                <div className={s.closeWrapper} onClick={()=>handleClose()}>X</div>
                <div className={s.imageWrapper}>
                    {images.length > 1 ? <div className={s.prev} onClick={()=>handleNavigation("prev")}>{`<`}</div> : null}
                    {images.length > 1 ? <div className={s.next} onClick={()=>handleNavigation("next")}>{`>`}</div> : null}
                <Image
                        src={`https://cms.schussfreude.ch/storage/uploads/${currentImg.path}`}
                        alt={currentImg.title}
                        fill={true}
                        style={{objectFit: "contain"}}
                    />
                    {currentImg.description ?
                    <div className={s.caption} style={showCaption ? {height: "auto"} : { height: "0"}}>
                        <div className={s.lever} onClick={()=>handleLever()}>{`Bildunterschrift`}</div>
                        {showCaption ? <div className={s.text}>
                            {currentImg.description}
                        </div> : null}
                    </div>
                    : null}
                </div>
            </div>
        </div>
    )
}