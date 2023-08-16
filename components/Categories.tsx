import s from "@/styles/Categories.module.css"
import {Tag} from "@/interfaces/interface_Book"
import Image from "next/image"

async function getData(){
    const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/tags?populate=1`,{
      "headers": {
        "api-key": process.env.CMS!
      }  
    ,
    next: { revalidate: 10 } }) // TODO: Increase in prod
    
    return await getData.json()
  }

export default async function Categories(){

    const data:Tag[] = await getData()
    const sortedData:Tag[] = data.sort((a:Tag, b:Tag)=>a.item > b.item ? 1 : a.item < b.item ? -1 : 0)

    return(
        <div className={s.container}>
            {sortedData.map(item=>{
                if(item.type === "main"){
                    return(
                        <div className={s.item} key={item._id}>
                            {item.thumb ?
                                <Image
                                    src={`https://cms.schussfreude.ch/storage/uploads/${item.thumb.path}`}
                                    alt={item.thumb.description}
                                    width={item.thumb.width}
                                    height={item.thumb.height}
                                    style={{width: "100%", height:"auto"}}
                                />
                                :
                                null
                            }
                            <div className={s.inner}>
                                {item.item}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}