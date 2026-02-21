import React, { useState, useEffect } from 'react';
import { Plus, ToggleLeft, X, ToggleRight, Building2, Server, Save, Loader2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [strictValidation, setStrictValidation] = useState(false);

    // Problem Specifics (Contest Title/Desc match the Problem Title/Desc visually)
    const [timeLimit, setTimeLimit] = useState(0);
    const [difficulty, setDifficulty] = useState('Medium');
    const [category, setCategory] = useState('Arrays');
    const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '', isHidden: false }]);

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        if (!user || user.preference !== 'company') {
            navigate('/profile');
        }
    }, [user, navigate]);

    // Problem Handlers
    const addTestCase = () => {
        setTestCases([...testCases, { input: '', expectedOutput: '', isHidden: false }]);
    };

    const removeTestCase = (tcIndex) => {
        setTestCases(testCases.filter((_, i) => i !== tcIndex));
    };

    const updateTestCase = (tcIndex, field, value) => {
        const updated = [...testCases];
        updated[tcIndex][field] = value;
        setTestCases(updated);
    };

    const handleDeployContest = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: '' });

        if (!title || !description || !startTime || !endTime || testCases.length === 0) {
            return setMsg({ text: 'Please fill all contest fields and add at least 1 test case.', type: 'error' });
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title, description, startTime, endTime, strictValidation,
                    problems: [{
                        title: title,  // Direct mapping to save users from duplicate entry
                        description: description,
                        timeLimit,
                        difficulty,
                        category,
                        testCases
                    }]
                })
            });

            if (res.ok) {
                setMsg({ text: 'Contest & Custom Problems Deployed Successfully!', type: 'success' });
                setTimeout(() => navigate('/contests'), 1500);
            } else {
                const data = await res.json();
                setMsg({ text: data.message || 'Failed deployment', type: 'error' });
            }
        } catch (err) {
            setMsg({ text: 'Server error.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-8 custom-scrollbar text-sm bg-black min-h-screen">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Organization Dashboard</h1>
                        <p className="text-gray-400">Deploy Contests with Custom Tailored Problems</p>
                    </div>
                </div>

                {msg.text && (
                    <div className={`p-4 rounded-lg font-bold ${msg.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                        {msg.text}
                    </div>
                )}

                <form onSubmit={handleDeployContest} className="space-y-6">
                    <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-[#2d1e16] bg-[#120a06]">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Server size={18} className="text-[var(--color-primary)]" /> Deploy Contest Challenge</h2>
                            <p className="text-xs text-gray-500 mt-1">Configure your challenge. This serves as the contest and the single problem students must solve.</p>
                        </div>
                        <div className="p-6 md:p-8 space-y-6">

                            {/* Line 1: Title and Strict Mode */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Challenge Title</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none" placeholder="e.g. Weekly Hacker Cup: Linked Lists" />
                                </div>

                                <div className="bg-[#120a06] border border-[#2d1e16] rounded-lg p-4 flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-white flex items-center gap-2">Strict Face Validation <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">PRO</span></div>
                                        <div className="text-xs text-gray-500 mt-1">Require webcam cheating prevention.</div>
                                    </div>
                                    <button type="button" onClick={() => setStrictValidation(!strictValidation)} className="text-[var(--color-primary)] hover:scale-105 transition-transform">
                                        {strictValidation ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-gray-600" />}
                                    </button>
                                </div>
                            </div>

                            {/* Line 2: Start, End, and Local Limit */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Start Time</label>
                                    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">End Time</label>
                                    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Clock size={12} /> Time Limit (Mins)</label>
                                    <input type="number" min="0" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none" placeholder="0 = infinite" />
                                </div>
                            </div>

                            {/* Line 3: Difficulty and Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Difficulty</label>
                                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none">
                                        <option>Easy</option><option>Medium</option><option>Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none">
                                        <option>Arrays</option><option>Dynamic Programming</option><option>Graphs</option><option>Trees</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Problem Statement / Contest Rules (Markdown)</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none min-h-[150px]" placeholder="Given an array of integers... You must solve this within the time limit."></textarea>
                            </div>

                            {/* Test Cases */}
                            <div className="bg-[#120a06] border border-[#2d1e16] rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Test Cases Validation</label>
                                        <p className="text-[10px] text-gray-500 mt-1">Provide expected outputs. Private test cases will be evaluated server-side to prevent cheating.</p>
                                    </div>
                                    <button type="button" onClick={addTestCase} className="text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-3 py-1.5 rounded flex items-center gap-1 hover:bg-[var(--color-primary)] hover:text-white transition-colors"><Plus size={14} /> Add Case</button>
                                </div>

                                <div className="space-y-4">
                                    {testCases.map((tc, tcIndex) => (
                                        <div key={tcIndex} className="p-4 bg-black border border-[#2d1e16] rounded-lg relative">
                                            {testCases.length > 1 && (
                                                <button type="button" onClick={() => removeTestCase(tcIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1"><X size={14} /></button>
                                            )}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] text-gray-500 mb-1">Input Data</label>
                                                    <input type="text" value={tc.input} onChange={e => updateTestCase(tcIndex, 'input', e.target.value)} className="w-full bg-[#1a1310] border border-[#2d1e16] text-white text-xs rounded px-3 py-2 font-mono" placeholder="[1, 2, 3]" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] text-gray-500 mb-1">Expected Output</label>
                                                    <input type="text" value={tc.expectedOutput} onChange={e => updateTestCase(tcIndex, 'expectedOutput', e.target.value)} className="w-full bg-[#1a1310] border border-[#2d1e16] text-white text-xs rounded px-3 py-2 font-mono" placeholder="6" />
                                                </div>
                                            </div>
                                            <div className="mt-3 flex items-center gap-2">
                                                <button type="button" onClick={() => updateTestCase(tcIndex, 'isHidden', !tc.isHidden)} className="text-[var(--color-primary)]">
                                                    {tc.isHidden ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-600" />}
                                                </button>
                                                <span className="text-xs text-gray-500">Hide from students (Private validation case)</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(246,107,21,0.3)] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Deploy Challenge Live</>}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default CompanyDashboard;
