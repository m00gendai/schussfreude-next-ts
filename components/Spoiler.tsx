import s from "@/styles/Spoiler.module.css"
import {Spoiler} from "@/interfaces/interface_globals"
import Gallery from "@/components/Gallery"
import Image from "next/image"

interface Props{
    content:Spoiler
}

export default function Spoiler({content}:Props){
    return(
        <details key={content.title} className={s.details}>
            <summary className={s.summary}>
                <div className={s.icon}>
                    {content.icon ? <Image
                        src={`https://cms.schussfreude.ch/storage/uploads/${content.icon.path}`}
                        alt={`Icon`}
                        fill={true}
                        style={{objectFit: "contain"}}
                    /> : null}
                </div>
            {content.title}
            </summary>
            <div className={s.content}>
            {content.text ? <div className={s.text} dangerouslySetInnerHTML={{__html: content.text}}></div> : null}
            {content.media ? <Gallery images={content.media} /> : null}
            </div>
        </details>
    )
}