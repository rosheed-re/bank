const VALUES = [
    {
        title: 'Question the fine print',
        body: 'If a term needs a lawyer to explain it, we rewrite it until it doesn\'t.',
    },
    {
        title: 'Know thyself, know thy balance',
        body: 'You should never have to guess what happened to your money. We show our work.',
    },
    {
        title: 'Small enough to answer',
        body: 'Real people read support messages here — no maze of automated menus.',
    },
]

const TIMELINE = [
    { year: '2019', text: 'Socrate Bank starts as a two-person project asking why banking apps were so confusing.' },
    { year: '2021', text: 'We pass 50,000 customers and open our first physical help desk.' },
    { year: '2024', text: 'Same-day transfers and plain-language statements roll out to every account.' },
]

export default function About() {
    return (
        <>
            <section className="section about-hero">
                <div className="container">
                    <p className="eyebrow">About us</p>
                    <h1>Banking that can explain itself.</h1>
                    <p className="about-hero__sub">
                        We named ourselves after a man who thought the most useful thing you could do
                        was ask good questions. So we built a bank that answers them — about your money,
                        your fees, and where every dollar goes.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <p className="eyebrow">What we hold to</p>
                    <div className="feature-grid">
                        {VALUES.map((v) => (
                            <article key={v.title} className="feature-card">
                                <h3>{v.title}</h3>
                                <p>{v.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <p className="eyebrow">How we got here</p>
                    <ol className="timeline">
                        {TIMELINE.map((t) => (
                            <li key={t.year} className="timeline__item">
                                <span className="timeline__year">{t.year}</span>
                                <span className="timeline__text">{t.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </>
    )
}
