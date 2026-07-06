import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'

export default function Dashboard() {
    const { user, profile, logout } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')

    const [accounts, setAccounts] = useState([])
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) fetchBankData()
    }, [user])

    async function fetchBankData() {
        setLoading(true)

        // Fetch accounts
        const { data: accData, error: accError } = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        // Fetch transactions
        const { data: txData, error: txError } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .limit(10)

        if (!accError) setAccounts(accData || [])
        if (!txError) setTransactions(txData || [])

        setLoading(false)
    }

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    const totalBalance = accounts.reduce((sum, a) => sum + (a.balance || 0), 0)

    const name = profile?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Member'
    const email = profile?.email || user?.email || ''
    const joinedAt = profile?.joined_at || user?.created_at

    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <section className="section container dashboard">

            {/* Sidebar - Identical structure */}
            <aside className="dash-sidebar">
                <div className="dash-avatar">{initials}</div>
                <h2 className="dash-name">{name}</h2>
                <p className="dash-email">{email}</p>
                <p className="dash-joined">
                    Member since{' '}
                    {new Date(joinedAt).toLocaleDateString('en-GB', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>

                <nav className="dash-nav">
                    {['overview', 'accounts', 'activity', 'profile'].map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`dash-nav__link ${activeTab === tab ? 'dash-nav__link--active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'overview' ? 'Overview' :
                                tab === 'activity' ? 'Activity' :
                                    tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>

                <button type="button" className="btn btn--ghost dash-logout" onClick={handleLogout}>
                    Log out
                </button>
            </aside>

            {/* Main Content */}
            <div className="dash-main">

                {/* OVERVIEW */}
                {activeTab === 'overview' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h1>Welcome back, {name}</h1>
                            </div>
                            <p className="dashboard__demo-note">Live data from your accounts</p>
                        </div>

                        {loading ? (
                            <div className="dash-empty"><p>Loading your accounts...</p></div>
                        ) : (
                            <div className="dashboard__grid">
                                <div className="dashboard__col">
                                    <div className="summary-card">
                                        <span>Total balance</span>
                                        <strong>
                                            {totalBalance.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            })}
                                        </strong>
                                    </div>

                                    <div className="account-list">
                                        {accounts.map((acc) => (
                                            <article key={acc.id} className="account-card">
                                                <div>
                                                    <h3>{acc.name}</h3>
                                                    <p className="account-card__number">{acc.number}</p>
                                                </div>
                                                <strong>
                                                    {(acc.balance || 0).toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    })}
                                                </strong>
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
                                        {transactions.slice(0, 5).map((t) => (
                                            <li key={t.id} className="transaction-row">
                                                <div>
                                                    <p className="transaction-row__name">{t.name}</p>
                                                    <p className="transaction-row__date">{t.date}</p>
                                                </div>
                                                <span className={t.amount >= 0 ? 'is-positive' : 'is-negative'}>
                                                    {t.amount >= 0 ? '+' : ''}
                                                    {t.amount.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    })}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ACCOUNTS TAB */}
                {activeTab === 'accounts' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Your accounts</h2>
                            </div>
                        </div>

                        {loading ? (
                            <div className="dash-empty"><p>Loading accounts...</p></div>
                        ) : accounts.length === 0 ? (
                            <div className="dash-empty"><p>No accounts found.</p></div>
                        ) : (
                            <div className="account-list full-width">
                                {accounts.map((acc) => (
                                    <article key={acc.id} className="account-card account-card--large">
                                        <div>
                                            <h3>{acc.name}</h3>
                                            <p className="account-card__number">{acc.number}</p>
                                        </div>
                                        <div className="account-card__balance">
                                            <strong>
                                                {(acc.balance || 0).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                })}
                                            </strong>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ACTIVITY TAB */}
                {activeTab === 'activity' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Recent activity</h2>
                            </div>
                        </div>

                        {loading ? (
                            <div className="dash-empty"><p>Loading transactions...</p></div>
                        ) : transactions.length === 0 ? (
                            <div className="dash-empty"><p>No transactions yet.</p></div>
                        ) : (
                            <ul className="transaction-list transaction-list--full">
                                {transactions.map((t) => (
                                    <li key={t.id} className="transaction-row">
                                        <div>
                                            <p className="transaction-row__name">{t.name}</p>
                                            <p className="transaction-row__date">{t.date} • {t.category || ''}</p>
                                        </div>
                                        <span className={t.amount >= 0 ? 'is-positive' : 'is-negative'}>
                                            {t.amount >= 0 ? '+' : ''}
                                            {t.amount.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            })}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <>
                        <div className="dash-main__header">
                            <div>
                                <p className="eyebrow">Dashboard</p>
                                <h2>Your profile</h2>
                            </div>
                        </div>

                        <div className="profile-grid">
                            <div className="profile-field">
                                <span className="profile-field__label">Full name</span>
                                <span className="profile-field__value">{name}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Email</span>
                                <span className="profile-field__value">{email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Member since</span>
                                <span className="profile-field__value">
                                    {new Date(joinedAt).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-field__label">Total accounts</span>
                                <span className="profile-field__value">{accounts.length}</span>
                            </div>
                        </div>

                        <div className="profile-note">
                            <p>Need to update your details or have a banking question?</p>
                            <Link to="/contact" className="btn btn--ghost" style={{ marginTop: '0.8rem' }}>
                                Contact support
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}