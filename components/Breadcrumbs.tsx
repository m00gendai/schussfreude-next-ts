"use client"

import s from "@/styles/Breadcrumbs.module.css"

interface Props{
    url: string[]
}

function handleClick(url:string[], crumb:string, index:number){
    console.log(url)
    console.log(crumb)
    console.log(index)
}

export default function Breadcrumbs({url}:Props){
    return(
        <div className={s.container}>
            {
                url.slice(3).map((crumb, index)=>{
                    return (
                        <div className={s.crumbs} key={`crumb_${index}`}>
                            <p onClick={()=>handleClick(url, crumb, index)}>
                                {`${crumb.charAt(0).toLocaleUpperCase()}${crumb.substring(1,crumb.length)}`}
                            </p>
                            {
                                index < url.slice(3).length-1 ? <p className={s.separator}>{`>>`}</p> : ""
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}