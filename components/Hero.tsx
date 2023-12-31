import s from "@/styles/Hero.module.css"
import {Book} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import{App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
import Link from "next/link"
import Image from "next/image"
import {getCategory, gradientPlaceholder, magazineUrlReplacer, toRGB} from "@/utils"

interface Props{
    articles: (Book|Misc|App|Accessory|Magazine|SWM)[]
}

export default function Hero({articles}:Props){

    

    return(
        <div className={s.hero}>
            {articles.map((article, index)=>{
                if(index <= 4){
                    const rgb:string[] = article.hero.colors.map(color => toRGB(color))
                    return(
                        <Link href={`/artikel/${getCategory(article.tags)}/${magazineUrlReplacer(article.title)}`} className={s.item} key={article._id}>
                            <div className={s.container} style={gradientPlaceholder(rgb)}>
                            <Image 
                                src={`https://cms.schussfreude.ch/storage/uploads/${article.hero.path}`}
                                alt={article.hero.description}
                                fill={true}
                                style={{objectFit: "cover"}}
                            />
                            </div>
                            <div className={s.caption}>
                                {article.title}
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
    )
}