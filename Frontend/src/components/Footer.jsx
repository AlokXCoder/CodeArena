import React from 'react';
import { Github, Twitter, Linkedin, Heart, AlertCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t border-osu/20 bg-black/90 py-3 px-4 z-10 flex-shrink-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>&copy; {new Date().getFullYear()} CodeArena</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    Made with <Heart size={12} className="text-osu fill-osu" /> for the community
                </div>
            </div>
        </footer>
    );
};

export default Footer;
