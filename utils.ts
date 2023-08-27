import {Tag,Medium, Book} from "@/interfaces/interface_Book"
import {Misc} from "@/interfaces/interface_Misc"

export function getDate(unix:number){
    const date: Date = new Date(unix*1000)
    return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${date.getMonth()+1 < 10 ? "0" : ""}${date.getMonth()+1}.${date.getFullYear()}`
  }
  
export function convertDate(dateString: string){
    const date: Date = new Date(dateString)
    return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${date.getMonth()+1 < 10 ? "0" : ""}${date.getMonth()+1}.${date.getFullYear()}`
  }

  function returnCategory(item: string){
    if(item === "Bücher"){
        return "buecher"
    }
    if(item === "Apps"){
        return "apps"
    }
    if(item === "Allgemein"){
        return "allgemein"
    }
    if(item === "Zeitschriften"){
        return "zeitschriften"
    }
    if(item === "Zubehör / Hilfsmittel"){
        return "zubehoer"
    }
  }

 export function getCategory(tags:(Tag | Tag[])){
    if(Array.isArray(tags)){
        for(let tag of tags){
            return returnCategory(tag.item)
        }
    }
    if(!Array.isArray(tags)){
        return returnCategory(tags.item)
    }
}

export function getAspectRatio(image:Medium){
    const orientation: string = image.width > image.height ? "landscape" : image.width < image.height ? "portrait" : "square"
    if(orientation === "landscape"){
        return `${image.width/image.height}/1`
    }
    if(orientation === "portrait"){
        return `1/${image.height/image.width}`
    }
    return `1/1`
}

export function sortData(orderBy:String){
    return function(a:(Book|Misc), b:(Book|Misc)){
        return Math.floor(new Date(orderBy === "new"? b.meta : a.meta).getTime() / 1000)-Math.floor(new Date(orderBy === "new"? a.meta : b.meta).getTime() / 1000)
    }
}

export function sortDataByDate(a:(Book|Misc), b:(Book|Misc)){
    return Math.floor(new Date(b.meta).getTime() / 1000)-Math.floor(new Date(a.meta).getTime() / 1000)
  }

export function stringReplacer(string:string){
    return string
        .replaceAll("<p>", "")
        .replaceAll("</p>", "")
        .replaceAll("&uuml;", "ü")
        .replaceAll("&auml;", "ä")
        .replaceAll("&ouml;", "ö")
        .replaceAll("&Uuml;", "Ü")
        .replaceAll("&Auml;", "Ä")
        .replaceAll("&Ouml;", "Ö")
        .replaceAll("&ndash;", "-")
        .replaceAll("&hellip;", "...")
        .replaceAll("<blockquote>", "\"")
        .replaceAll("</blockquote>", "\"")
        .replaceAll("<br>", "\n\r")
    }