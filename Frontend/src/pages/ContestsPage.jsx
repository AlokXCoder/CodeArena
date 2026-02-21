import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Users, ArrowRight, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContestsPage = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/contests');
                if (res.ok) {
                    const data = await res.json();
                    setContests(data);
                }
            } catch (error) {
                console.error("Failed to fetch contests", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Function to calculate duration
    const getDuration = (start, end) => {
        const diffMs = new Date(end) - new Date(start);
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${diffHrs}h ${diffMins > 0 ? diffMins + 'm' : ''}`;
    };

    const handleRegister = async (contestId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/contests/${contestId}/register`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                // Update local state to reflect registration
                setContests(prevContests =>
                    prevContests.map(c => {
                        if (c._id === contestId) {
                            return { ...c, participants: [...(c.participants || []), user?._id] };
                        }
                        return c;
                    })
                );
                alert('Successfully registered!');
            } else {
                const data = await res.json();
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error("Failed to register", error);
            alert("Network error occurred.");
        }
    };

    return (
        <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-8 custom-scrollbar text-sm bg-transparent min-h-full">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-br from-[#1a1310] to-[#120a06] p-8 rounded-2xl border border-[var(--color-primary)]/20 shadow-[0_0_40px_rgba(246,107,21,0.05)]">
                    <div>
                        <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] w-fit px-3 py-1 rounded-full font-bold text-xs mb-4 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                            Live & Upcoming Arena
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                            Compete and Prove <br /><span className="text-[var(--color-primary)]">Your Skills.</span>
                        </h1>
                        <p className="text-gray-400 text-base max-w-xl line-clamp-2">CodeArena official and company-sponsored contests. Battle against the best to raise your global rank or get hired.</p>
                    </div>

                    {user?.preference === 'company' && (
                        <button
                            onClick={() => navigate('/company/dashboard')}
                            className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-bold text-sm shadow-xl transition-all flex items-center gap-2"
                        >
                            Deploy New Contest <ArrowRight size={16} />
                        </button>
                    )}
                </div>

                {/* Contests Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-[#2d1e16] pb-4">
                        All Contests {loading && <span className="text-sm font-normal text-gray-500 animate-pulse ml-2">(Loading...)</span>}
                    </h2>

                    {contests.length === 0 && !loading ? (
                        <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl p-10 text-center text-gray-500">
                            <Trophy size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No upcoming contests at the moment. Check back later!</p>
                            {user?.preference === 'company' && (
                                <p className="mt-2 text-[var(--color-primary)]">You can host the first one!</p>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {contests.map(contest => {
                                const now = new Date();
                                const start = new Date(contest.startTime);
                                const end = new Date(contest.endTime);

                                let status = 'Upcoming';
                                let statusColor = 'text-blue-500 block';
                                if (now > start && now < end) {
                                    status = 'Live Now';
                                    statusColor = 'text-green-500 animate-pulse';
                                } else if (now > end) {
                                    status = 'Ended';
                                    statusColor = 'text-gray-500';
                                }

                                return (
                                    <div key={contest._id} className="bg-[#1a1310] border border-[#2d1e16] hover:border-[var(--color-primary)]/50 rounded-xl p-6 transition-all group flex flex-col h-full relative overflow-hidden">

                                        {/* Strict Validation Banner */}
                                        {contest.strictValidation && (
                                            <div className="absolute top-0 right-0 bg-red-500/10 text-red-500 text-[10px] font-bold px-3 py-1 rounded-bl-lg border-b border-l border-red-500/30 flex items-center gap-1 uppercase tracking-wider">
                                                <ShieldAlert size={12} /> Strict Mode
                                            </div>
                                        )}

                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${statusColor}`}>• {status}</div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">{contest.title}</h3>
                                                <p className="text-xs text-gray-500 mt-1">By: {contest.companyId?.name || "CodeArena Admin"}</p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-2">
                                            {contest.description}
                                        </p>

                                        {contest.strictValidation && (
                                            <div className="text-xs text-red-500 font-bold bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-2 mb-6">
                                                <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                                                <p>Strict Face Validation is ACTIVE. Do not look away, tilt your head sideways, or attempt to cheat, otherwise your contest session will immediately terminate.</p>
                                            </div>
                                        )}

                                        <div className={`flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400 bg-[#120a06] p-3 rounded-lg border border-[#2d1e16] mb-6 ${contest.strictValidation ? 'mt-auto' : 'mb-6 mt-auto'}`}>
                                            <div className="flex items-center gap-1.5"><Clock size={14} className="text-gray-500" /> Duration: {getDuration(contest.startTime, contest.endTime)}</div>
                                            <div className="w-[1px] h-3 bg-gray-600"></div>
                                            <div className="flex items-center gap-1.5"><Users size={14} className="text-gray-500" /> Opens: {new Date(contest.startTime).toLocaleDateString()}</div>
                                        </div>

                                        {status === 'Live Now' || status === 'Ended' ? (
                                            <button
                                                onClick={() => navigate(`/workspace/contest/${contest._id}`)}
                                                className="w-full py-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-bold rounded-lg transition-all"
                                            >
                                                {status === 'Live Now' ? 'Enter Contest Arena' : 'View Leaderboard'}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => contest.participants?.includes(user?._id) ? null : handleRegister(contest._id)}
                                                disabled={contest.participants?.includes(user?._id)}
                                                className={`w-full py-3 font-bold rounded-lg transition-all ${contest.participants?.includes(user?._id)
                                                        ? 'bg-green-500/10 text-green-500 cursor-not-allowed border border-green-500/20'
                                                        : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
                                                    }`}
                                            >
                                                {contest.participants?.includes(user?._id) ? '✓ Registered' : 'Register Now'}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContestsPage;
