import Link from "next/link" 
import s from "@/styles/Footer.module.css"

export default function Footer_Mobile(){
    return(
        <footer className={s.footerMobile}>
            <div className={`${s.linkBox}`}>
                <div className={`${s.linkItem}`}>
                    <Link className={s.link} href="/kontakt" title="Kontaktformular">Kontakt</Link>
                </div>
                <div className={`${s.linkItem}`}>
                    <Link className={s.link} href="/impressum" title="Impressum">Impressum</Link>
                </div>
                <div className={`${s.linkItem}`}>
                    <Link className={s.link} href="/dsgvo" title="Datenschutzerklärung">Datenschutzerklärung</Link>
                </div>
            </div>
            <div className={s.social}>
                <Link className={s.socialItem} href="https://waffenforum.ch" target="_blank" title="waffenforum.ch"></Link>
                <Link className={s.socialItem} href="https://waffenforum.ch" target="_blank" title="waffenforum.ch"></Link>
                <Link className={s.socialItem} href="https://waffenforum.ch" target="_blank" title="waffenforum.ch"></Link>
                <Link className={s.socialItem} href="https://waffenforum.ch" target="_blank" title="waffenforum.ch"></Link>
            </div>
        </footer>
    )
}