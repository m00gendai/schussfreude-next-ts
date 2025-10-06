import s from "../styles/TransparencyNotice.module.css"

interface Props{
    content: string
}

export default function TransparencyNotice({content}:Props){
    return(
        <span className={s.container} dangerouslySetInnerHTML={{__html: content}}></span>
    )
}