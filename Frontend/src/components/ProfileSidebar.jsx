import React, { useState } from 'react';
import { MapPin, Building, Link as LinkIcon, Edit3, X, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ user, onProfileUpdate }) => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        location: user?.location || '',
        github: user?.github || ''
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    const handleEdit = () => {
        setForm({
            name: user?.name || '',
            bio: user?.bio || '',
            location: user?.location || '',
            github: user?.github || ''
        });
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                const updated = await res.json();
                // Update localStorage
                localStorage.setItem('user', JSON.stringify(updated));
                // Notify parent to refresh
                if (onProfileUpdate) onProfileUpdate(updated);
                setEditing(false);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full bg-[#120a06] border border-[#2d1e16] focus:border-[var(--color-primary)] text-white text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors";

    return (
        <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl overflow-hidden shadow-lg p-6">
                <div className="flex flex-col items-center">
                    {/* Avatar with Status Indicator */}
                    <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-full border-4 border-[#333] shadow-inner overflow-hidden bg-gradient-to-b from-[#553621] to-[#25150a] flex items-center justify-center text-3xl font-bold text-[var(--color-primary)] uppercase">
                            {(editing ? form.name : user?.name) ? (editing ? form.name : user?.name).charAt(0) : user?.email?.charAt(0)}
                        </div>
                        <div className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-[var(--color-dark-surface)]"></div>
                    </div>

                    {editing ? (
                        /* ══════ EDIT MODE ══════ */
                        <div className="w-full flex flex-col gap-4">
                            {/* Name */}
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 block">Display Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="Your name"
                                    className={inputClass}
                                    maxLength={50}
                                />
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 block">Bio</label>
                                <textarea
                                    value={form.bio}
                                    onChange={e => setForm({ ...form, bio: e.target.value })}
                                    placeholder="Tell us about yourself..."
                                    className={`${inputClass} resize-none h-20`}
                                    maxLength={200}
                                />
                                <div className="text-right text-[10px] text-gray-600 mt-0.5">{form.bio.length}/200</div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 block">Location</label>
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={e => setForm({ ...form, location: e.target.value })}
                                    placeholder="City, Country"
                                    className={inputClass}
                                    maxLength={100}
                                />
                            </div>

                            {/* GitHub */}
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 block">GitHub / Portfolio URL</label>
                                <input
                                    type="url"
                                    value={form.github}
                                    onChange={e => setForm({ ...form, github: e.target.value })}
                                    placeholder="https://github.com/username"
                                    className={inputClass}
                                />
                            </div>

                            {/* Email (non-editable) */}
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 block">Email (cannot be changed)</label>
                                <div className="w-full bg-[#120a06]/50 border border-[#2d1e16] text-gray-500 text-sm rounded-lg px-3 py-2 cursor-not-allowed select-none">
                                    {user?.email}
                                </div>
                            </div>

                            {/* Save / Cancel */}
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="px-4 py-2.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-gray-300 font-semibold border border-[var(--color-dark-border)] transition-colors flex items-center gap-2"
                                >
                                    <X size={16} /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* ══════ VIEW MODE ══════ */
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight text-center">
                                {user?.name || user?.email.split('@')[0]}
                            </h2>

                            {/* Badge */}
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

                            {/* Edit Button */}
                            <button
                                onClick={handleEdit}
                                className="w-full py-2.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-gray-200 font-semibold border border-[var(--color-dark-border)] transition-colors flex items-center justify-center gap-2 mb-3"
                            >
                                <Edit3 size={16} /> Edit Profile
                            </button>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full py-2 rounded-lg text-red-500/80 hover:text-red-500 hover:bg-red-500/10 text-sm transition-colors text-center"
                            >
                                Sign Out
                            </button>
                        </>
                    )}
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
