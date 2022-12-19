import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="site-header sticky top-0 left-0 w-full bg-white text-gray-500 bg-opacity-75 backdrop-blur-md z-10">
            <div className="header-content container flex justify-between items-center py-6 font-sans">
                <Link to="/" className="text-gray-500 hover:text-gray-800 transition">Folding poetry</Link>
                <span>Menu</span>
            </div>
        </header>
    )
}