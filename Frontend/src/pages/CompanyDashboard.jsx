import React, { useState, useEffect } from 'react';
import { Plus, ToggleLeft, ToggleRight, Building2, Server, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [strictValidation, setStrictValidation] = useState(false);

    const [availableProblems, setAvailableProblems] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState([]);

    // New Problem State
    const [probTitle, setProbTitle] = useState('');
    const [probDesc, setProbDesc] = useState('');
    const [probDiff, setProbDiff] = useState('Medium');
    const [probCat, setProbCat] = useState('Arrays');
    const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '', isHidden: false }]);
    const [isCreatingProb, setIsCreatingProb] = useState(false);

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        if (!user || user.preference !== 'company') {
            navigate('/profile');
            return;
        }

        const fetchProbs = async () => {
            try {
                // Fetch Global Mock Problems
                const resGlobal = await fetch('http://localhost:5000/api/problems?isMock=true');
                const globalData = resGlobal.ok ? await resGlobal.json() : [];

                // Fetch Company Custom Problems
                const resCompany = await fetch('http://localhost:5000/api/problems/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const companyData = resCompany.ok ? await resCompany.json() : [];

                setAvailableProblems([...globalData, ...companyData]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProbs();
    }, [user, navigate, token]);

    const handleAddTestCase = () => setTestCases([...testCases, { input: '', expectedOutput: '', isHidden: false }]);
    const handleRemoveTestCase = (index) => setTestCases(testCases.filter((_, i) => i !== index));
    const handleTestCaseChange = (index, field, val) => {
        const newTC = [...testCases];
        newTC[index][field] = val;
        setTestCases(newTC);
    };

    const handleCreateProblem = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: '' });

        if (!probTitle || !probDesc || testCases.length === 0) {
            return setMsg({ text: 'Fill all problem fields and add at least 1 test case.', type: 'error' });
        }

        setIsCreatingProb(true);
        try {
            const res = await fetch('http://localhost:5000/api/problems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    title: probTitle,
                    description: probDesc,
                    difficulty: probDiff,
                    category: probCat,
                    testCases: testCases,
                    isMock: false
                })
            });

            if (res.ok) {
                const newProb = await res.json();
                setAvailableProblems(prev => [...prev, newProb]);
                setMsg({ text: 'Problem created & added to your repository!', type: 'success' });
                // Reset form
                setProbTitle(''); setProbDesc(''); setTestCases([{ input: '', expectedOutput: '', isHidden: false }]);
            } else {
                setMsg({ text: 'Failed to create problem', type: 'error' });
            }
        } catch (err) {
            setMsg({ text: 'Server error', type: 'error' });
        } finally {
            setIsCreatingProb(false);
        }
    };

    const toggleProblem = (id) => {
        if (selectedProblems.includes(id)) {
            setSelectedProblems(selectedProblems.filter(p => p !== id));
        } else {
            setSelectedProblems([...selectedProblems, id]);
        }
    };

    const handleDeployContest = async (e) => {
        e.preventDefault();
        setMsg({ text: '', type: '' });

        if (!title || !description || !startTime || !endTime || selectedProblems.length === 0) {
            return setMsg({ text: 'Please fill all fields and select at least 1 problem.', type: 'error' });
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/contests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title, description, startTime, endTime, strictValidation, problems: selectedProblems
                })
            });

            if (res.ok) {
                setMsg({ text: 'Contest Deployed Successfully!', type: 'success' });
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
        <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-8 custom-scrollbar text-sm bg-transparent min-h-full">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Organization Dashboard</h1>
                        <p className="text-gray-400">Deploy Contests & Problems</p>
                    </div>
                </div>

                {msg.text && (
                    <div className={`p-4 rounded-lg font-bold ${msg.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                        {msg.text}
                    </div>
                )}

                <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl shadow-xl overflow-hidden mb-8">
                    <div className="p-6 border-b border-[#2d1e16] bg-[#120a06]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Plus size={18} className="text-green-500" /> Organization Problem Studio</h2>
                        <p className="text-xs text-gray-500 mt-1">Author proprietary questions with hidden validation test cases.</p>
                    </div>

                    <form onSubmit={handleCreateProblem} className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Problem Title</label>
                                <input type="text" value={probTitle} onChange={(e) => setProbTitle(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none" placeholder="e.g. Reverse Linked List" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Difficulty</label>
                                    <select value={probDiff} onChange={(e) => setProbDiff(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none">
                                        <option>Easy</option><option>Medium</option><option>Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                                    <select value={probCat} onChange={(e) => setProbCat(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none">
                                        <option>Arrays</option><option>Dynamic Programming</option><option>Graphs</option><option>Trees</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Problem Statement (Markdown)</label>
                            <textarea value={probDesc} onChange={(e) => setProbDesc(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none min-h-[100px]" placeholder="Given an array of integers..."></textarea>
                        </div>

                        {/* Test Cases Builder */}
                        <div className="pt-4 border-t border-[#2d1e16]">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Test Cases Validation</label>
                                <button type="button" onClick={handleAddTestCase} className="text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-3 py-1.5 rounded flex items-center gap-1 hover:bg-[var(--color-primary)] hover:text-white transition-colors"><Plus size={14} /> Add Case</button>
                            </div>

                            <div className="space-y-4">
                                {testCases.map((tc, idx) => (
                                    <div key={idx} className="p-4 bg-[#120a06] border border-[#2d1e16] rounded-lg relative">
                                        <button type="button" onClick={() => handleRemoveTestCase(idx)} className="absolute top-3 right-3 text-red-500 hover:text-red-400 p-1"><X size={16} /></button>
                                        <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Test Case {idx + 1}</div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] text-gray-400 mb-1">Input Data</label>
                                                <input type="text" value={tc.input} onChange={e => handleTestCaseChange(idx, 'input', e.target.value)} className="w-full bg-black border border-[#2d1e16] text-white text-xs rounded px-3 py-2 font-mono" placeholder="[1, 2, 3]" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] text-gray-400 mb-1">Expected Output</label>
                                                <input type="text" value={tc.expectedOutput} onChange={e => handleTestCaseChange(idx, 'expectedOutput', e.target.value)} className="w-full bg-black border border-[#2d1e16] text-white text-xs rounded px-3 py-2 font-mono" placeholder="6" />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between bg-black/50 p-3 rounded border border-[#2d1e16]">
                                            <div>
                                                <span className="text-xs font-bold text-white">Hide Test Case from Students?</span>
                                                <p className="text-[10px] text-gray-500">If hidden, the student's dashboard will show "Hidden Test Case". Only evaluated server-side securely.</p>
                                            </div>
                                            <button type="button" onClick={() => handleTestCaseChange(idx, 'isHidden', !tc.isHidden)} className="text-[var(--color-primary)]">
                                                {tc.isHidden ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" disabled={isCreatingProb} className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl transition-all shadow-lg flex justify-center py-3">
                            {isCreatingProb ? <Loader2 size={18} className="animate-spin" /> : 'Author Problem into DB'}
                        </button>
                    </form>
                </div>

                <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-[#2d1e16] bg-[#120a06]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Server size={18} className="text-[var(--color-primary)]" /> Deploy New Contest</h2>
                    </div>

                    <form onSubmit={handleDeployContest} className="p-6 md:p-8 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contest Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none" placeholder="e.g. Weekly Hacker Cup" />
                            </div>

                            <div className="bg-[#120a06] border border-[#2d1e16] rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold text-white flex items-center gap-2">Strict Face Validation <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">PRO</span></div>
                                    <div className="text-xs text-gray-500 mt-1">Require webcam face recognition during the contest to prevent cheating.</div>
                                </div>
                                <button type="button" onClick={() => setStrictValidation(!strictValidation)} className="text-[var(--color-primary)] hover:scale-105 transition-transform">
                                    {strictValidation ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-gray-600" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Rules</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none min-h-[100px]" placeholder="Explain the contest rules..."></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Start Time</label>
                                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none [color-scheme:dark]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">End Time</label>
                                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none [color-scheme:dark]" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#2d1e16]">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Select Problems for Contest</label>
                            {availableProblems.length === 0 ? (
                                <div className="text-xs text-yellow-500 bg-yellow-500/10 p-3 rounded">No problems found. Create one using the Problem Studio above.</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {availableProblems.map(p => (
                                        <div
                                            key={p._id}
                                            onClick={() => toggleProblem(p._id)}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${selectedProblems.includes(p._id)
                                                ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-white shadow-[0_0_10px_rgba(246,107,21,0.2)]'
                                                : 'bg-[#120a06] border-[#2d1e16] text-gray-400 hover:border-gray-600'
                                                }`}
                                        >
                                            <div>
                                                <div className="font-bold text-sm mb-1">{p.title}</div>
                                                <div className="text-[10px] uppercase font-bold tracking-wider flex items-center gap-2">
                                                    {p.difficulty} • {p.category} {p.companyId === user?._id && <span className="text-[8px] bg-blue-500/20 text-blue-500 px-1 py-0.5 rounded">CUSTOM</span>}
                                                </div>
                                            </div>
                                            {selectedProblems.includes(p._id) && <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[#120a06]"><Plus size={14} className="rotate-45" /></div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(246,107,21,0.3)] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Deploy Contest Live</>}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default CompanyDashboard;
