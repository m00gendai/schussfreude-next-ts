import { Volume } from '@/interfaces/interface_Magazine'
import s from "@/styles/VolumeAnchors.module.css"
import { sortDataByNumber } from '@/utils'

interface Props{
    volumes: Volume[]
}

export default function VolumeAnchors({volumes}:Props){

    const sortedVolumes:Volume[] = volumes.sort((a, b)=> sortDataByNumber(parseInt(a.volume), parseInt(b.volume), "asc"))

    return(
        <div className={s.container}>
        {sortedVolumes.map(volume=>{
            return <a className={s.link} key={`anchor_${volume.volume}`} href={`#swm_${volume.volume}`}>{volume.volume}</a>
        })}
        </div>
    )   
}