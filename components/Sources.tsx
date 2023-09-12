import {Source} from "@/interfaces/interface_globals"
import Link from "next/link"
import s from "@/styles/Sources.module.css"

interface Props{
    sources: Source[]
}

export default function Sources({sources}:Props){
    return(
        <section>
            <h2>Quellenangaben</h2>
            <p>Sofern nicht anders angegeben gehört Bild- und Tonmaterial schussfreude.ch oder ist Public Domain.</p>
            <div className={s.container}>
                {sources.map((source, index)=>{
                    return(
                        <div className={s.item} key={`sourceItem_${index}`}>
                            {source.source.link ? <Link className={s.link} target={`_blank`} href={source.source.link}>{source.source.owner}</Link> : <p className={s.link}>{source.source.owner}</p>}
                            <div className={s.content} dangerouslySetInnerHTML={{__html: source.content}}></div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}