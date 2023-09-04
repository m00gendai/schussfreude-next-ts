import { Document} from "@/interfaces/interface_globals"
import Link from "next/link"
import s from "@/styles/DocumentGallery.module.css"
import FileIcon from "@/public/file.png"
import Image from "next/image"

interface Props{
    docs: Document[]
}

export default function DocumentGallery({docs}:Props){
    return(
        <div className={s.container}>
            {docs.map(doc=>{
                return (
                    <Link key={doc._id} className={s.item} target="_blank" href={`https://cms.schussfreude.ch/storage/uploads/${doc.path}`}>
                        <div className={s.image}>
                            <Image
                                src={FileIcon}
                                alt={`File Icon`}
                            />
                        </div>
                        <p className={s.link}>{doc.title}</p>
                    </Link>
                )
            })}
        </div>
    )
}