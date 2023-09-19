import { PistolCard} from "@/interfaces/interface_Cards"
import s from "@/styles/Cards.module.css"
import d from "@/styles/Spoiler.module.css"
import Image from "next/image"
import { getFlag } from "@/utils"

interface Props{
    subCategory: string
}

async function getData(){
    const getData = await fetch(`https://cms.schussfreude.ch/api/content/items/cardsPistol?populate=1`,{
      "headers": {
        "api-key": process.env.CMS!
      }  
    ,
    next: { revalidate: 10 } }) // TODO: Increase in prod
    
    return await getData.json()
  }

export default async function PistolCard({subCategory}:Props){

    function sortByManufacturer(a:PistolCard,b:PistolCard){
        const x:string = a.manufacturer
        const y:string = b.manufacturer
        return x < y ? 1 : x > y ? -1 : 0
    }

    const data: PistolCard[] = await getData()
    const sortedData: PistolCard[] = data.sort((a:PistolCard,b:PistolCard)=>sortByManufacturer(a,b))
    const filteredData: PistolCard[] = sortedData.filter(data => data.subCategory === subCategory)
    const manufacturers: string[] = []
    filteredData.map(data => {
        if(!manufacturers.includes(`${data.manufacturer}_${data.country}`)){
            manufacturers.push(`${data.manufacturer}_${data.country}`)
        }
    })

    return(
        <>
        {manufacturers.map(manufacturer =>{
            return(
                <details className={d.details}>
                    <summary className={d.summary}>
                    <div className={d.icon}>
                        <Image
                            src={getFlag(manufacturer.split("_")[1])}
                            alt={`Flag`}
                            fill={true}
                            style={{objectFit: "contain"}}
                        />
                    </div>
                {manufacturer.split("_")[0]}
                    </summary>
                    <div className={d.content}>
                <div className={s.container}>
                {
                    filteredData.map(data=>{
                        if(data.manufacturer === manufacturer.split("_")[0]){
                            return (
                            <div className={s.card}>
                                <div className={s.image}>
                                    <Image
                                        src={`https://cms.schussfreude.ch/storage/uploads/${data.image.path}`}
                                        alt={data.name}
                                        fill={true}
                                        style={{objectFit: "contain"}}
                                    />
                                </div>
                                <div className={s.model}>{data.name}</div>
                                <table className={s.table}>
                                    <tbody>
                                        <tr>
                                            <td>Länge</td>
                                            <td>{data.length}</td>
                                        </tr>
                                        <tr>
                                            <td>Höhe</td>
                                            <td>{data.height}</td>
                                        </tr>
                                        <tr>
                                            <td>Breite</td>
                                            <td>{data.width}</td>
                                        </tr>
                                        <tr>
                                            <td>Abzugsgewicht</td>
                                            <td>{data.triggerPull}</td>
                                        </tr>
                                        {data.remarks? 
                                        <tr>
                                            <td colSpan={2} dangerouslySetInnerHTML={{__html:data.remarks}}></td>
                                        </tr>
                                        : null}
                                    </tbody>
                                </table>
                            </div>
                            )
                        }
                    })
                }
                </div>
                </div>
                </details>
            )
        })}
        </>
    )
}