import React from 'react';
import { Search, ChevronDown, Users, Globe2, Clock, Check } from 'lucide-react';

const LeaderboardPage = () => {
    return (
        <div className="flex-1 overflow-y-auto w-full mx-auto p-4 md:p-10 custom-scrollbar text-sm bg-transparent min-h-full">
            <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">Global Ranking</h1>
                            <span className="px-3 py-1 bg-[#2a1a10] border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md text-[10px] font-bold tracking-wider uppercase">
                                Official
                            </span>
                        </div>
                        <p className="text-gray-400 text-base">Real-time updates for Round #452 • 12,405 Participants fighting for the top spot.</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock size={14} /> Last updated: just now
                    </div>
                </div>

                {/* Podium */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-4 mt-12 mb-8 md:h-[250px]">

                    {/* 2nd Place */}
                    <div className="w-full md:w-[280px] bg-[#1a1310] border border-[#2d1e16] rounded-xl flex flex-col items-center p-6 relative md:h-[200px] mt-12 md:mt-0 hover:border-[var(--color-primary)] transition-colors">
                        <div className="absolute top-4 right-4 text-4xl font-black text-[#2d1e16]/50">02</div>
                        <div className="w-16 h-16 rounded-full border-4 border-[#1a1310] relative -mt-12 bg-[#2d1e16] shadow-xl overflow-hidden mb-3">
                            <img src="https://i.pravatar.cc/150?img=5" alt="Code_Wizard" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Code_Wizard</h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                            🇯🇵 Japan
                        </div>
                        <div className="flex w-full justify-between items-center text-center px-4 border-t border-[#2d1e16] pt-4 mt-auto">
                            <div>
                                <div className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 uppercase">Score</div>
                                <div className="text-xl font-bold text-white tracking-tight">780</div>
                            </div>
                            <div className="w-[1px] h-8 bg-[#2d1e16]"></div>
                            <div>
                                <div className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 uppercase">Penalty</div>
                                <div className="text-base font-bold text-gray-300">140<span className="text-xs text-gray-500 font-normal">m</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="w-full md:w-[320px] bg-gradient-to-b from-[#2a1a10] to-[#1a1310] border border-[var(--color-primary)] rounded-xl flex flex-col items-center p-6 relative md:h-[240px] mt-16 md:mt-0 shadow-[0_0_30px_rgba(246,107,21,0.15)] z-10 transform md:-translate-y-4">
                        <div className="absolute -top-10">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--color-primary)" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <div className="absolute top-4 right-4 text-5xl font-black text-[var(--color-primary)]/20">01</div>
                        <div className="w-20 h-20 rounded-full border-4 border-[#2a1a10] relative -mt-14 bg-[var(--color-primary)] shadow-[0_0_20px_rgba(246,107,21,0.5)] overflow-hidden mb-4">
                            <img src="https://i.pravatar.cc/150?img=1" alt="User_Alpha" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">User_Alpha</h3>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] mb-8 font-medium">
                            🇺🇸 United States
                        </div>
                        <div className="flex w-full justify-between items-center text-center px-6 border-t border-[var(--color-primary)]/30 pt-5 mt-auto">
                            <div>
                                <div className="text-[10px] text-[var(--color-primary)] font-bold tracking-wider mb-1 uppercase">Total Score</div>
                                <div className="text-3xl font-bold text-white tracking-tight">800</div>
                            </div>
                            <div className="w-[1px] h-10 bg-[var(--color-primary)]/20"></div>
                            <div>
                                <div className="text-[10px] text-[var(--color-primary)]/70 font-bold tracking-wider mb-1 uppercase">Time</div>
                                <div className="text-xl font-bold text-gray-300">120<span className="text-sm text-gray-500 font-normal">m</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="w-full md:w-[280px] bg-[#1a1310] border border-[#2d1e16] rounded-xl flex flex-col items-center p-6 relative md:h-[180px] mt-12 md:mt-0 hover:border-[var(--color-primary)] transition-colors">
                        <div className="absolute top-4 right-4 text-4xl font-black text-[#2d1e16]/50">03</div>
                        <div className="w-14 h-14 rounded-full border-4 border-[#1a1310] relative -mt-11 bg-[#2d1e16] shadow-xl overflow-hidden mb-2">
                            <img src="https://i.pravatar.cc/150?img=9" alt="Dev_Guru" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Dev_Guru</h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
                            🇮🇳 India
                        </div>
                        <div className="flex w-full justify-between items-center text-center px-4 border-t border-[#2d1e16] pt-3 mt-auto">
                            <div>
                                <div className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 uppercase">Score</div>
                                <div className="text-xl font-bold text-white tracking-tight">750</div>
                            </div>
                            <div className="w-[1px] h-8 bg-[#2d1e16]"></div>
                            <div>
                                <div className="text-[10px] text-gray-500 font-bold tracking-wider mb-1 uppercase">Penalty</div>
                                <div className="text-base font-bold text-gray-300">110<span className="text-xs text-gray-500 font-normal">m</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#1a1310] p-4 rounded-xl border border-[#2d1e16]">
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by username, country..."
                            className="w-full bg-[#120a06] border border-[#2d1e16] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
                        <button className="flex items-center gap-2 whitespace-nowrap bg-[#120a06] border border-[#2d1e16] text-gray-300 text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-[#1f1510] transition-colors">
                            Country: All <ChevronDown size={16} className="text-gray-500" />
                        </button>
                        <button className="flex items-center gap-2 whitespace-nowrap bg-[#120a06] border border-[#2d1e16] text-gray-300 text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-[#1f1510] transition-colors">
                            Language: C++ <ChevronDown size={16} className="text-gray-500" />
                        </button>
                        <button className="flex items-center gap-2 whitespace-nowrap bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-bold rounded-lg px-5 py-2.5 shadow-[0_0_15px_rgba(246,107,21,0.2)] transition-all">
                            <Users size={16} className="fill-current" /> Find Friends
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#1a1310] border border-[#2d1e16] rounded-xl overflow-x-auto shadow-xl">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-[#2d1e16] bg-[#120a06]">
                            <tr>
                                <th className="px-6 py-4 font-bold">Rank</th>
                                <th className="px-6 py-4 font-bold w-1/3">Contestant</th>
                                <th className="px-6 py-4 font-bold text-center">Score</th>
                                <th className="px-6 py-4 font-bold text-center">Penalty</th>
                                <th className="px-4 py-4 font-bold text-center text-[#f66b15]">A</th>
                                <th className="px-4 py-4 font-bold text-center text-[#f66b15]">B</th>
                                <th className="px-4 py-4 font-bold text-center text-[#f66b15]">C</th>
                                <th className="px-4 py-4 font-bold text-center text-[#f66b15]">D</th>
                                <th className="px-4 py-4 font-bold text-center text-[#f66b15]">E</th>
                                <th className="px-4 py-4 font-bold text-center text-[#f66b15]">F</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2d1e16] text-sm">
                            {/* Row 4 */}
                            <tr className="hover:bg-[#1f1510] transition-colors group">
                                <td className="px-6 py-5 font-bold text-gray-400">4</td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 font-bold text-xs ring-2 ring-[#2d1e16] group-hover:ring-indigo-500 transition-all">N</div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-[var(--color-primary)] transition-colors cursor-pointer">Neo_Matrix</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">🇩🇪 Germany</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 font-bold text-white text-center text-lg">700</td>
                                <td className="px-6 py-5 text-gray-400 text-center">135<span className="text-xs">m</span></td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+</div><div className="text-[10px] text-gray-500">00:12</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+</div><div className="text-[10px] text-gray-500">00:45</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-red-500 font-bold">-1</div><div className="text-[10px] text-[#2d1e16]">--:--</div>
                                </td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                            </tr>

                            {/* Row 5 */}
                            <tr className="hover:bg-[#1f1510] transition-colors group">
                                <td className="px-6 py-5 font-bold text-gray-400">5</td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-900 overflow-hidden ring-2 ring-[#2d1e16] group-hover:ring-teal-500 transition-all">
                                            <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-[var(--color-primary)] transition-colors cursor-pointer">Byte_Smasher</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">🇧🇷 Brazil</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 font-bold text-white text-center text-lg">650</td>
                                <td className="px-6 py-5 text-gray-400 text-center">150<span className="text-xs">m</span></td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+</div><div className="text-[10px] text-gray-500">00:08</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-red-500 font-bold">-2</div><div className="text-[10px] text-[#2d1e16]">--:--</div>
                                </td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                            </tr>

                            {/* Row 6 (Current User) */}
                            <tr className="bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 transition-colors group border-y border-[var(--color-primary)]/30">
                                <td className="px-6 py-5 font-bold text-[var(--color-primary)]">6</td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-xs ring-2 ring-[var(--color-primary)] shadow-[0_0_10px_rgba(246,107,21,0.5)]">You</div>
                                        <div>
                                            <div className="font-bold text-white flex items-center gap-2">Algorithm_Ace <span className="bg-[var(--color-primary)] text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">Me</span></div>
                                            <div className="text-xs text-gray-400 flex items-center gap-1">🇨🇦 Canada</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 font-bold text-[var(--color-primary)] text-center text-lg">620</td>
                                <td className="px-6 py-5 text-gray-400 text-center">98<span className="text-xs">m</span></td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+</div><div className="text-[10px] text-gray-500">00:15</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+1</div><div className="text-[10px] text-gray-500">01:05</div>
                                </td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                            </tr>

                            {/* Row 7 */}
                            <tr className="hover:bg-[#1f1510] transition-colors group">
                                <td className="px-6 py-5 font-bold text-gray-400">7</td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 font-bold text-xs ring-2 ring-[#2d1e16] group-hover:ring-blue-500 transition-all">K</div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-[var(--color-primary)] transition-colors cursor-pointer">Kafka_Consumer</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">🇨🇿 Czechia</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 font-bold text-white text-center text-lg">600</td>
                                <td className="px-6 py-5 text-gray-400 text-center">112<span className="text-xs">m</span></td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+</div><div className="text-[10px] text-gray-500">00:30</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-red-500 font-bold">-1</div><div className="text-[10px] text-[#2d1e16]">--:--</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+</div><div className="text-[10px] text-gray-500">01:10</div>
                                </td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                            </tr>

                            {/* Row 8 */}
                            <tr className="hover:bg-[#1f1510] transition-colors group">
                                <td className="px-6 py-5 font-bold text-gray-400">8</td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-900 overflow-hidden ring-2 ring-[#2d1e16] group-hover:ring-[var(--color-primary)] transition-all">
                                            <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-[var(--color-primary)] transition-colors cursor-pointer">Pythonista_Girl</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">🇵🇱 Poland</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 font-bold text-white text-center text-lg">580</td>
                                <td className="px-6 py-5 text-gray-400 text-center">145<span className="text-xs">m</span></td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-green-500 font-bold">+</div><div className="text-[10px] text-gray-500">00:22</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-red-500 font-bold">-2</div><div className="text-[10px] text-[#2d1e16]">--:--</div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <div className="text-red-500 font-bold">-1</div><div className="text-[10px] text-[#2d1e16]">--:--</div>
                                </td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                                <td className="px-4 py-5 text-center text-[#2d1e16] font-bold">-</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-[#120a06] border-t border-[#2d1e16] gap-4">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-bold text-white">4</span> to <span className="font-bold text-white">8</span> of <span className="font-bold text-white">12,405</span> entries
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white bg-[#1a1310] border border-[#2d1e16] rounded-md hover:border-gray-500 transition-colors">Previous</button>
                            <button className="w-8 h-8 flex items-center justify-center text-sm font-bold text-white bg-[var(--color-primary)] rounded-md shadow-[0_0_10px_rgba(246,107,21,0.2)]">1</button>
                            <button className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2d1e16] rounded-md transition-colors">2</button>
                            <button className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2d1e16] rounded-md transition-colors">3</button>
                            <div className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500">...</div>
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white bg-[#1a1310] border border-[#2d1e16] rounded-md hover:border-gray-500 transition-colors">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LeaderboardPage;
