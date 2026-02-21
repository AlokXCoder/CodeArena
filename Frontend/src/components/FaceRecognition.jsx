import React, { useEffect } from 'react';
import { ScanFace, AlertTriangle } from 'lucide-react';

// Placeholder for the external Face Recognition module.
// When the absolute path to the actual algorithm is provided by the user, we will replace this dummy logic.
const FaceRecognition = ({ active }) => {

    useEffect(() => {
        if (!active) return;
        // This is where we would mount navigator.mediaDevices.getUserMedia() 
        // to stream the webcam to a <video> element and start the Python/JS model polling.
        const interval = setInterval(() => {
            console.log("[FACE RECOGNITION API]: Scanning... User verified.");
        }, 5000);

        return () => clearInterval(interval);
    }, [active]);

    if (!active) return null;

    return (
        <div className="fixed bottom-6 left-6 w-48 bg-[#1a1310] border border-red-500/50 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] overflow-hidden z-50 flex flex-col">
            <div className="bg-red-500/10 border-b border-red-500/20 px-3 py-2 flex justify-between items-center">
                <span className="text-red-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                    <ScanFace size={12} /> Strict Mode
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            </div>

            {/* Webcam Feed Placeholder */}
            <div className="h-32 bg-black relative flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-[var(--color-primary)]/30 rounded-lg m-2 pointer-events-none">
                    {/* Corner accents representing face box targeting */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-primary)]"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--color-primary)]"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--color-primary)]"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--color-primary)]"></div>
                </div>

                <UserSilhouette />

                <div className="absolute bottom-2 text-center w-full">
                    <span className="bg-green-500/90 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm">
                        Verified
                    </span>
                </div>
            </div>
        </div>
    );
};

// simple svg silhouette
const UserSilhouette = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4a2311" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export default FaceRecognition;
