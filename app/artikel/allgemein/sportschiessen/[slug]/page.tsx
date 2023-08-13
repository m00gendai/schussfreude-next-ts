import Image from 'next/image'
import Link from "next/link"
import React from 'react'

export default function Page({params}:{params:{slug:string}}) {

  return (
    <main>
      <h1>{params.slug}</h1>
    </main>
  )
}
