import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="site-header sticky top-0 left-0 w-full bg-[#f8f8f8]/75 backdrop-blur-md z-10">
            <div className="header-content container flex justify-between items-center py-6 font-sans">
                <nav className="left flex gap-3">
                    <Link to="/" className="text-[#222] hover:text-green-500 transition">Folding poetry</Link>
                    <Link to="/archive" className="text-[#222] hover:text-green-500 transition">Archive</Link>
                    <Link to="/random" className="text-[#222] hover:text-green-500 transition">Random</Link>
                </nav>
                <span>Menu</span>
            </div>
        </header>
    )
}