import type React from "react"
import Navbar from "../navbar/Navbar"
import './Layout.css'

export default function Layout({children}: {children: React.ReactNode}){
    return (
        <div className='layout-wrapper'>
            <Navbar/>
            <main>{children}</main>
        </div>
    )
}