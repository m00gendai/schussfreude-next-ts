import s from "@/styles/Categories.module.css"
import {Tag} from "@/interfaces/interface_globals"
import { getCategory, gradientPlaceholder, toRGB } from "@/utils"
import Image from "next/image"
import Link from "next/link"

interface Props{
    cats:Tag[]
}

export default function Categories({cats}:Props){

    const sortedData:Tag[] = cats.sort((a:Tag, b:Tag)=>a.item > b.item ? 1 : a.item < b.item ? -1 : 0)

    return(
        <div className={s.container}>
            {sortedData.map(item=>{
                if(item.type === "main" && item.item !== "SWM"){
                    const rgb:string[] = item.thumb.colors.map(color => toRGB(color))
                    return(
                        <Link href={`/artikel/${getCategory(item)}`} className={s.item} key={item._id} style={gradientPlaceholder(rgb)}>
                            {item.thumb ?
                                <Image
                                    src={`https://cms.schussfreude.ch/storage/uploads/${item.thumb.path}`}
                                    alt={item.thumb.description}
                                    fill={true}
                                    style={{objectFit: "cover"}}
                                />
                                :
                                null
                            }
                            <div className={s.inner}>
                                {item.item}
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
    )
}