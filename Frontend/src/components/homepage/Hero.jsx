import { useState, useEffect } from "react";
import { Swords } from "lucide-react";

const languageLogos = [
    { name: "Python", icon: "/icons/python.svg" },
    { name: "JavaScript", icon: "/icons/javascript.svg" },
    { name: "C++", icon: "/icons/cplusplus.svg" },
    { name: "Go", icon: "/icons/golang.svg" },
    { name: "Haskell", icon: "/icons/haskell.svg" },
    { name: "Kotlin", icon: "/icons/kotlin.svg" },
    { name: "C#", icon: "/icons/csharp.svg" },
    { name: "Java", icon: "/icons/java.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "PHP", icon: "/icons/php.svg" },
    { name: "Swift", icon: "/icons/swift.svg" },
    { name: "Rust", icon: "/icons/rust.svg" },
    { name: "C", icon: "/icons/c.svg" },
    { name: "Lua", icon: "/icons/lua.svg" },
    { name: "Ruby", icon: "/icons/ruby.svg" },
];

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden pt-24 lg:pt-36 pb-12">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(220,68,5,0.15), transparent 70%)",
                    }}
                />
                <div className="absolute inset-x-4 inset-y-1 rounded-3xl lg:rounded-[3rem] border border-white/10 overflow-hidden">
                    <div
                        className="h-full w-full"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(220,68,5,0.08) 0%, transparent 40%, rgba(220,68,5,0.05) 100%)",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/80" />
                </div>
            </div>

            {/* Hero content */}
            <div className="relative z-10 py-12 md:pb-24 lg:pb-28">
                <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-12">
                    <div className="mx-auto max-w-lg text-center lg:mx-0 lg:max-w-2xl lg:flex-1 lg:text-left">
                        {/* Badge */}
                        <a href="#early-access" className="inline-block mx-auto lg:mx-0">
                            <span className="ring-1 ring-white/30 no-underline group cursor-pointer relative shadow-2xl shadow-orange-600/50 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
                                <span className="absolute inset-0 overflow-hidden rounded-full">
                                    <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(75% 100% at 50% 0%, rgba(220,68,5,0.3) 0%, rgba(0,0,0,0.5) 75%)" }} />
                                </span>
                                <span className="relative flex space-x-2 items-center z-10 rounded-full py-0.5 px-4 ring-1 ring-white/20">
                                    <span>Reserve Your Spot</span>
                                    <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="#dc4405" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                </span>
                                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-orange-600/0 via-orange-600/90 to-orange-600/0 transition-opacity duration-500 group-hover:opacity-40" />
                            </span>
                        </a>

                        <h1 className="mt-8 max-w-2xl text-balance text-3xl font-medium text-white sm:text-3xl md:text-4xl lg:mt-6 lg:text-5xl">
                            Host and participate in online coding contests{" "}
                            <span className="bg-gradient-to-r from-osu to-osu-light text-transparent bg-clip-text font-serif">
                                in just a few clicks.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-pretty text-base text-white/70 sm:mt-8 sm:text-lg">
                            An open, self-hostable platform for competitive programming and online contests.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row lg:justify-start">
                            <a
                                href="#try-it"
                                className="bg-osu hover:bg-osu-light text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-osu/30 flex items-center gap-2"
                            >
                                Try It Now
                            </a>
                            <a
                                href="#features"
                                className="border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2"
                            >
                                Documentation
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17l9.2-9.2M17 17V8H8" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Demo terminal on right side */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <DemoTerminal />
                    </div>
                </div>
            </div>

            {/* Language logo carousel */}
            <div className="relative pb-6 select-none" aria-hidden>
                <div className="group relative m-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="inline md:max-w-52 md:border-r md:border-white/20 md:pr-6">
                            <p className="text-end text-sm text-gray-400">
                                Solve problems in all of the languages we know and love
                            </p>
                        </div>
                        <div className="relative overflow-hidden flex-1 py-4">
                            {/* Edge fade masks */}
                            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent" />
                            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent" />
                            <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
                                {[...languageLogos, ...languageLogos].map((lang, i) => (
                                    <div
                                        key={i}
                                        className="group/logo relative flex shrink-0 items-center gap-2.5 px-1"
                                        title={lang.name}
                                    >
                                        <img
                                            src={lang.icon}
                                            alt={lang.name}
                                            className="h-8 w-8 object-contain opacity-70 group-hover/logo:opacity-100 transition-opacity"
                                        />
                                        <span className="text-sm font-medium text-gray-400 group-hover/logo:text-white transition-colors">
                                            {lang.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DemoTerminal() {
    const [phase, setPhase] = useState("idle"); // idle, moving, clicking, running, done
    const [cursorPos, setCursorPos] = useState({ x: 80, y: 60 });
    const [logLines, setLogLines] = useState([]);
    const [stepStates, setStepStates] = useState(["pending", "pending", "pending", "pending"]);
    const [showResult, setShowResult] = useState(false);
    const [btnPressed, setBtnPressed] = useState(false);

    const steps = ["Source", "Build", "Execute", "Judge"];

    useEffect(() => {
        let timeouts = [];
        const t = (fn, ms) => { const id = setTimeout(fn, ms); timeouts.push(id); return id; };

        const runSequence = () => {
            // Reset
            setPhase("idle");
            setCursorPos({ x: 80, y: 60 });
            setLogLines([]);
            setStepStates(["pending", "pending", "pending", "pending"]);
            setShowResult(false);
            setBtnPressed(false);

            // Phase 1: Move cursor toward button
            t(() => {
                setPhase("moving");
                setCursorPos({ x: 340, y: 28 });
            }, 800);

            // Phase 2: Click the button
            t(() => {
                setPhase("clicking");
                setBtnPressed(true);
            }, 2200);
            t(() => setBtnPressed(false), 2500);

            // Phase 3: Start running — show log lines one by one
            t(() => {
                setPhase("running");
                setCursorPos({ x: 300, y: 120 });
            }, 2700);

            const lines = [
                { text: "$ codearena run solution.ts", color: "text-gray-300" },
                { text: "[INFO] Setting resource limits: 256MiB, 100% CPU", color: "text-osu" },
                { text: "[INFO] Running ts-node solution.ts", color: "text-osu" },
                { text: "[INFO] Init initialized successfully", color: "text-osu" },
            ];

            lines.forEach((line, i) => {
                t(() => setLogLines((prev) => [...prev, line]), 2800 + i * 400);
            });

            // Phase 4: Animate steps one by one
            const stepStart = 4600;
            steps.forEach((_, i) => {
                t(() => setStepStates((prev) => {
                    const n = [...prev];
                    n[i] = "running";
                    return n;
                }), stepStart + i * 700);

                t(() => setStepStates((prev) => {
                    const n = [...prev];
                    n[i] = "completed";
                    return n;
                }), stepStart + i * 700 + 500);
            });

            // Phase 5: Show result
            t(() => {
                setPhase("done");
                setShowResult(true);
            }, stepStart + 4 * 700 + 600);

            // Restart loop
            t(runSequence, stepStart + 4 * 700 + 3500);
        };

        runSequence();
        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="w-full max-w-xl rounded-xl border border-osu/40 bg-black/90 shadow-2xl shadow-osu/10 overflow-hidden relative">
            {/* Fake cursor */}
            <div
                className="absolute z-50 pointer-events-none transition-all ease-in-out"
                style={{
                    left: cursorPos.x,
                    top: cursorPos.y,
                    transitionDuration: phase === "moving" ? "1.2s" : "0.6s",
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.5 16.8829V0.867768L12.6045 12.3673H5.65376Z" fill="white" stroke="black" strokeWidth="1" />
                </svg>
            </div>

            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">CodeArena Judge</span>
                </div>
                <button
                    className={`text-[10px] font-semibold px-3 py-1 rounded transition-all ${btnPressed
                        ? "bg-osu/80 text-white scale-90"
                        : phase === "done"
                            ? "bg-osu/40 text-osu"
                            : "bg-osu text-white hover:bg-osu-light"
                        }`}
                    style={{ transition: "all 0.15s ease" }}
                >
                    ▶ Run
                </button>
            </div>

            {/* Terminal content */}
            <div className="p-5 font-mono text-sm space-y-2 min-h-[280px]">
                {logLines.map((line, i) => (
                    <p key={i} className={`${line.color} animate-fade-in-up`} style={{ animationDelay: `${i * 50}ms` }}>
                        {line.text}
                    </p>
                ))}

                {logLines.length >= 4 && (
                    <div className="mt-3 flex items-center gap-4 py-2">
                        {steps.map((step, i) => (
                            <div key={step} className="flex flex-col items-center gap-1">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${stepStates[i] === "completed"
                                        ? "bg-osu text-white scale-110"
                                        : stepStates[i] === "running"
                                            ? "bg-osu/50 text-white"
                                            : "bg-gray-800 text-gray-500"
                                        }`}
                                >
                                    {stepStates[i] === "completed" ? "✓" :
                                        stepStates[i] === "running" ? (
                                            <div className="w-3 h-3 rounded-full border-2 border-osu border-t-transparent animate-spin" />
                                        ) : "·"}
                                </div>
                                <span className={`text-[10px] transition-colors duration-300 ${stepStates[i] === "completed" ? "text-osu" : "text-gray-500"
                                    }`}>{step}</span>
                            </div>
                        ))}
                    </div>
                )}

                {showResult && (
                    <p className="text-emerald-400 mt-2 animate-fade-in-up font-semibold">
                        ✓ All test cases passed (4/4)
                    </p>
                )}

                {logLines.length === 0 && (
                    <div className="flex items-center justify-center h-[160px] text-gray-600">
                        <span className="text-xs">Click Run to execute...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
