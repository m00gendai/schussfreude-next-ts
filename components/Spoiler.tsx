import s from "@/styles/Spoiler.module.css"
import {Spoiler} from "@/interfaces/interface_Misc"
import Gallery from "@/components/Gallery"

interface Props{
    content:Spoiler
}

export default function Spoiler({content}:Props){
    return(
        <details key={content.title} className={s.details}>
            <summary className={s.summary}>
            {content.title}
            </summary>
            <div className={s.content}>
            {content.text ? <div className={s.text} dangerouslySetInnerHTML={{__html: content.text}}></div> : null}
            {content.media ? <Gallery images={content.media} /> : null}
            </div>
        </details>
    )
}