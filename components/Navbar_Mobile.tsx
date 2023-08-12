"use client"

import Link from "next/link"
import s from "../styles/Navbar.module.css"
import {GiHamburgerMenu} from "react-icons/gi"
import {useState} from "react"

export default function Navbar_Mobile(){

    const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false)

    function handleHamburgerOpen(){
        setHamburgerOpen(!hamburgerOpen)
    }

    return(
        <nav className={s.navMobile}>
        <div className={s.logo}></div>
        <div className={s.container}>
            <GiHamburgerMenu style={{margin: "0 2rem", fontSize: "2rem", color: "white"}} onClick={()=>handleHamburgerOpen()}/>
            {hamburgerOpen ? <div className={s.subcontainer}>
                <Link className={s.sublink} href="/">Home</Link>
                <Link className={s.sublink} href="/Artikel">Artikel</Link>
                <Link className={s.sublink} href="/Zeitdokumente">Zeitdokumente</Link>
                <Link className={s.sublink} href="https://www.waffenforum.ch" target="_blank">waffenforum.ch</Link>
            </div> : null}
        </div>
        </nav>
    )
}