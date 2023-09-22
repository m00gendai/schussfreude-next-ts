"use client"

import s from "@/styles/Breadcrumbs.module.css"
import { usePathname, useRouter } from "next/navigation"
import {SlDirections} from "react-icons/sl"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { BiChevronsRight } from "react-icons/bi"
import Link from "next/link"

export default function Breadcrumbs(){

    const router:AppRouterInstance = useRouter()
    const pathName = usePathname()
    const pathArray = pathName.substring(1, pathName.length-1).split("/")


    function handleClick(path:string){
        const item:number = pathArray.indexOf(path)
        const slicedPath:string[] = pathArray.slice(0,item+1)
        const breaderifiedUrl:string = slicedPath.join("/")
        return breaderifiedUrl
        
    }
    return(
        <div className={s.container}>
            <SlDirections style={{fontSize: "1.5rem", marginRight: "1rem"}}/>
            {
                pathArray.map((path, index)=>{
                    if(index < pathArray.length-1){
                        return (
                            <>
                            <Link className={s.link} href={`/${handleClick(path)}`} title={`Zurück zu ${path}`}>{`${path}`}</Link>
                            {index < pathArray.length-2 ? <BiChevronsRight />: null}
                            </>
                        )
                    }
                })
            }
        </div>
    )
}