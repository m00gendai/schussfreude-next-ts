import {Source} from "@/interfaces/interface_globals"
import Link from "next/link"
import s from "@/styles/Sources.module.css"
import { sortDataByNumber } from "@/utils"

interface Props{
    sources: Source[]
}

export default function Sources({sources}:Props){

    const sortedSources:Source[] = sources.sort((a:Source, b:Source) => sortDataByNumber(a.content.split("<li>").length, b.content.split("<li>").length, "desc"))

    return(
        <section>
            <h2>Quellenangaben</h2>
            <p>Sofern nicht anders angegeben fallen die verwendeten Medien nicht unter eine Verwendungslizenz und sind frei verfügbar, respektive Public Domain</p>
            <div className={s.container}>
                {sortedSources.map((source, index)=>{
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