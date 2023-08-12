import Image from 'next/image'
import s from "@/styles/frontpage.module.css"
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'

export default function Home() {
  return (
    <main>
      <h1 className={s.h1}>schussfreude.ch</h1>
      <p className={s.p}>Vorschau der neuen schussfreude.ch-Seite.</p>
      <Hero />
      <Categories />
    </main>
  )
}
