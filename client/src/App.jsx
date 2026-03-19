import { useState, useEffect } from 'react'

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/health`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error('Error fetching health check:', err));
    }, []);

    return (
        <div className="container">
            <h1 className="title">ShopSmart</h1>
            <p className="subtitle">Modern Application Architecture</p>

            <div className="glass-card">
                <h2 className="status-header">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    System Connectivity
                </h2>
                
                {data ? (
                    <div className="status-container">
                        <div className="status-row">
                            <span className="status-label">API Status</span>
                            <span className="status-value status-ok">{data.status.toUpperCase()}</span>
                        </div>
                        <div className="status-row">
                            <span className="status-label">Message</span>
                            <span className="status-value">{data.message}</span>
                        </div>
                        <div className="status-row">
                            <span className="status-label">Last Ping</span>
                            <span className="status-value">
                                {new Date(data.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="loading-container">
                        <span className="loader"></span>
                        <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
                            Awaiting Backend Integration...
                        </p>
                    </div>
                )}
            </div>
            
            <p className="hint">
                React Frontend deployed securely. Awaiting upstream backend link.
            </p>
        </div>
    )
}

export default App
