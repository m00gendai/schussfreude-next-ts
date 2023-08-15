import s from "@/styles/Hero.module.css"
import {Book, Tag, Medium} from "@/interfaces/interface_Book"
import Link from "next/link"
import Image from "next/image"

interface Props{
    articles: (Book[])
}

export default function Hero({articles}:Props){

    function getCategory(tags:Tag[]){
        for(let tag of tags){
            if(tag.item === "Bücher"){
                return "buecher"
            }
        }
    }

    function getAspectRatio(image:Medium){
        const orientation: string = image.width > image.height ? "landscape" : image.width < image.height ? "portrait" : "square"
        if(orientation === "landscape"){
            return `${image.width/image.height}/1`
        }
        if(orientation === "portrait"){
            return `1/${image.height/image.width}`
        }
        return `1/1`
    }

    return(
        <div className={s.hero}>
            {articles.map(article=>{
                return(
                    <Link href={`/artikel/${getCategory(article.tags)}/${article.title.toLowerCase().replaceAll(" ", "-")}`} className={s.item} key={article._id}>
                        <div className={s.container} style={article.hero.width > article.hero.height ? 
                                            {height: "100%", aspectRatio: getAspectRatio(article.hero)}
                                            :
                                            {width: "100%", aspectRatio: getAspectRatio(article.hero)}}>
                        <Image 
                            src={`https://cms.schussfreude.ch/storage/uploads/${article.hero.path}`}
                            alt={article.hero.description}
                            width={article.hero.width}
                            height={article.hero.height}
                            style={{width: "100%", height: "auto"}}
                        />
                        </div>
                        <div className={s.caption}>
                            {article.title}
                        
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}