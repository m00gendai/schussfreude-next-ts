import s from "@/styles/DataTable.module.css"
import {Data} from "@/interfaces/interface_Accessory"

  interface Props{
    data: Data
  }

export default function DataTableBooks({data}:Props){
    return(
        <table className={s.table}>
            <tbody>
                <tr className={s.row}>
                    <td className={s.cell}>Bezeichnung</td>
                    <td className={s.cell}>{data.name}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Hersteller</td>
                    <td className={s.cell}>{data.manufacturer}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Waffe</td>
                    <td className={s.cell}>{data.gun}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>SSV zugelassen</td>
                    <td className={s.cell}>{data.eligible}</td>
                </tr>
            </tbody>
        </table>
    )
}