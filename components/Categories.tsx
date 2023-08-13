import s from "@/styles/Categories.module.css"

export default function Categories(){

    /* TODO: This will be replaced with API data and is now solely for placeholder purposes */
    const mockData: string[] = [
        "Placeholder 1",
        "Placeholder 2",
        "Placeholder / Placeholder",
        "Placeholder 4",
        "Placeholder 5",
    ]

    return(
        <div className={s.container}>
            {mockData.map(data=>{
                return(
                    /* TODO: Change key to _id */
                    <div className={s.item} key={data}>
                        <div className={s.inner}>
                            {data}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}