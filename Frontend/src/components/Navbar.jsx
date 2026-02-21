import React, { useState, useEffect } from 'react';
import { User, Swords } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Contests', path: '/contests' },
        { name: 'Problemset', path: '/problemset' },
        { name: 'Leaderboard', path: '/leaderboard' },
    ];

    return (

        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                    : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
                {/* Left Section - Logo */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Swords size={24} className="text-osu" />
                    <span className="font-bold text-lg text-white">CodeArena</span>
                </Link>

                {/* Center Section - Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-semibold transition-all duration-300 ${location.pathname === link.path
                                    ? 'text-osu'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {localStorage.getItem('token') ? (
                        <Link
                            to="/profile"
                            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center overflow-hidden border border-osu/30 hover:border-osu transition-colors shadow-[0_0_10px_rgba(220,68,5,0.2)]"
                        >
                            <User size={16} className="text-gray-300" />
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/auth"
                                className="text-sm text-gray-300 hover:text-white transition-colors hidden sm:block"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/auth"
                                className="bg-osu hover:bg-osu-light text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(220,68,5,0.3)]"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
