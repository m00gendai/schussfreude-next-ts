import Image from 'next/image'
import s from "@/styles/frontpage.module.css"

export default function Home() {
  return (
    <main>
      <h1 className={s.h1}>schussfreude.ch</h1>
      <p className={s.p}>Vorschau der neuen schussfreude.ch-Seite.</p>
    </main>
  )
}
