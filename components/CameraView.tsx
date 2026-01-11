
import React, { useRef, useState, useCallback, useEffect } from 'react';

interface CameraViewProps {
  onCapture: (base64: string) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1080 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Camera access denied. Please ensure you have given permission.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const size = Math.min(videoRef.current.videoWidth, videoRef.current.videoHeight);
        canvasRef.current.width = size;
        canvasRef.current.height = size;
        
        // Center crop
        const startX = (videoRef.current.videoWidth - size) / 2;
        const startY = (videoRef.current.videoHeight - size) / 2;
        
        context.drawImage(videoRef.current, startX, startY, size, size, 0, 0, size, size);
        const base64 = canvasRef.current.toDataURL('image/jpeg', 0.85).split(',')[1];
        onCapture(base64);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        onCapture(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-header font-bold text-amber-500">Capture Your Soul</h2>
        <p className="text-white/60">A clear, well-lit portrait works best for chronological anchoring.</p>
      </div>

      <div className="relative aspect-square rounded-3xl overflow-hidden glass border-2 border-white/10 shadow-2xl">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={startCamera}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover mirror"
          />
        )}
        
        {/* Overlay frame */}
        <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full border-2 border-amber-500/30 rounded-[10%]"></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={handleCapture}
          disabled={!!error}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 rounded-2xl text-black font-bold text-lg shadow-xl shadow-amber-900/40 transition-all active:scale-95 disabled:opacity-50"
        >
          STEP INTO THE VOID
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0c0c0e] px-2 text-white/30 tracking-widest">Or Upload</span></div>
        </div>

        <label className="w-full py-4 flex items-center justify-center gap-2 glass rounded-2xl hover:bg-white/5 cursor-pointer transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>Choose a file</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
        </label>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraView;
