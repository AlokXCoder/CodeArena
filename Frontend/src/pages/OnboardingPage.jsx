import React, { useState } from 'react';
import { User, Building, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
    const [name, setName] = useState('');
    const [preference, setPreference] = useState(''); // 'user' or 'company'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name) return setError('Please enter your name');
        if (!preference) return setError('Please select an account type');

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/complete-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, preference })
            });
            const data = await res.json();

            if (res.ok) {
                // Update local user data
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/profile');
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 bg-[#120a06] min-h-screen">
            <div className="w-full max-w-xl bg-[#1a1310] border border-[#2d1e16] rounded-2xl shadow-2xl overflow-hidden relative">

                {/* Decorative header */}
                <div className="h-2 w-full bg-gradient-to-r from-green-500 via-[var(--color-primary)] to-orange-500"></div>

                <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">Complete Your Profile</h2>
                        <p className="text-sm text-gray-400 mt-2">Just a few more details to set up your workspace.</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-3">What should we call you?</label>
                            <input
                                type="text"
                                className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3.5 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-lg"
                                placeholder="Your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Preference Cards */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-3">How will you use CodeArena?</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* User Option */}
                                <div
                                    onClick={() => setPreference('user')}
                                    className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center gap-3 transition-all ${preference === 'user'
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_15px_rgba(246,107,21,0.2)]'
                                            : 'border-[#2d1e16] bg-[#120a06] hover:border-gray-600'
                                        }`}
                                >
                                    <div className={`p-3 rounded-full ${preference === 'user' ? 'bg-[var(--color-primary)] text-white' : 'bg-[#1a1310] text-gray-400'}`}>
                                        <User size={24} />
                                    </div>
                                    <div className="text-center">
                                        <div className={`font-bold ${preference === 'user' ? 'text-white' : 'text-gray-300'}`}>Student / Developer</div>
                                        <div className="text-xs text-gray-500 mt-1">I want to practice coding and join contests.</div>
                                    </div>
                                </div>

                                {/* Company Option */}
                                <div
                                    onClick={() => setPreference('company')}
                                    className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center gap-3 transition-all ${preference === 'company'
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_15px_rgba(246,107,21,0.2)]'
                                            : 'border-[#2d1e16] bg-[#120a06] hover:border-gray-600'
                                        }`}
                                >
                                    <div className={`p-3 rounded-full ${preference === 'company' ? 'bg-[var(--color-primary)] text-white' : 'bg-[#1a1310] text-gray-400'}`}>
                                        <Building size={24} />
                                    </div>
                                    <div className="text-center">
                                        <div className={`font-bold ${preference === 'company' ? 'text-white' : 'text-gray-300'}`}>Organization</div>
                                        <div className="text-xs text-gray-500 mt-1">I want to host contests and recruit talent.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !name || !preference}
                            className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(246,107,21,0.3)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : (
                                <>Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
