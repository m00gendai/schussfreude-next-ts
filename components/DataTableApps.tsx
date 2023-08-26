import s from "@/styles/DataTable.module.css"
import {Data} from "@/interfaces/interface_App"

  interface Props{
    data: Data
  }

export default function DataTableBooks({data}:Props){
    return(
        <table className={s.table}>
            <tbody>
                <tr className={s.row}>
                    <td className={s.cell}>App Name</td>
                    <td className={s.cell}>{data.name}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Entwickler</td>
                    <td className={s.cell}>{data.developer}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Plattform</td>
                    <td className={s.cell}>{data.platform}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Getestete Plattform</td>
                    <td className={s.cell}>{data.testPlatform}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Grösse</td>
                    <td className={s.cell}>{data.size}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Sprache</td>
                    <td className={s.cell}>{data.language}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Getestete Version</td>
                    <td className={s.cell}>{data.testedVersion}</td>
                </tr>
            </tbody>
        </table>
    )
}