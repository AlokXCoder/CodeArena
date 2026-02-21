import React from 'react';
import { RotateCw, Settings, Expand, ChevronDown } from 'lucide-react';

const CodeEditorPane = () => {
    return (
        <div className="flex-[2] flex flex-col bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-md overflow-hidden relative">
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[var(--color-dark-border)] px-3 py-2">
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-[#2a2a2a] px-2.5 py-1.5 rounded-md transition-colors">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        C++ 20
                        <ChevronDown size={14} className="text-gray-500" />
                    </button>

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

                {/* Code Content */}
                <div className="flex-1 p-4 overflow-x-auto whitespace-pre font-mono leading-6 text-[#d4d4d4] custom-scrollbar focus:outline-none" contentEditable suppressContentEditableWarning>
                    <span className="text-[#569cd6]">class</span> <span className="text-[#4ec9b0]">Solution</span> {'{'}<br />
                    <span className="text-[#569cd6]">public:</span><br />
                    {'    '}<span className="text-[#4ec9b0]">vector</span>{'<'}<span className="text-[#569cd6]">int</span>{'>'} <span className="text-[#dcdcaa]">twoSum</span>(<span className="text-[#4ec9b0]">vector</span>{'<'}<span className="text-[#569cd6]">int</span>{'>'}& nums, <span className="text-[#569cd6]">int</span> target) {'{'}<br />
                    {'        '}<span className="text-[#6a9955]">// Map to store number and its index</span><br />
                    {'        '}<span className="text-[#4ec9b0]">unordered_map</span>{'<'}<span className="text-[#569cd6]">int</span>, <span className="text-[#569cd6]">int</span>{'>'} numMap;<br />
                    <br />
                    {'        '}<span className="text-[#c586c0]">for</span> (<span className="text-[#569cd6]">int</span> i = <span className="text-[#b5cea8]">0</span>; i {'<'} nums.<span className="text-[#dcdcaa]">size</span>(); i++) {'{'}<br />
                    {'            '}<span className="text-[#569cd6]">int</span> complement = target - nums[i];<br />
                    <br />
                    {'            '}<span className="text-[#c586c0]">if</span> (numMap.<span className="text-[#dcdcaa]">find</span>(complement) != numMap.<span className="text-[#dcdcaa]">end</span>()) {'{'}<br />
                    {'                '}<span className="text-[#c586c0]">return</span> {'{'}numMap[complement], i{'}'};<br />
                    {'            '}{'}'}<br />
                    {'            '}numMap[nums[i]] = i;<br />
                    {'        '}{'}'}<br />
                    {'        '}<span className="text-[#c586c0]">return</span> {'{}'}; <span className="text-[#6a9955]">// Should not reach here per constraints</span><br />
                    {'    '}{'}'}<br />
                    {'}'};
                </div>
            </div>
        </div>
    );
};

export default CodeEditorPane;
