import React from 'react';
import { MapPin, Building, Link as LinkIcon, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        // Force refresh to clear navbar state
        window.location.reload();
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl overflow-hidden shadow-lg p-6">
                <div className="flex flex-col items-center">
                    {/* Avatar with Status Indicator */}
                    <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-full border-4 border-[#333] shadow-inner overflow-hidden bg-gradient-to-b from-[#553621] to-[#25150a] flex items-center justify-center text-3xl font-bold text-[var(--color-primary)] uppercase">
                            {user?.name ? user.name.charAt(0) : user?.email?.charAt(0)}
                        </div>
                        <div className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-[var(--color-dark-surface)]"></div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight text-center">
                        {user?.name || user?.email.split('@')[0]}
                    </h2>

                    {/* Badge / Preference Type */}
                    <div className="px-3 py-1 bg-[#2a1a10] border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full text-[10px] font-bold tracking-wider mb-6 uppercase">
                        {user?.preference === 'company' ? 'ORGANIZATION' : 'NEWBIE'}
                    </div>

                    {/* Bio */}
                    {user?.bio && (
                        <p className="text-center text-gray-400 text-sm leading-relaxed mb-8 px-2">
                            {user.bio}
                        </p>
                    )}

                    {/* Details */}
                    <div className="w-full space-y-3 mb-8">
                        {user?.location && (
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <MapPin size={16} />
                                <span>{user.location}</span>
                            </div>
                        )}
                        {/* If preference is company, we can display it here, or if they have a company field in the future */}
                        {user?.preference === 'company' && !user?.location && !user?.github && (
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <Building size={16} />
                                <span>Corporate Account</span>
                            </div>
                        )}

                        {user?.github && (
                            <div className="flex items-center gap-3 text-sm">
                                <LinkIcon size={16} className="text-gray-400" />
                                <a href={user.github} target="_blank" rel="noreferrer" className="text-[var(--color-primary)] hover:underline decoration-[var(--color-primary)]/50 transition-all">
                                    {user.github.replace(/^https?:\/\//, '')}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <button className="w-full py-2.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-gray-200 font-semibold border border-[var(--color-dark-border)] transition-colors flex items-center justify-center gap-2 mb-3">
                        <Edit3 size={16} /> Edit Profile
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 rounded-lg text-red-500/80 hover:text-red-500 hover:bg-red-500/10 text-sm transition-colors text-center"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Teams Card */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-6">
                <h3 className="flex items-center gap-2 text-white font-bold mb-4">
                    <span className="text-[var(--color-primary)]">👥</span> Teams
                </h3>

                <div className="space-y-4">
                    <div className="text-gray-500 text-xs italic text-center py-2">
                        Not a member of any teams yet.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
