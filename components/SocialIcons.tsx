import s from "../styles/Footer.module.css"
import Link from "next/link"
import Image from "next/image"
import Facebook from "../public/f_logo_RGB-Blue_72.png"
import Instagram from "../public/Instagram_Glyph_Gradient.png"
import Patreon from "../public/Digital-Patreon-Logo_FieryCoral.png"
import PayPal from "../public/PayPal_Logo_Icon_2014.svg.png"

export default function SocialIcons(){
    return(
        <div className={s.social}>
            <div className={s.container}>
                <Link className={s.socialItem} href="https://www.facebook.com/schussfreude/" target="_blank" title="Facebook">
                    <Image 
                        src={Facebook}
                        alt={"Facebook Logo"}
                        fill={true}
                    />
                </Link>
                <Link className={s.socialItem} href="https://www.instagram.com/schussfreude.ch/" target="_blank" title="Instagram">
                    <Image 
                        src={Instagram}
                        alt={"Instagram Logo"}
                        fill={true}
                    />
                </Link>
                <Link className={s.socialItem} href="https://www.patreon.com/schussfreude/creators" target="_blank" title="Patreon">
                    <Image 
                        src={Patreon}
                        alt={"Patreon Logo"}
                        fill={true}
                    />
                </Link>
                <Link className={s.socialItem} href="https://paypal.me/schussfreude?country.x=CH&locale.x=de_DE" target="_blank" title="PayPal">
                    <Image 
                        src={PayPal}
                        alt={"PayPal Logo"}
                        fill={true}
                    />
                </Link>
            </div>
        </div>
    )
}