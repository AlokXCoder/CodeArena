import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Timer, AlertCircle } from 'lucide-react';
import ProblemDescription from './ProblemDescription';
import CodeEditorPane from './CodeEditorPane';
import ConsoleTestCasePane from './ConsoleTestCasePane';
import FaceRecognition from './FaceRecognition';

const CodingWorkspace = () => {
    const { problemId, contestId } = useParams();
    const [problem, setProblem] = useState(null);
    const [contest, setContest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const fetchWorkspaceData = async () => {
            try {
                // Fetch Problem Data
                if (problemId) {
                    const res = await fetch(`http://localhost:5000/api/problems/${problemId}`);
                    if (res.ok) setProblem(await res.json());
                }

                // Fetch Contest Data if in contest mode
                if (contestId) {
                    const cres = await fetch(`http://localhost:5000/api/contests/${contestId}`);
                    if (cres.ok) {
                        const cdata = await cres.json();
                        setContest(cdata);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch coding data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkspaceData();
    }, [problemId, contestId]);

    // Timer Logic for Contests
    useEffect(() => {
        if (!contest) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(contest.endTime).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft("CONTEST ENDED");
                return;
            }

            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [contest]);

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center h-full bg-[#120a06]">
                <div className="text-[var(--color-primary)] animate-pulse font-bold text-xl">Loading Workspace...</div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="flex-1 flex justify-center items-center h-full bg-[#120a06] text-red-500 font-bold">
                <AlertCircle size={24} className="mr-2" /> Problem not found or incorrect ID.
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#120a06]">

            {/* Contest Header Toolbar */}
            {contest && (
                <div className="bg-[#1a1310] border-b border-[#2d1e16] px-4 py-2 flex justify-between items-center shadow-lg z-10">
                    <div className="flex items-center gap-3">
                        <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Live Contest</span>
                        <span className="text-white font-bold text-sm">{contest.title}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#2a1a10] text-[var(--color-primary)] px-4 py-1.5 rounded-md font-mono font-bold text-lg border border-[#4a2311] shadow-[0_0_15px_rgba(246,107,21,0.2)]">
                        <Timer size={18} />
                        {timeLeft || '00:00:00'}
                    </div>
                </div>
            )}

            <div className="flex-1 flex gap-2 p-2 h-full overflow-hidden">
                {/* Left Pane: Problem Description */}
                <div className="flex-1 max-w-[50%] min-w-[30%] h-full flex flex-col">
                    <ProblemDescription problem={problem} />
                </div>

                {/* Right Pane: Code Editor and Console */}
                <div className="flex-1 flex flex-col gap-2 h-full">
                    <CodeEditorPane />
                    <ConsoleTestCasePane testCases={problem.testCases} />
                </div>
            </div>

            {/* Strict Validation Face Recognition Wrapper */}
            {contest?.strictValidation && <FaceRecognition active={true} />}

        </div>
    );
};

export default CodingWorkspace;
