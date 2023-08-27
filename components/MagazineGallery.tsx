import {SWM} from "@/interfaces/interface_SWM"
import s from "@/styles/MagazineGallery.module.css"
import d from "@/styles/Spoiler.module.css"
import { magazineUrlReplacer } from "@/utils"
import Image from "next/image"
import Link from "next/link"

interface Props{
    issue: SWM
}

export default function MagazineGallery({issue}:Props){
    

    return(
        <details className={d.details}>
            <summary className={d.summary}>
                {issue.title}
            </summary>
            <div className={s.gallery}>
                <Link 
                    href={`/artikel/zeitschriften/swm/${magazineUrlReplacer(issue.title)}`}
                    title={issue.title}
                    className={s.container}
                >
                    <div className={s.image}>
                        <Image
                            src={`https://cms.schussfreude.ch/storage/uploads/${issue.hero.path}`}
                            alt={`Titelbild ${issue.title}`}
                            fill={true}
                            style={{objectFit: "contain"}}
                        />
                    </div>
                    <div className={s.text} dangerouslySetInnerHTML={{__html: issue.coverThemes}}></div>
                </Link>
            </div>
        </details>
    )
}