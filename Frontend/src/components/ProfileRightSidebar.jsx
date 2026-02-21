import React from 'react';
import { Award, Code2, Lock } from 'lucide-react';

const ProfileRightSidebar = () => {
    return (
        <div className="flex flex-col gap-6">

            {/* Languages Card */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-6">
                <h3 className="text-white font-bold mb-6">Languages</h3>

                <div className="flex justify-center mb-8 relative">
                    {/* Circular Progress Placeholder */}
                    <div className="w-36 h-36 rounded-full border-[10px] border-[#333] relative flex items-center justify-center shadow-inner">
                        <svg className="absolute top-[-10px] left-[-10px] w-[154px] h-[154px] transform -rotate-90">
                            <circle
                                cx="77" cy="77" r="72"
                                fill="none"
                                stroke="var(--color-primary)"
                                strokeWidth="10"
                                strokeDasharray="450"
                                strokeDashoffset="150"
                                className="transition-all duration-1000 ease-out"
                            />
                            <circle
                                cx="77" cy="77" r="72"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="10"
                                strokeDasharray="450"
                                strokeDashoffset="350"
                                className="transition-all duration-1000 ease-out"
                            />
                            <circle
                                cx="77" cy="77" r="72"
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="10"
                                strokeDasharray="450"
                                strokeDashoffset="400"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white tracking-tighter">842</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Total Solved</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span> <span className="text-gray-300">C++</span></div>
                        <div className="text-white font-semibold flex items-center gap-2"><span>547</span> <span className="text-gray-500 text-xs w-8 text-right">65%</span></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> <span className="text-gray-300">Python</span></div>
                        <div className="text-white font-semibold flex items-center gap-2"><span>168</span> <span className="text-gray-500 text-xs w-8 text-right">20%</span></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> <span className="text-gray-300">Java</span></div>
                        <div className="text-white font-semibold flex items-center gap-2"><span>127</span> <span className="text-gray-500 text-xs w-8 text-right">15%</span></div>
                    </div>
                </div>
            </div>

            {/* Difficulty Card */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-6">
                <h3 className="text-white font-bold mb-6">Difficulty</h3>

                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-green-500 font-semibold">Easy</span>
                            <span className="text-gray-400">320 <span className="text-gray-500 text-xs">solved</span></span>
                        </div>
                        <div className="w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-yellow-500 font-semibold">Medium</span>
                            <span className="text-gray-400">415 <span className="text-gray-500 text-xs">solved</span></span>
                        </div>
                        <div className="w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-red-500 font-semibold">Hard</span>
                            <span className="text-gray-400">107 <span className="text-gray-500 text-xs">solved</span></span>
                        </div>
                        <div className="w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges Card */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold">Badges</h3>
                    <span className="text-xs text-gray-500 font-medium">12 Unlocked</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {/* Unlocked Badges */}
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-square bg-[#2a2a2a] rounded-lg border border-[var(--color-dark-border)] flex items-center justify-center hover:border-gray-500 transition-colors cursor-pointer group">
                            <Award size={24} className="text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
                        </div>
                    ))}
                    {/* Locked Badges */}
                    {[1, 2, 3].map(i => (
                        <div key={`lock-${i}`} className="aspect-square bg-[#1a1a1a] rounded-lg border border-[#222] border-dashed flex items-center justify-center opacity-50">
                            <Lock size={16} className="text-gray-600" />
                        </div>
                    ))}
                    <div className="aspect-square bg-[#1a1a1a] rounded-lg border border-[#222] border-dashed flex items-center justify-center text-xs text-gray-500 font-semibold">
                        +5
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfileRightSidebar;
