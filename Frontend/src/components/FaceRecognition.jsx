import React, { useEffect, useRef, useState } from 'react';
import { ScanFace } from 'lucide-react';

const FaceRecognition = ({ active, onViolation }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const [status, setStatus] = useState('Initializing...');
    const [statusDetail, setStatusDetail] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const failStartTime = useRef(null);

    // Store onViolation in a ref so we can call it without restarting the effect
    const onViolationRef = useRef(onViolation);
    useEffect(() => { onViolationRef.current = onViolation; }, [onViolation]);

    useEffect(() => {
        if (!active) return;

        let intervalId = null;
        let isMounted = true;

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (!isMounted) { stream.getTracks().forEach(t => t.stop()); return; }
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setStatus('Scanning...');
                console.log('[FaceRecognition] Camera started successfully');
            } catch (err) {
                console.error("[FaceRecognition] Camera access denied:", err);
                if (onViolationRef.current) onViolationRef.current('Camera access denied. Webcam is required for strict mode.');
            }
        };

        startCamera();

        // Poll the Python API every 1.5 seconds via HTTP
        const captureAndVerify = async () => {
            if (!videoRef.current || !canvasRef.current) return;
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg', 0.7);

            try {
                const response = await fetch('http://localhost:8000/verify-face', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: imageData })
                });

                if (!response.ok) return;
                const data = await response.json();

                if (!isMounted) return;

                if (data.status === 'success') {
                    failStartTime.current = null;
                    setIsVerified(true);
                    setStatus('Verified');
                    setStatusDetail(data.angles ? `R:${data.angles.roll}° Y:${data.angles.yaw}°` : '');
                } else if (data.status === 'warning') {
                    setIsVerified(false);

                    const reasonMap = {
                        'head_tilted': 'Tilted',
                        'looking_away': 'Looking Away',
                        'no_face': 'No Face',
                        'camera_blocked': 'Blocked',
                        'multiple_faces': 'Multiple Faces'
                    };
                    setStatus(reasonMap[data.reason] || 'Warning');
                    setStatusDetail(data.angles ? `R:${data.angles.roll}° Y:${data.angles.yaw}°` : data.message || '');

                    console.log(`[FaceRecognition] WARNING: ${data.reason} - ${data.message}`);

                    // 3-second grace period before logging a strike
                    if (!failStartTime.current) {
                        failStartTime.current = Date.now();
                        console.log('[FaceRecognition] Grace period started (3s)');
                    } else if (Date.now() - failStartTime.current >= 3000) {
                        console.log('[FaceRecognition] 3s elapsed → FIRING STRIKE');
                        if (onViolationRef.current) onViolationRef.current(data.message || 'Face violation detected.');
                        failStartTime.current = Date.now(); // Reset for next strike
                    }
                }
            } catch (error) {
                console.error("[FaceRecognition] API Error:", error);
            }
        };

        intervalId = setInterval(captureAndVerify, 1500);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [active]); // Only depends on active, NOT onViolation

    if (!active) return null;

    return (
        <div className="fixed bottom-6 left-6 w-48 bg-[#1a1310] border border-red-500/50 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] overflow-hidden z-50 flex flex-col">
            <div className="bg-red-500/10 border-b border-red-500/20 px-3 py-2 flex justify-between items-center">
                <span className="text-red-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                    <ScanFace size={12} /> Strict Mode
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            </div>

            <div className={`h-32 bg-black relative flex items-center justify-center transition-colors ${!isVerified ? 'bg-red-950/20' : ''}`}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transition-opacity ${!isVerified ? 'opacity-40 grayscale' : 'opacity-90'}`}
                />

                <canvas ref={canvasRef} width={320} height={240} className="hidden" />

                <div className="absolute inset-0 border-2 border-[var(--color-primary)]/30 rounded-lg m-2 pointer-events-none">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-primary)]"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--color-primary)]"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--color-primary)]"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--color-primary)]"></div>
                </div>

                <div className="absolute bottom-2 text-center w-full flex flex-col items-center gap-0.5">
                    <span className={`text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm ${isVerified ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
                        {status}
                    </span>
                    {statusDetail && (
                        <span className="text-[8px] text-gray-400 font-mono backdrop-blur-sm bg-black/50 px-1 rounded">
                            {statusDetail}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaceRecognition;
