"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from "react"
import { RxMoon, RxShadow, RxSun } from "react-icons/rx";
import s from "../styles/ThemeToggler.module.css"

export default function ThemeToggler(){

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <button className={s.button}><RxShadow/></button>
    }

    function toggleTheme(){
        theme === "dark" ? setTheme("light") : setTheme("dark")
    }

    return(
        <button className={s.button} onClick={toggleTheme}>{theme === "dark" ? <RxMoon/> : <RxSun/>}</button>
    )
}