import React, { useState, useEffect } from 'react';
import { Plus, ToggleLeft, ToggleRight, Loader2, ShieldCheck, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuperadminDashboard = () => {
    const [probTitle, setProbTitle] = useState('');
    const [probDesc, setProbDesc] = useState('');
    const [probDiff, setProbDiff] = useState('Medium');
    const [probCat, setProbCat] = useState('Arrays');
    const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '', isHidden: false }]);
    const [isCreatingProb, setIsCreatingProb] = useState(false);

    const [msg, setMsg] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token');

    // Protect Route
    useEffect(() => {
        if (!user || user.role !== 'superadmin') {
            navigate('/');
        }
    }, [user, navigate]);

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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/problems/superadmin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    title: probTitle,
                    description: probDesc,
                    difficulty: probDiff,
                    category: probCat,
                    testCases: testCases
                })
            });

            if (res.ok) {
                setMsg({ text: 'Practice Question Successfully Uploaded to Global Practice Arena!', type: 'success' });
                setProbTitle(''); setProbDesc(''); setTestCases([{ input: '', expectedOutput: '', isHidden: false }]);
            } else {
                const data = await res.json();
                setMsg({ text: data.message || 'Failed to upload practice question', type: 'error' });
            }
        } catch (err) {
            setMsg({ text: 'Server error', type: 'error' });
        } finally {
            setIsCreatingProb(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-8 custom-scrollbar text-sm bg-transparent min-h-full">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">

                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Superadmin Control Panel</h1>
                        <p className="text-gray-400">Upload Global Practice Questions</p>
                    </div>
                </div>

                {msg.text && (
                    <div className={`p-4 rounded-lg font-bold ${msg.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                        {msg.text}
                    </div>
                )}

                <div className="bg-[#1a1310] border border-indigo-500/20 rounded-xl shadow-xl overflow-hidden mb-8">
                    <div className="p-6 border-b border-indigo-500/20 bg-[#120a06]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Database size={18} className="text-indigo-500" /> Upload Practice Question</h2>
                        <p className="text-xs text-gray-500 mt-1">This will immediately be available to all users on the Problems page.</p>
                    </div>

                    <form onSubmit={handleCreateProblem} className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Problem Title</label>
                                <input type="text" value={probTitle} onChange={(e) => setProbTitle(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-indigo-500 outline-none transition-colors" placeholder="e.g. Reverse Linked List" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Difficulty</label>
                                    <select value={probDiff} onChange={(e) => setProbDiff(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-indigo-500 outline-none transition-colors">
                                        <option>Easy</option><option>Medium</option><option>Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                                    <select value={probCat} onChange={(e) => setProbCat(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-indigo-500 outline-none transition-colors">
                                        <option>Arrays</option><option>Dynamic Programming</option><option>Graphs</option><option>Trees</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Problem Statement (Markdown)</label>
                            <textarea value={probDesc} onChange={(e) => setProbDesc(e.target.value)} className="w-full bg-[#120a06] border border-[#2d1e16] text-white rounded-lg px-4 py-3 focus:border-indigo-500 outline-none min-h-[100px] transition-colors" placeholder="Given an array of integers..."></textarea>
                        </div>

                        {/* Test Cases Builder */}
                        <div className="pt-4 border-t border-[#2d1e16]">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Test Cases Validation</label>
                                <button type="button" onClick={handleAddTestCase} className="text-xs bg-indigo-500/20 text-indigo-500 px-3 py-1.5 rounded flex items-center gap-1 hover:bg-indigo-500 hover:text-white transition-colors"><Plus size={14} /> Add Case</button>
                            </div>

                            <div className="space-y-4">
                                {testCases.map((tc, idx) => (
                                    <div key={idx} className="p-4 bg-[#120a06] border border-[#2d1e16] rounded-lg relative">
                                        <button type="button" onClick={() => handleRemoveTestCase(idx)} className="absolute top-3 right-3 text-red-500 hover:text-red-400 p-1">✕</button>
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
                                                <span className="text-xs font-bold text-white">Hide Test Case from Users?</span>
                                                <p className="text-[10px] text-gray-500">Evaluating securely on the server.</p>
                                            </div>
                                            <button type="button" onClick={() => handleTestCaseChange(idx, 'isHidden', !tc.isHidden)} className="text-indigo-500">
                                                {tc.isHidden ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" disabled={isCreatingProb} className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex justify-center items-center gap-2">
                            {isCreatingProb ? <Loader2 size={18} className="animate-spin" /> : <><Database size={18} /> Publish to Live Practice Arena</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SuperadminDashboard;
