import { Link } from "react-router-dom"

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className="mt-auto absolute bottom-0 left-0 w-full">
            <div className="footer-content flex justify-between items-center container h-20 text-sm text-gray-500">
                <div className="site-info">© {year} folding poetry</div>
                <Link className="text-gray-500" to="/">Home</Link>
            </div>
        </footer>
    )
}