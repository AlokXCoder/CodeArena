import React, { useState, useEffect } from 'react';
import { FileText, Lightbulb, History, Star, Share2, Copy, Sparkles, Loader2, Bot, CheckCircle2, XCircle } from 'lucide-react';
import { marked } from 'marked';

const ProblemDescription = ({ problem, isLoading, wrongAttempts, showHintOverlay, setShowHintOverlay, submissions, requestTabChange }) => {
    const [activeTab, setActiveTab] = useState('Description');
    const [isExplaining, setIsExplaining] = useState(false);
    const [explanation, setExplanation] = useState(null);

    // Editorial State
    const [editorialLoading, setEditorialLoading] = useState(false);
    const [editorialData, setEditorialData] = useState(null);

    // Arena Bot State
    const [hintLoading, setHintLoading] = useState(false);
    const [hintData, setHintData] = useState(null);

    // React to external tab switch request (e.g., from Console on wrong attempt 3)
    useEffect(() => {
        if (requestTabChange) {
            setActiveTab(requestTabChange);
            if (requestTabChange === 'Arena Bot' && !hintData) {
                fetchHint();
            }
        }
    }, [requestTabChange]);

    const handleExplain = async () => {
        if (!problem || isExplaining) return;
        setIsExplaining(true);
        setExplanation(null);
        try {
            const res = await fetch(`http://localhost:5000/api/explain/${problem._id}`);
            const data = await res.json();
            if (data.explanation) {
                setExplanation(data.explanation);
            } else {
                setExplanation('Could not generate an explanation at this time.');
            }
        } catch (error) {
            console.error('Explain error', error);
            setExplanation('An error occurred while connecting to the AI.');
        } finally {
            setIsExplaining(false);
        }
    };

    const fetchEditorial = async () => {
        if (!problem || editorialData) return;
        setEditorialLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/editorial/${problem._id}`);
            const data = await res.json();
            setEditorialData(data.editorial || "Editorial is currently unavailable.");
        } catch (error) {
            setEditorialData("Error connecting to editorial server.");
        } finally {
            setEditorialLoading(false);
        }
    };

    const fetchHint = async () => {
        if (!problem || hintData) return;
        setHintLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/hint/${problem._id}`);
            const data = await res.json();
            setHintData(data.hint || "Couldn't generate hint.");
        } catch (err) {
            setHintData("Error reaching Arena Bot.");
        } finally {
            setHintLoading(false);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Editorial') fetchEditorial();
        if (tab === 'Arena Bot') {
            if (showHintOverlay) setShowHintOverlay(false);
            fetchHint();
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col h-full bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-md overflow-hidden animate-pulse">
                <div className="flex bg-[#1a1a1a] border-b border-[var(--color-dark-border)] px-4 py-3 gap-6 shrink-0 z-[101]">
                    <div className="w-24 h-5 bg-[#2d2d2d] rounded"></div>
                    <div className="w-20 h-5 bg-[#2d2d2d] rounded"></div>
                    <div className="w-24 h-5 bg-[#2d2d2d] rounded"></div>
                </div>
                <div className="flex-1 p-6 space-y-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="w-2/3 h-8 bg-[#2d2d2d] rounded"></div>
                        <div className="w-24 h-8 bg-[#2d2d2d] rounded"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="w-full h-4 bg-[#2d2d2d] rounded"></div>
                        <div className="w-full h-4 bg-[#2d2d2d] rounded"></div>
                        <div className="w-4/5 h-4 bg-[#2d2d2d] rounded"></div>
                        <div className="w-full h-4 bg-[#2d2d2d] rounded"></div>
                        <div className="w-3/4 h-4 bg-[#2d2d2d] rounded"></div>
                    </div>
                    <div className="w-full h-32 bg-[#2d2d2d] rounded mt-8"></div>
                </div>
            </div>
        );
    }

    if (!problem) return null;

    return (
        <div className="flex-1 flex flex-col h-full bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-md overflow-hidden">
            {/* Top Tabs */}
            <div className="flex bg-[#1a1a1a] border-b border-[var(--color-dark-border)] shrink-0 overflow-x-auto no-scrollbar relative z-[101]">
                <button
                    onClick={() => handleTabClick('Description')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === 'Description' ? 'text-white border-b-2 border-[var(--color-primary)] bg-[#2a2a2a]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    <FileText size={16} className={activeTab === 'Description' ? "text-[var(--color-primary)]" : ""} /> Description
                </button>
                <button
                    onClick={() => handleTabClick('Editorial')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'Editorial' ? 'text-white border-b-2 border-[var(--color-primary)] bg-[#2a2a2a]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    <Lightbulb size={16} className={activeTab === 'Editorial' ? "text-[var(--color-primary)]" : ""} /> Editorial
                </button>
                <button
                    onClick={() => handleTabClick('Submissions')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'Submissions' ? 'text-white border-b-2 border-[var(--color-primary)] bg-[#2a2a2a]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    <History size={16} className={activeTab === 'Submissions' ? "text-[var(--color-primary)]" : ""} /> Submissions
                </button>

                {wrongAttempts >= 3 && (
                    <button
                        onClick={() => handleTabClick('Arena Bot')}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'Arena Bot'
                            ? 'text-indigo-100 border-b-2 border-indigo-500 bg-[#2a2a4a]'
                            : 'text-indigo-400 hover:text-indigo-300'
                            } ${showHintOverlay ? 'ring-2 ring-indigo-500 animate-pulse relative z-[102] bg-[#1e1a3b]' : ''}`}
                    >
                        <Bot size={16} className={activeTab === 'Arena Bot' ? 'animate-bounce' : ''} />
                        Arena Bot
                        {showHintOverlay && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                        )}
                    </button>
                )}
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-[#3f3f3f] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#555] text-gray-300 relative">

                {activeTab === 'Description' && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleExplain}
                                    disabled={isExplaining}
                                    className="bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 hover:text-indigo-300 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold border border-indigo-500/30"
                                >
                                    {isExplaining ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                    {isExplaining ? 'AI Thinking...' : 'Explain in Ease'}
                                </button>
                                <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-md 
                                    ${problem.difficulty === 'Easy' ? 'bg-[#1e3a29] text-[#2cbb5d]' :
                                        problem.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-500' : 'bg-red-900/30 text-red-500'}`}>
                                    {problem.difficulty}
                                </span>
                                <button className="text-gray-400 hover:text-white transition-colors"><Star size={18} /></button>
                                <button className="text-gray-400 hover:text-white transition-colors"><Share2 size={18} /></button>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm leading-relaxed">
                            {explanation && (
                                <div className="mb-6 p-4 bg-[#1e1a3b] border border-indigo-500/30 rounded-lg relative">
                                    <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2">
                                        <Sparkles size={16} /> AI Explanation
                                    </h3>
                                    <div
                                        className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#0d0b1a] prose-pre:border prose-pre:border-indigo-500/20"
                                        dangerouslySetInnerHTML={{ __html: marked.parse(explanation) }}
                                    />
                                    <button
                                        onClick={() => setExplanation(null)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-xs font-bold"
                                    >
                                        CLOSE
                                    </button>
                                </div>
                            )}

                            <p dangerouslySetInnerHTML={{ __html: problem.description }}></p>

                            <div className="mt-8 space-y-6">
                                {problem.testCases?.filter(tc => !tc.isHidden).map((testCase, index) => (
                                    <div key={index} className="rounded-lg border border-[var(--color-dark-border)] overflow-hidden">
                                        <div className="px-4 py-2 bg-[#1f1f1f] text-xs font-bold text-gray-400 flex justify-between items-center group">
                                            EXAMPLE {index + 1}
                                            <button className="hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><Copy size={14} /></button>
                                        </div>
                                        <div className="p-4 bg-[#1a1a1a] font-mono text-sm space-y-2">
                                            <div className="whitespace-pre-wrap"><span className="text-gray-500">Input:</span><br />{testCase.input}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Constraints Placeholder */}
                        <div className="mt-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-3.5 bg-[var(--color-primary)] rounded"></div>
                                <h3 className="font-bold text-white text-sm">Constraints</h3>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-sm font-mono text-gray-400 marker:text-[var(--color-primary)]">
                                <li>Standard limits apply unless specified otherwise.</li>
                                <li>Time Limit: 2.0s</li>
                                <li>Memory Limit: 256MB</li>
                            </ul>
                        </div>
                    </>
                )}

                {activeTab === 'Editorial' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-white mb-6">
                            <Lightbulb className="text-[var(--color-primary)]" /> Solution Editorial
                        </h2>
                        {editorialLoading ? (
                            <div className="flex flex-col items-center justify-center p-12 gap-3 text-gray-400">
                                <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
                                <span>Generating expert editorial...</span>
                            </div>
                        ) : (
                            editorialData && (
                                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-[#333]">
                                    <div dangerouslySetInnerHTML={{ __html: marked.parse(editorialData) }} />
                                </div>
                            )
                        )}
                    </div>
                )}

                {activeTab === 'Submissions' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-white mb-6">
                            <History className="text-[var(--color-primary)]" /> Your Submissions
                        </h2>
                        {submissions && submissions.length > 0 ? (
                            <div className="space-y-3">
                                {submissions.map(sub => (
                                    <div key={sub.id} className="bg-[#1a1a1a] border border-[#333] rounded-md p-4 flex flex-col gap-2 relative">
                                        <div className="flex justify-between items-center">
                                            <span className={`font-bold flex items-center gap-2 ${sub.status === 'Accepted' ? 'text-green-500' : (sub.status === 'Wrong Answer' ? 'text-red-500' : 'text-yellow-500')}`}>
                                                {sub.status === 'Accepted' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                                {sub.status}
                                            </span>
                                            <span className="text-xs text-gray-500">{sub.time}</span>
                                        </div>
                                        {sub.status !== 'Accepted' && (
                                            <div className="text-sm text-gray-400 font-mono mt-2 bg-[#1e1e1e] p-2 rounded">
                                                {sub.message.length > 100 ? sub.message.substring(0, 100) + '...' : sub.message}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 gap-2 text-gray-500">
                                <History size={40} className="mb-2 opacity-20" />
                                <span>You have not made any submissions yet.</span>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Arena Bot' && (
                    <div className="space-y-4 relative">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400 mb-6">
                            <Bot className="animate-pulse" /> Arena Bot Guidance
                        </h2>
                        {hintLoading ? (
                            <div className="flex flex-col items-center justify-center p-12 gap-3 text-indigo-400/50">
                                <Loader2 size={32} className="animate-spin" />
                                <span>Analyzing your stuck point...</span>
                            </div>
                        ) : (
                            hintData && (
                                <div className="prose prose-invert prose-sm max-w-none text-indigo-100 bg-[#1e1a3b] p-6 rounded-lg border border-indigo-500/30 shadow-[0_4px_30px_rgba(99,102,241,0.1)]">
                                    <div dangerouslySetInnerHTML={{ __html: marked.parse(hintData) }} />
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDescription;
