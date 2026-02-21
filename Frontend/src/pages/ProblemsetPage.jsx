import React, { useState, useEffect } from 'react';
import { Search, Filter, Play, CheckCircle2, ChevronRight, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProblemsetPage = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                // Fetch mock categorized problems for practice
                const res = await fetch('http://localhost:5000/api/problems?isMock=true');
                if (res.ok) {
                    const data = await res.json();
                    setProblems(data);
                }
            } catch (error) {
                console.error('Failed to fetch problems', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    const categories = ['All', 'Arrays', 'Dynamic Programming', 'Stacks', 'Graphs', 'Trees'];

    const filteredProblems = categoryFilter === 'All'
        ? problems
        : problems.filter(p => p.category === categoryFilter);

    // Initial dev-seeder
    const handleSeedData = async () => {
        setLoading(true);
        try {
            await fetch('http://localhost:5000/api/problems/seed', { method: 'POST' });
            window.location.reload();
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-8 custom-scrollbar text-sm bg-black min-h-screen">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Practice Arena</h1>
                        <p className="text-gray-400 text-base">Master algorithms and data structures with our curated problemset.</p>
                    </div>
                    {problems.length === 0 && !loading && (
                        <button onClick={handleSeedData} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded font-bold text-xs shadow-[0_0_15px_rgba(246,107,21,0.3)]">
                            Auto-Seed DB
                        </button>
                    )}
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#1a1310] p-4 rounded-xl border border-[#2d1e16]">
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all ${categoryFilter === cat
                                    ? 'bg-[var(--color-primary)]/20 border border-[var(--color-primary)] text-[var(--color-primary)]'
                                    : 'bg-[#120a06] border border-[#2d1e16] text-gray-400 hover:text-white hover:border-gray-500'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            className="w-full bg-[#120a06] border border-[#2d1e16] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                    </div>
                </div>

                {/* Problem List */}
                <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl overflow-x-auto shadow-xl">
                    {loading ? (
                        <div className="animate-pulse">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="text-xs text-gray-500 uppercase tracking-widest border-b border-[#2d1e16] bg-[#120a06]">
                                    <tr>
                                        <th className="px-6 py-4 font-bold w-12 text-center">Status</th>
                                        <th className="px-6 py-4 font-bold">Title</th>
                                        <th className="px-6 py-4 font-bold">Category</th>
                                        <th className="px-6 py-4 font-bold">Difficulty</th>
                                        <th className="px-6 py-4 font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2d1e16] text-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <tr key={i} className="hover:bg-[#1f1510] transition-colors">
                                            <td className="px-6 py-4 text-center">
                                                <div className="w-6 h-6 rounded border border-[#2d1e16] mx-auto bg-[#2d1e16]"></div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-48 h-5 bg-[#2d1e16] rounded"></div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-24 h-5 bg-[#2d1e16] rounded-full"></div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-5 bg-[#2d1e16] rounded"></div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="w-20 h-8 bg-[#2d1e16] rounded-lg ml-auto"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : filteredProblems.length > 0 ? (
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="text-xs text-gray-500 uppercase tracking-widest border-b border-[#2d1e16] bg-[#120a06]">
                                <tr>
                                    <th className="px-6 py-4 font-bold w-12 text-center">Status</th>
                                    <th className="px-6 py-4 font-bold">Title</th>
                                    <th className="px-6 py-4 font-bold">Category</th>
                                    <th className="px-6 py-4 font-bold">Difficulty</th>
                                    <th className="px-6 py-4 font-bold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2d1e16] text-sm">
                                {filteredProblems.map((problem) => (
                                    <tr key={problem._id} className="hover:bg-[#1f1510] transition-colors group cursor-pointer" onClick={() => navigate(`/workspace/practice/${problem._id}`)}>
                                        <td className="px-6 py-4 text-center">
                                            {/* Static styling for demo. In real app, calculate if user solved it */}
                                            <div className="w-6 h-6 rounded border border-[#2d1e16] mx-auto group-hover:border-[var(--color-primary)]/50 transition-colors flex items-center justify-center">
                                                {/* <CheckCircle2 size={14} className="text-green-500" /> */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                                            {problem.title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-[#2d1e16] text-gray-300 text-[10px] px-2 py-1 rounded-full">{problem.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${problem.difficulty === 'Easy' ? 'text-green-500' :
                                                problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                                                }`}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[var(--color-primary)] hover:text-white font-bold p-2 hover:bg-[var(--color-primary)] rounded-lg transition-all flex items-center gap-1 ml-auto">
                                                Solve <ChevronRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-10 text-center text-gray-500 italic">No problems found in this category.</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProblemsetPage;
