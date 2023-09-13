import{Book} from "@/interfaces/interface_Book"
import{Misc} from "@/interfaces/interface_Misc"
import{App} from "@/interfaces/interface_App"
import {Accessory} from "@/interfaces/interface_Accessory"
import {Magazine} from "@/interfaces/interface_Magazine"
import {SWM} from "@/interfaces/interface_SWM"
import {Tag, Medium} from "@/interfaces/interface_globals"

const date:Date = new Date()
export const currentYear:number = date.getFullYear()

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
    if(item === "SWM"){
        return "zeitschriften/swm"
    }
  }

 export function getCategory(tags:(Tag | Tag[])){
    if(Array.isArray(tags)){
        for(let tag of tags){
            if(tag.type === "main"){
                return returnCategory(tag.item)
            }
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
    return function(a:(Book|Misc|App|Accessory|Magazine|SWM), b:(Book|Misc|App|Accessory|Magazine|SWM)){
        return Math.floor(new Date(orderBy === "new"? b.meta : a.meta).getTime() / 1000)-Math.floor(new Date(orderBy === "new"? a.meta : b.meta).getTime() / 1000)
    }
}

export function sortDataByDate(a:(Book|Misc|App|Accessory|Magazine|SWM), b:(Book|Misc|App|Accessory|Magazine|SWM)){
    return Math.floor(new Date(b.meta).getTime() / 1000)-Math.floor(new Date(a.meta).getTime() / 1000)
  }

  export function sortDataByIssue(a:SWM, b:SWM){
    const issueA: string = a.title.replaceAll("(", "").replaceAll(")", "").split(" ")[3]
    const issueB: string = b.title.replaceAll("(", "").replaceAll(")", "").split(" ")[3]
    return issueA < issueB ? -1 : issueA > issueB ? 1 : 0
  }

export function stringReplacer(string:string){
    return string
        .replaceAll("&uuml;", "ü")
        .replaceAll("&auml;", "ä")
        .replaceAll("&ouml;", "ö")
        .replaceAll("&Uuml;", "Ü")
        .replaceAll("&Auml;", "Ä")
        .replaceAll("&Ouml;", "Ö")
        .replaceAll("&ndash;", "-")
        .replaceAll("&hellip;", "...")
        .replaceAll("&amp;", "&")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "")
        .replaceAll("<blockquote>", "\"")
        .replaceAll("</blockquote>", "\"")
        .replaceAll("<br>", "\n\r")
        .replaceAll("<ul>", "")
        .replaceAll("</ul>", "")
        .replaceAll("<li>", "| ")
        .replaceAll("</li>", " |")

    }

export function magazineUrlReplacer(string:string){
    return string
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .replaceAll("(", "")
        .replaceAll(")", "")
}

export function toRGB(hex: string) {
    const r:number = parseInt(hex.slice(1, 3), 16);
    const g:number = parseInt(hex.slice(3, 5), 16);
    const b:number = parseInt(hex.slice(5, 7), 16);
    const rgb:string = `${r},${g},${b}`;
    return rgb;
  }

  export function gradientPlaceholder(rgb:string[]){
    const style:React.CSSProperties = {
        background: `
            linear-gradient(72deg, rgba(${rgb[0]},0.8), rgba(${rgb[0]}, 0) 70.71%), 
            linear-gradient(144deg, rgba(${rgb[1]},0.8), rgba(${rgb[1]}, 0) 70.71%),
            linear-gradient(216deg, rgba(${rgb[2]},0.8), rgba(${rgb[2]}, 0) 70.71%),
            linear-gradient(288deg, rgba(${rgb[3]},0.8), rgba(${rgb[3]}, 0) 70.71%),
            linear-gradient(360deg, rgba(${rgb[4]},0.8), rgba(${rgb[4]}, 0) 70.71%)
            `,
    }
    return style
  }