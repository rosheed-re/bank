import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    async function handleLogout() {
        setOpen(false)
        await logout()
        navigate('/')
    }

    return (
        <header className="navbar">
            <div className="navbar__inner container">
                <Link to="/" className="brand" onClick={() => setOpen(false)}>
                    <span className="brand__mark" aria-hidden="true">
                        <svg viewBox="0 0 32 32" width="26" height="26">
                            <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--navy)" />
                            <path
                                d="M8 22V13l8-5 8 5v9"
                                fill="none"
                                stroke="var(--gold)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <line x1="8" y1="22" x2="24" y2="22" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="brand__name">Socrate Bank</span>
                </Link>

                <button
                    className="navbar__toggle"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
                    <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
                            <button className="btn btn--ghost navbar__cta" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" onClick={() => setOpen(false)}>Log in</NavLink>
                            <Link to="/register" className="btn btn--primary navbar__cta" onClick={() => setOpen(false)}>
                                Open an account
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
