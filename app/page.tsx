import Image from 'next/image'
import s from "@/styles/frontpage.module.css"
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* TODO: This section will be removed on prod */}
      <h1 className={s.h1}>schussfreude.ch</h1>
      <p className={s.p}>Vorschau der neuen schussfreude.ch-Seite.</p>
      <Link style={{width: "100%", display: "block", textAlign: "center"}} href="https://a.kerika.com/acc_55R5PgME5wtTsnMjPWxYKX/board/brd_55i66YcDPJOkUPnv5C84UP" target="_blank" title="Status">
        Status Fortschritt (Englisch)
      </Link>
      <Link style={{width: "100%", display: "block", textAlign: "center"}} href="https://github.com/m00gendai/schussfreude-next-ts" target="_blank" title="Github">
        Github Repository (Englisch)
      </Link>
      {/* TODO: This will remain in prod. Delete comment then */}
      <Hero />
      <Categories />
    </main>
  )
}
