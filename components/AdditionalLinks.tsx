import Link from "next/link"
import {LinkUrl} from "@/interfaces/interface_globals"
import s from "@/styles/AdditionalLinks.module.css"

interface Props{
    links: LinkUrl[]
}

export default function AdditionalLinks({links}:Props){
    return(
        <section>
            <h2>Weiterführende Links</h2>
            {links.map((link, index)=>{
                return(
                    <Link className={s.link} key={`link_${index}`} target={`_blank`} href={link.url} title={link.text}>{link.text}</Link>
                )
            })}
        </section>
    )
}