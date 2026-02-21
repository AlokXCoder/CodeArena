import React, { useState } from 'react';
import { Mail, KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [step, setStep] = useState('EMAIL'); // 'EMAIL' or 'OTP'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) return setError('Email is required');

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok) {
                setStep('OTP');
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Server error. Backend might be down.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (!otp) return setError('OTP is required');

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();

            if (res.ok) {
                // Save token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.isNewUser) {
                    navigate('/onboarding');
                } else {
                    navigate('/profile');
                }
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 bg-[#120a06] min-h-screen">
            <div className="w-full max-w-md bg-[#1a1310] border border-[#2d1e16] rounded-2xl shadow-2xl overflow-hidden relative">

                {/* Decorative header */}
                <div className="h-2 w-full bg-gradient-to-r from-orange-600 via-[var(--color-primary)] to-yellow-500"></div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="bg-[var(--color-primary)] text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(246,107,21,0.4)]">
                            <span className="font-black text-xl tracking-tighter">&lt;&gt;</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to CodeArena</h2>
                        <p className="text-sm text-gray-400 mt-2">
                            {step === 'EMAIL' ? 'Sign in or create an account via Email OTP' : `We sent a code to ${email}`}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
                            {error}
                        </div>
                    )}

                    {step === 'EMAIL' ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(246,107,21,0.2)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : (
                                    <>Send Secure OTP <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">One-Time Password</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors font-mono tracking-widest text-center text-xl"
                                        placeholder="------"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(246,107,21,0.2)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Login'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep('EMAIL')}
                                className="w-full text-center text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                Change Email Address
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
