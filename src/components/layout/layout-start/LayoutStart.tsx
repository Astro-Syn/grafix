import type React from "react";
import GraphixLogo from "../../graphix-logo/GraphixLogo";

export default function LayoutStart({children}: {children: React.ReactNode}) {
    return (
        <div className="top-nav-logo-wrapper">
            <GraphixLogo />
            <main>{children}</main>
        </div>
    )
}