import { useAuth } from '../context/AuthContext.jsx'

const ACCOUNTS = [
    { id: 1, name: 'Everyday checking', number: '•••• 4821', balance: 12480.55 },
    { id: 2, name: 'Savings', number: '•••• 0093', balance: 6250.10 },
]

const TRANSACTIONS = [
    { id: 1, name: 'Payroll deposit', date: 'Jul 3', amount: 2100.0 },
    { id: 2, name: 'Coffee & Co.', date: 'Jul 3', amount: -4.5 },
    { id: 3, name: 'Transfer to Alex', date: 'Jul 2', amount: -150.0 },
    { id: 4, name: 'Grocery Market', date: 'Jul 1', amount: -76.32 },
    { id: 5, name: 'Electric Co. bill', date: 'Jun 29', amount: -58.9 },
]

function formatCurrency(amount) {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export default function Dashboard() {
    const { user } = useAuth()
    const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there'
    const totalBalance = ACCOUNTS.reduce((sum, a) => sum + a.balance, 0)

    return (
        <section className="section container dashboard">
            <div className="dashboard__header">
                <div>
                    <p className="eyebrow">Dashboard</p>
                    <h1>Welcome back, {name}</h1>
                </div>
                <p className="dashboard__demo-note">Showing sample data for this demo account.</p>
            </div>

            <div className="dashboard__grid">
                <div className="dashboard__col">
                    <div className="summary-card">
                        <span>Total balance</span>
                        <strong>{formatCurrency(totalBalance)}</strong>
                    </div>

                    <div className="account-list">
                        {ACCOUNTS.map((acc) => (
                            <article key={acc.id} className="account-card">
                                <div>
                                    <h3>{acc.name}</h3>
                                    <p className="account-card__number">{acc.number}</p>
                                </div>
                                <strong>{formatCurrency(acc.balance)}</strong>
                            </article>
                        ))}
                    </div>

                    <div className="quick-actions">
                        <button className="btn btn--primary" type="button">Send money</button>
                        <button className="btn btn--ghost" type="button">Pay a bill</button>
                        <button className="btn btn--ghost" type="button">Add funds</button>
                    </div>
                </div>

                <div className="dashboard__col">
                    <h2 className="dashboard__section-title">Recent activity</h2>
                    <ul className="transaction-list">
                        {TRANSACTIONS.map((t) => (
                            <li key={t.id} className="transaction-row">
                                <div>
                                    <p className="transaction-row__name">{t.name}</p>
                                    <p className="transaction-row__date">{t.date}</p>
                                </div>
                                <span className={t.amount >= 0 ? 'is-positive' : 'is-negative'}>
                                    {t.amount >= 0 ? '+' : ''}
                                    {formatCurrency(t.amount)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
