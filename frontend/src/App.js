import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import './App.css'; 


function App() {
    return (
        <Router>
            <div className="app-container">
            
                <header className="app-header">
                    <div className="logo">
                        <h1>WeatherPro</h1>
                    </div>
                    <nav>
                        <ul className="nav-list">
                            <li>
                                <NavLink exact to="/" activeClassName="active" className="nav-link">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/alerts" activeClassName="active" className="nav-link">
                                    Alerts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/settings" activeClassName="active" className="nav-link">
                                    Settings
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>

                {/* Main content */}
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/alerts" element={<Alerts />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>

                {/* Interactive Footer */}
                <footer className="app-footer">
                    <div className="footer-content">
                        <p>&copy; 2024 WeatherPro. All rights reserved.</p>
                        <div className="social-icons">
                            <a href="https://www.linkedin.com/in/mayankpall/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/mayankpall" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://portfolio.mayankpal.co.in/" target="_blank" rel="noopener noreferrer">
    <i className="fas fa-globe"></i>
</a>

                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
