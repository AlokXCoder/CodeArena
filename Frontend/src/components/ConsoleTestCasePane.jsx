import React, { useState } from 'react';
import { CheckCircle2, TerminalSquare, ChevronDown, Play, CloudUpload, Plus } from 'lucide-react';

const ConsoleTestCasePane = ({ testCases = [] }) => {
    const visibleCases = testCases.filter(tc => !tc.isHidden);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex-1 flex flex-col bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-md overflow-hidden relative">
            {/* Header Tabs */}
            <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[var(--color-dark-border)]">
                <div className="flex">
                    <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-200 bg-[#2a2a2a] transition-colors relative">
                        {/* Active Indication */}
                        <span className="absolute top-0 left-0 w-full h-0.5 bg-green-500"></span>
                        <CheckCircle2 size={14} className="text-green-500" /> TESTCASE
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors">
                        <TerminalSquare size={14} /> CONSOLE
                    </button>
                </div>
                <button className="px-4 text-gray-500 hover:text-white transition-colors h-full flex items-center justify-center border-l border-[var(--color-dark-border)]">
                    <ChevronDown size={16} />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#1e1e1e] custom-scrollbar mb-14">
                {/* Testcase Pills */}
                <div className="flex items-center gap-2 mb-6 text-sm overflow-x-auto no-scrollbar pb-1">
                    {visibleCases.map((tc, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-md font-medium transition-colors ${activeTab === index
                                    ? 'bg-[#2a2a2a] text-[var(--color-primary)] font-semibold border border-[var(--color-primary)]/30'
                                    : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2a2a2a]'
                                }`}
                        >
                            Case {index + 1}
                        </button>
                    ))}
                    <button className="px-4 py-1.5 rounded-md bg-transparent text-[var(--color-primary)]/80 hover:text-[var(--color-primary)] font-medium transition-colors flex items-center gap-1 ml-auto whitespace-nowrap">
                        <Plus size={14} /> Custom
                    </button>
                </div>

                {/* Inputs */}
                {visibleCases.length > 0 ? (
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs text-gray-400 mb-1.5 font-mono">Input:</div>
                            <div className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-3 py-2 text-gray-300 font-mono text-sm focus-within:border-[var(--color-primary)] transition-colors whitespace-pre-wrap outline-none" contentEditable suppressContentEditableWarning>
                                {visibleCases[activeTab]?.input}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-500 text-sm py-4 italic">No public test cases available for this problem.</div>
                )}
            </div>

            {/* Fixed Action Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[var(--color-dark-border)] p-3 flex justify-between items-center z-10">
                <div className="text-xs text-gray-500 font-medium hidden sm:block">Ready to compile</div>
                <div className="flex items-center gap-3 ml-auto">
                    <button className="flex items-center gap-2 px-5 py-2 rounded-md bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 font-semibold text-sm transition-colors border border-gray-600/50">
                        <Play size={14} className="fill-current text-gray-300" /> Run
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-sm transition-colors shadow-[0_0_15px_rgba(246,107,21,0.25)] hover:shadow-[0_0_20px_rgba(246,107,21,0.4)]">
                        <CloudUpload size={16} /> Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsoleTestCasePane;
