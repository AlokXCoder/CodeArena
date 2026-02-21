import React from 'react';
import { RotateCw, Settings, Expand, ChevronDown } from 'lucide-react';

const CodeEditorPane = ({ code, setCode, disabled }) => {
    return (
        <div className={`flex-[2] flex flex-col min-h-0 border border-[var(--color-dark-border)] rounded-md overflow-hidden relative ${disabled ? 'bg-red-900/10 opacity-80' : 'bg-[var(--color-dark-surface)]'}`}>
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[var(--color-dark-border)] px-3 py-2">
                <div className="flex items-center gap-3">
                    <div className="text-xs font-semibold text-gray-300 bg-[#2a2a2a] px-2.5 py-1.5 rounded-md flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
                        AI Evaluator Active
                    </div>

                    <div className="w-[1px] h-4 bg-[var(--color-dark-border)]"></div>

                    <div className="flex items-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors" title="Reset to default code">
                            <RotateCw size={14} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors" title="Editor Settings">
                            <Settings size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium tracking-wide">
                    <span>Saved to local storage</span>
                    <button className="p-1.5 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors" title="Full Screen">
                        <Expand size={14} />
                    </button>
                </div>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 overflow-y-auto bg-[#1e1e1e] text-sm font-mono flex">
                {/* Line Numbers */}
                <div className="w-12 flex-shrink-0 bg-[#1e1e1e] text-[#5a6069] text-right pr-4 py-4 select-none border-r border-[#2d2d2d] flex flex-col">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="leading-6">{i + 1}</div>
                    ))}
                </div>

                {/* Code Content Input */}
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={disabled}
                    className="flex-1 p-4 bg-transparent text-[#d4d4d4] font-mono leading-6 resize-none focus:outline-none custom-scrollbar whitespace-pre disabled:cursor-not-allowed"
                    spellCheck="false"
                    placeholder={disabled ? "// TIME LIMIT EXCEEDED. EDITOR LOCKED." : "// Start coding here..."}
                />
            </div>
        </div>
    );
};

export default CodeEditorPane;
