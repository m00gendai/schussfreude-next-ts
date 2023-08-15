import s from "@/styles/DataTable.module.css"

export interface Data {
    title: string
    author: string
    release: string
    reprint: string
    publisher: string
    isbn: string
    pages: string
    weight: string
    dimensions: string
  }

  interface Props{
    data: Data
  }

export default function DataTableBooks({data}:Props){
    return(
        <table className={s.table}>
            <tbody>
                <tr>
                    <td>Buchtitel</td>
                    <td>{data.title}</td>
                </tr>
                <tr>
                    <td>Autor</td>
                    <td>{data.author}</td>
                </tr>
                <tr>
                    <td>Erscheinungsdatum</td>
                    <td>{data.release}</td>
                </tr>
                <tr>
                    <td>Auflage</td>
                    <td>{data.reprint}</td>
                </tr>
                <tr>
                    <td>Verlag</td>
                    <td>{data.publisher}</td>
                </tr>
                <tr>
                    <td>ISBN</td>
                    <td>{data.isbn}</td>
                </tr>
                <tr>
                    <td>Seiten</td>
                    <td>{data.pages}</td>
                </tr>
                <tr>
                    <td>Gewicht</td>
                    <td>{data.weight}</td>
                </tr>
                <tr>
                    <td>Dimensionen</td>
                    <td>{data.dimensions}</td>
                </tr>
            </tbody>
        </table>
    )
}