import s from "@/styles/DataTable.module.css"
import {Data} from "@/interfaces/interface_Book"

  interface Props{
    data: Data
  }

export default function DataTableBooks({data}:Props){
    return(
        <table className={s.table}>
            <tbody>
                <tr className={s.row}>
                    <td className={s.cell}>Buchtitel</td>
                    <td className={s.cell}>{data.title}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Autor</td>
                    <td className={s.cell}>{data.author}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Erscheinungsdatum</td>
                    <td className={s.cell}>{data.release}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Auflage</td>
                    <td className={s.cell}>{data.reprint}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Verlag</td>
                    <td className={s.cell}>{data.publisher}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>ISBN</td>
                    <td className={s.cell}>{data.isbn}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Seiten</td>
                    <td className={s.cell}>{data.pages}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Gewicht</td>
                    <td className={s.cell}>{data.weight}</td>
                </tr>
                <tr className={s.row}>
                    <td className={s.cell}>Dimensionen</td>
                    <td className={s.cell}>{data.dimensions}</td>
                </tr>
            </tbody>
        </table>
    )
}