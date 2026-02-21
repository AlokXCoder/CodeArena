import React from 'react';
import { FileText, Lightbulb, History, Star, Share2, Copy } from 'lucide-react';

const ProblemDescription = ({ problem }) => {
    if (!problem) return null;

    return (
        <div className="flex-1 flex flex-col h-full bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-md overflow-hidden">
            {/* Top Tabs */}
            <div className="flex bg-[#1a1a1a] border-b border-[var(--color-dark-border)]">
                <button className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white border-b-2 border-[var(--color-primary)] bg-[#2a2a2a]">
                    <FileText size={16} className="text-[var(--color-primary)]" /> Description
                </button>
                <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
                    <Lightbulb size={16} /> Editorial
                </button>
                <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors">
                    <History size={16} /> Submissions
                </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#3f3f3f] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#555] text-gray-300">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded 
                            ${problem.difficulty === 'Easy' ? 'bg-[#1e3a29] text-[#2cbb5d]' :
                                problem.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-500' : 'bg-red-900/30 text-red-500'}`}>
                            {problem.difficulty}
                        </span>
                        <button className="text-gray-400 hover:text-white transition-colors"><Star size={18} /></button>
                        <button className="text-gray-400 hover:text-white transition-colors"><Share2 size={18} /></button>
                    </div>
                </div>

                <div className="space-y-4 text-sm leading-relaxed">
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
            </div>
        </div>
    );
};

export default ProblemDescription;
