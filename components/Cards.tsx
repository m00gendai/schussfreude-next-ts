import PistolCard from "./PistolCard"

interface Props{
    mainCategory: string
    subCategory: string
}

export default function Cards({mainCategory, subCategory}:Props){

    return(
        <>
         
        {mainCategory === "Pistolen" ? 
            subCategory === "Weitere" ? <PistolCard subCategory={subCategory} /> :
            null
        : null}
        </>
    )
}