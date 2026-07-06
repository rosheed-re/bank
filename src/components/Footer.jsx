import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="key-rule" aria-hidden="true">
                <svg viewBox="0 0 240 12" preserveAspectRatio="xMidYMid slice">
                    <pattern id="key" width="24" height="12" patternUnits="userSpaceOnUse">
                        <path
                            d="M0 12V4h4V0h4v8H4v4zM12 12V4h4V0h4v8h-4v4z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                        />
                    </pattern>
                    <rect width="240" height="12" fill="url(#key)" />
                </svg>
            </div>

            <div className="container footer__inner">
                <div className="footer__brand">
                    <span className="brand__name">Socrate Bank</span>
                    <p>Clear banking, plainly explained.</p>
                </div>

                <nav className="footer__links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Open an account</Link>
                </nav>

                <p className="footer__meta">© {new Date().getFullYear()} Socrate Bank. A demo bank for learning purposes only.</p>
            </div>
        </footer>
    )
}
