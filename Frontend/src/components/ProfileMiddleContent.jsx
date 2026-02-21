import React from 'react';
import { TrendingUp, Award, Zap } from 'lucide-react';

const ProfileMiddleContent = () => {
    return (
        <div className="flex flex-col gap-6">

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-5">
                    <div className="text-gray-400 text-sm font-semibold mb-2">Current Rating</div>
                    <div className="text-3xl font-bold text-white mb-2">2,150</div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-500 font-semibold flex items-center"><TrendingUp size={12} className="mr-1" /> +45</span>
                        <span className="text-gray-500">this month</span>
                    </div>
                </div>

                <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-5">
                    <div className="text-gray-400 text-sm font-semibold mb-2">Max Rating</div>
                    <div className="text-3xl font-bold text-white mb-2">2,300</div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500">Master Rank</span>
                    </div>
                </div>

                <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-5">
                    <div className="text-gray-400 text-sm font-semibold mb-2">Global Rank</div>
                    <div className="text-3xl font-bold text-white mb-2">#154</div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-500 font-semibold flex items-center">▲ Top 0.5%</span>
                    </div>
                </div>
            </div>

            {/* Heatmap Card */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold">Submission History</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#2d2d2d]"></div> 0</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#783e1f]"></div> 1-3</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[var(--color-primary)]"></div> 4+</div>
                    </div>
                </div>

                {/* Dummy Heatmap Grid */}
                <div className="overflow-x-auto custom-scrollbar pb-4">
                    <div className="flex gap-1.5 min-w-[600px]">
                        {/* Generating 52 columns for weeks, 7 rows for days */}
                        {[...Array(52)].map((_, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-1.5">
                                {[...Array(7)].map((_, rowIndex) => {
                                    const isSubmit = Math.random() > 0.75;
                                    const intensity = Math.random() > 0.5 ? 'bg-[var(--color-primary)]' : 'bg-[#783e1f]';
                                    const bgClass = isSubmit ? intensity : 'bg-[#2d2d2d]';
                                    return (
                                        <div key={rowIndex} className={`w-3.5 h-3.5 rounded-sm ${bgClass}`} />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Streak Stats */}
                <div className="flex justify-between mt-6 pt-6 border-t border-[var(--color-dark-border)]">
                    <div className="text-center">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Current Streak</div>
                        <div className="text-xl font-bold text-white">12 Days</div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Active Days</div>
                        <div className="text-xl font-bold text-white">245 Days</div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Max Streak</div>
                        <div className="text-xl font-bold text-white">45 Days</div>
                    </div>
                </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-xl shadow-lg">
                <div className="flex items-center justify-between p-6 border-b border-[var(--color-dark-border)]">
                    <h3 className="text-white font-bold">Recent Submissions</h3>
                    <button className="text-[var(--color-primary)] text-sm font-semibold hover:underline">View All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-xs text-gray-500 uppercase bg-[#1a1a1a]">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider">Problem</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Language</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Verdict</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-dark-border)]">
                            {/* Row 1 */}
                            <tr className="hover:bg-[#252525] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-white">Find the Shortest Path</div>
                                    <div className="text-xs text-gray-500 mt-1">Graphs • Hard</div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">C++ 17</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 text-xs font-bold text-green-500 bg-green-500/10 rounded-full border border-green-500/20 inline-flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Accepted
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-gray-500 font-mono text-xs">2 mins ago</td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-[#252525] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-white">Dynamic Array Sum</div>
                                    <div className="text-xs text-gray-500 mt-1">DP • Medium</div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">Python 3</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 text-xs font-bold text-red-500 bg-red-500/10 rounded-full border border-red-500/20 inline-flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Wrong Answer
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-gray-500 font-mono text-xs">1 hour ago</td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="hover:bg-[#252525] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-white">Binary Tree Traversal</div>
                                    <div className="text-xs text-gray-500 mt-1">Trees • Easy</div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">Java 11</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 text-xs font-bold text-green-500 bg-green-500/10 rounded-full border border-green-500/20 inline-flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Accepted
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-gray-500 font-mono text-xs">5 hours ago</td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="hover:bg-[#252525] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-white">Knapsack Problem</div>
                                    <div className="text-xs text-gray-500 mt-1">DP • Medium</div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">C++ 20</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 text-xs font-bold text-yellow-500 bg-yellow-500/10 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Time Limit
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-gray-500 font-mono text-xs">Yesterday</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ProfileMiddleContent;
