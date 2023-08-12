import s from "@/styles/Hero.module.css"

export default function Hero(){

    /* TODO: This will be replaced with API data and is now solely for placeholder purposes */
    const mockData: string[] = [
        "Placeholder 1",
        "Placeholder 2",
        "Placeholder 3",
        "Placeholder 4",
        "Placeholder 5",
    ]

    return(
        <div className={s.hero}>
            {mockData.map(data=>{
                return(
                    /* TODO: Change key to _id */
                    <div className={s.item} key={data}>
                        <div className={s.caption}>
                            {data}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}