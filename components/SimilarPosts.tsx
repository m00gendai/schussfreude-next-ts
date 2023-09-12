import Swiper_Similar from '@/components/Swiper_Similar'
import ArticleGallerySimilar from '@/components/ArticleGallerySimilar'
import {Book} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"
import {App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"

interface Props{
    similarPosts: (Book | Misc | App | Accessory | Magazine | SWM)[]
}

export default function SimilarPosts({similarPosts}:Props){
    return(
        <section>
          <h2>Ähnliche Artikel</h2>
          <div className="sliderWrapper">
            <Swiper_Similar articles={similarPosts}/>
          </div>
          <ArticleGallerySimilar articles={similarPosts} />
        </section>
    )
}