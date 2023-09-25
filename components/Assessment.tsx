import {Assessment} from "@/interfaces/interface_Misc"
import s from "@/styles/Assessment.module.css"

interface Props{
    assessment: Assessment
}

export default function Assessment({assessment}:Props){
    return(
        <div className={s.container}>
            <div className={s.pro}> 
                <strong>Vorteile</strong>
                <div dangerouslySetInnerHTML={{__html:assessment.pro}}></div>
            </div>
            <div className={s.contra}>
                <strong>Nachteile</strong>
                <div dangerouslySetInnerHTML={{__html:assessment.contra}}></div>
            </div>
        </div>
    )
}