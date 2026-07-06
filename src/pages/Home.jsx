import { Link } from 'react-router-dom'

const FEATURES = [
    {
        title: 'See everything at a glance',
        body: 'One dashboard for your balance, recent activity, and transfers — no digging through menus.',
    },
    {
        title: 'Move money in seconds',
        body: 'Send to friends or pay a bill without leaving the page you\'re on.',
    },
    {
        title: 'Built on honest foundations',
        body: 'No hidden fees, no confusing fine print. Just banking that says what it means.',
    },
]

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container hero__grid">
                    <div className="hero__copy">
                        <p className="eyebrow">Socrate Bank</p>
                        <h1>Know your money. Question everything else.</h1>
                        <p className="hero__sub">
                            Socrate Bank gives you a clear, honest view of your finances — plain statements,
                            fair terms, and a dashboard built to answer your questions before you ask them.
                        </p>
                        <div className="hero__actions">
                            <Link to="/register" className="btn btn--primary">Open an account</Link>
                            <Link to="/login" className="btn btn--ghost">Log in</Link>
                        </div>
                        <p className="hero__note">No paperwork. No branch visit. Ready in under five minutes.</p>
                    </div>

                    <div className="hero__panel" aria-hidden="true">
                        <div className="mock-card">
                            <div className="mock-card__row">
                                <span>Available balance</span>
                                <span className="mock-card__amount">$12,480.55</span>
                            </div>
                            <div className="mock-card__divider" />
                            <ul className="mock-card__list">
                                <li><span>Coffee &amp; Co.</span><span>-$4.50</span></li>
                                <li><span>Payroll deposit</span><span className="is-positive">+$2,100.00</span></li>
                                <li><span>Transfer to Alex</span><span>-$150.00</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <p className="eyebrow">Why people choose us</p>
                    <div className="feature-grid">
                        {FEATURES.map((f) => (
                            <article key={f.title} className="feature-card">
                                <h3>{f.title}</h3>
                                <p>{f.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section cta-band">
                <div className="container cta-band__inner">
                    <div>
                        <h2>Ready to bank somewhere honest?</h2>
                        <p>Open your Socrate Bank account today — it takes less time than your coffee order.</p>
                    </div>
                    <Link to="/register" className="btn btn--primary btn--lg">Get started</Link>
                </div>
            </section>
        </>
    )
}
