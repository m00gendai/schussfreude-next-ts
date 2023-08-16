import Link from "next/link"
import Image from "next/image"
import s from "../styles/Navbar.module.css"
import Logo from "../public/logoSq.png"

export default function Navbar(){
    return(
        <nav className={s.nav}>
        <div className={s.logoContainer}>
            <Link href="/" className={s.logo}>
                <Image
                    src={Logo}
                    alt={`Schussfreude Logo`}
                    fill={true}
                />
            </Link>
        </div>
        <div className={s.container}>
            <Link className={s.link} href="/">Home</Link>
            <Link className={s.link} href="/artikel">Artikel</Link>
            <Link className={s.link} href="/zeitdokumente">Zeitdokumente</Link>
            <Link className={s.link} href="https://www.waffenforum.ch" target="_blank">waffenforum.ch</Link>
        </div>
        </nav>
    )
}