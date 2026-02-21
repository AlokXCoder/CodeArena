import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ShieldAlert, CheckCircle, Circle, Play } from 'lucide-react';

const ContestArena = () => {
    const { contestId } = useParams();
    const navigate = useNavigate();
    const [contest, setContest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState('');
    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/contests/${contestId}`);
                if (res.ok) {
                    const data = await res.json();
                    setContest(data);
                } else {
                    navigate('/contests');
                }
            } catch (err) {
                console.error(err);
                navigate('/contests');
            } finally {
                setLoading(false);
            }
        };
        fetchContest();
    }, [contestId, navigate]);

    useEffect(() => {
        if (!contest) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(contest.endTime).getTime();
            const distance = end - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft('00:00:00');
                setIsEnded(true);
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [contest]);

    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-8 custom-scrollbar text-sm bg-black min-h-screen">
                <div className="max-w-5xl mx-auto flex flex-col gap-6">
                    {/* Skeleton Banner */}
                    <div className="bg-[#1a1310] border border-[#2d1e16] rounded-2xl p-8 animate-pulse">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex-1">
                                <div className="h-8 w-64 bg-[#2d1e16] rounded mb-3" />
                                <div className="h-4 w-96 bg-[#2d1e16] rounded mb-2" />
                                <div className="h-4 w-48 bg-[#2d1e16] rounded" />
                            </div>
                            <div className="bg-[#120a06] border border-[#2d1e16] p-6 rounded-xl min-w-[200px]">
                                <div className="h-3 w-24 bg-[#2d1e16] rounded mx-auto mb-3" />
                                <div className="h-10 w-36 bg-[#2d1e16] rounded mx-auto" />
                            </div>
                        </div>
                    </div>
                    {/* Skeleton Problems */}
                    <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-[#2d1e16] bg-[#120a06]">
                            <div className="h-6 w-40 bg-[#2d1e16] rounded animate-pulse" />
                        </div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-6 border-b border-[#2d1e16] flex items-center justify-between animate-pulse">
                                <div className="flex items-center gap-4">
                                    <div className="h-6 w-6 bg-[#2d1e16] rounded" />
                                    <div>
                                        <div className="h-5 w-44 bg-[#2d1e16] rounded mb-2" />
                                        <div className="h-3 w-32 bg-[#2d1e16] rounded" />
                                    </div>
                                </div>
                                <div className="h-10 w-32 bg-[#2d1e16] rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!contest) return null;

    return (
        <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-8 custom-scrollbar text-sm bg-black min-h-screen">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">

                {/* Banner & Timer */}
                <div className="bg-[#1a1310] border border-[var(--color-primary)]/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(246,107,21,0.1)] relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white mb-2">{contest.title}</h1>
                            <p className="text-gray-400 max-w-2xl">{contest.description}</p>
                            {contest.strictValidation && (
                                <div className="mt-4 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                                    <ShieldAlert size={14} /> Strict Face Validation Active
                                </div>
                            )}
                        </div>

                        <div className="shrink-0 text-center bg-[#120a06] border border-[#2d1e16] p-6 rounded-xl min-w-[200px]">
                            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                                <Clock size={14} className={isEnded ? 'text-gray-500' : 'text-[var(--color-primary)] animate-pulse'} />
                                {isEnded ? 'Contest Ended' : 'Time Remaining'}
                            </div>
                            <div className={`text-4xl font-mono font-bold tracking-tight ${isEnded ? 'text-gray-600' : 'text-white'}`}>
                                {timeLeft || '00:00:00'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Problems List */}
                <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl overflow-hidden shadow-xl mt-4">
                    <div className="p-6 border-b border-[#2d1e16] bg-[#120a06]">
                        <h2 className="text-xl font-bold text-white">Contest Problems</h2>
                        <p className="text-xs text-gray-500 mt-1">Solve as many as you can before the timer runs out!</p>
                    </div>

                    <div className="divide-y divide-[#2d1e16]">
                        {contest.problems && contest.problems.length > 0 ? (
                            contest.problems.map((problem, index) => (
                                <div key={problem._id} className="p-6 hover:bg-[#120a06] transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-gray-600 font-mono font-bold text-lg w-8">{index + 1}.</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--color-primary)] transition-colors">{problem.title}</h3>
                                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                                                <span className={
                                                    problem.difficulty === 'Easy' ? 'text-green-500' :
                                                        problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                                                }>{problem.difficulty}</span>
                                                <span className="text-gray-600">•</span>
                                                <span className="text-gray-500">{problem.category}</span>
                                                {problem.timeLimit && problem.timeLimit > 0 && (
                                                    <>
                                                        <span className="text-gray-600">•</span>
                                                        <span className="text-yellow-500/90 flex items-center gap-1">
                                                            <Clock size={12} /> {problem.timeLimit} Min TL
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => navigate(`/workspace/contest/${contest._id}/${problem._id}`)}
                                        disabled={isEnded}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all ${isEnded
                                            ? 'bg-[#120a06] text-gray-600 border border-[#2d1e16] cursor-not-allowed'
                                            : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white border border-[var(--color-primary)]/20'
                                            }`}
                                    >
                                        <Play size={16} /> {isEnded ? 'Ended' : 'Solve Challenge'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-500 italic">No problems have been added to this contest yet.</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContestArena;
