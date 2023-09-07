"use client"

import s from "@/styles/Breadcrumbs.module.css"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Router } from "next/router"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { BiChevronsRight } from "react-icons/bi"

export default function Breadcrumbs(){

    const router:AppRouterInstance = useRouter()
    const pathName = usePathname()
    const pathArray = pathName.substring(1, pathName.length-1).split("/")


    function handleClick(path:string){
        const item:number = pathArray.indexOf(path)
        const slicedPath:string[] = pathArray.slice(0,item+1)
        const breaderifiedUrl:string = slicedPath.join("/")
        router.push(breaderifiedUrl)
    }
    return(
        <div className={s.container}>
            {
                pathArray.map((path, index)=>{
                    if(index < pathArray.length-1){
                        return (
                            <>
                            <p onClick={()=>handleClick(path)}>{`${path}`}</p>
                            {index < pathArray.length-2 ? <BiChevronsRight />: null}
                            </>
                        )
                    }
                })
            }
        </div>
    )
}