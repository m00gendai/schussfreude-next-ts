"use client"

import Link from "next/link"
import Image from "next/image"
import s from "../styles/Navbar.module.css"
import {GiHamburgerMenu} from "react-icons/gi"
import {useState} from "react"
import Logo from "../public/logoSq.png"

export default function Navbar_Mobile(){

    const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false)
    const [rotate, setRotate] = useState<boolean>(false)

    function handleHamburgerOpen(){
        setRotate(!rotate)
        setHamburgerOpen(!hamburgerOpen)
    }

    return(
        <nav className={s.navMobile}>
        <div className={s.logoContainer}>
            <Link href="/" className={s.logo}>
                <Image
                    src={Logo}
                    alt={`Schussfreude Logo`}
                    fill={true}
                />
            </Link>
        </div>
        <div className={s.tagline}>schussfreude.ch</div>
        <div className={s.container}>
            <GiHamburgerMenu className={`${s.burger}`} style={rotate ? {transform: "rotate(90deg)"} : {}} onClick={()=>handleHamburgerOpen()}/>
            {hamburgerOpen ? <div className={s.subcontainer}>
                <Link className={s.sublink} onClick={()=>handleHamburgerOpen()} href="/">Home</Link>
                <Link className={s.sublink} onClick={()=>handleHamburgerOpen()} href="/artikel">Artikel</Link>
                <Link className={s.sublink} onClick={()=>handleHamburgerOpen()} href="/zeitdokumente">Zeitdokumente</Link>
                <Link className={s.sublink} onClick={()=>handleHamburgerOpen()} href="https://www.waffenforum.ch" target="_blank">waffenforum.ch</Link>
            </div> : null}
        </div>
        </nav>
    )
}