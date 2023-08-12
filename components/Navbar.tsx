import Link from "next/link"
import s from "../styles/Navbar.module.css"

export default function Navbar(){
    return(
        <nav className={s.nav}>
        <div className={s.logo}></div>
        <div className={s.container}>
            <Link className={s.link} href="/">Home</Link>
            <Link className={s.link} href="/Artikel">Artikel</Link>
            <Link className={s.link} href="/Zeitdokumente">Zeitdokumente</Link>
            <Link className={s.link} href="https://www.waffenforum.ch" target="_blank">waffenforum.ch</Link>
        </div>
        </nav>
    )
}