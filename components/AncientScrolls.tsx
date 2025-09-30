import s from "@/styles/AncientScrolls.module.css"
import d from "@/styles/Spoiler.module.css"
import { Script } from "@/interfaces/interface_Artifact"
import Link from "next/link"
import Image from "next/image"
import Catalog from "@/public/spell-book.png"
import Advert from "@/public/mailbox.png"
import Company from "@/public/factory.png"
import Lists from "@/public/money-stack.png"
import Misc from "@/public/bookshelf.png"

interface Props{
    doc: Script
}

export default function ancientScrolls({doc}:Props){

    return(
        <details className={d.details}>
            <summary className={d.summary}>
            <div className={d.icon}>
                    <Image
                        src={
                            doc.type === "Kataloge" ? Catalog.src :
                            doc.type === "Werbung" ? Advert.src : 
                            doc.type === "Preislisten" ? Lists.src :
                            doc.type === "Firmeninformationen" ? Company.src :
                            doc.type === "Diverses" ? Misc.src : 
                            Catalog.src}
                        alt={`Icon`}
                        fill={true}
                        style={{objectFit: "contain"}}
                    />
                </div>
                {doc.title}
            </summary>
            <div className={s.spoiler}>
        <div className={s.container}>
            <div className={s.document}>
                <Link
                    href={`https://cms.schussfreude.ch/storage/uploads/${doc.document?.path}`}
                    title={doc.title}
                    target={`_blank`}
                    className={s.imageWrapper}
                >
                    <Image 
                        src={`https://cms.schussfreude.ch/storage/uploads/${doc.thumbnail?.path}`}
                        alt={doc.title}
                        fill={true}
                        style={{objectFit: "contain"}}
                    />
                </Link>
            </div>
            <div className={s.description}>
                <div className={s.item}>
                    <p><strong>Herausgeber</strong></p>
                    <p>{doc.publisher}</p>
                </div>
                <div className={s.item}>
                    <p><strong>Jahrgang</strong></p>
                    <p>{doc.year}</p>
                </div>
                <div className={s.item}>
                    <p><strong>Beschreibung</strong></p>
                    <div dangerouslySetInnerHTML={{__html: doc.description}}></div>
                </div>
            </div>
        </div></div>
    </details>
    )
}