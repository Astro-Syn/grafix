import type React from "react"
import Navbar from "../navbar/Navbar"

export default function Layout({children}: {children: React.ReactNode}){
    return (
        <div>
            <Navbar/>
            <main>{children}</main>
        </div>
    )
}