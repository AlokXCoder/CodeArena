import React from 'react';
import { Bell, User, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Contests', path: '/contests' },
        { name: 'Problemset', path: '/' },
        { name: 'Leaderboard', path: '/leaderboard' },
    ];

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-[var(--color-dark-bg)] border-b border-[var(--color-dark-border)] text-white select-none sticky top-0 z-50">
            <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <Link to="/">
                    <img src="/codearena-logo.png" alt="CodeArena Logo" className="w-[150px] h-auto object-contain" />
                </Link>
            </div>

            {/* Center Section - Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`text-sm font-semibold transition-colors ${location.pathname === link.path
                            ? 'text-white border-b-2 border-white pb-1'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 text-sm">

                {/* Profile / Login */}
                {localStorage.getItem('token') ? (
                    <Link to="/profile" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3a3a3a] to-[#5a5a5a] flex items-center justify-center overflow-hidden border border-[var(--color-dark-border)] hover:border-[var(--color-primary)] transition-colors shadow-[0_0_10px_rgba(246,107,21,0.2)]">
                        <User size={16} className="text-gray-300" />
                    </Link>
                ) : (
                    <Link to="/auth" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(246,107,21,0.2)] transition-all">
                        Log In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
