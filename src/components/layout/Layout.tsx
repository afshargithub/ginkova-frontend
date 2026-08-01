import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div
            className="
                flex
                min-h-screen
                flex-col
                bg-gray-50
                text-gray-900
            "
        >
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default Layout;