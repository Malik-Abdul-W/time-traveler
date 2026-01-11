
import React, { useState, useCallback } from 'react';
import { AppPhase, Era, AnalysisResult } from './types';
import Layout from './components/Layout';
import CameraView from './components/CameraView';
import EraSelection from './components/EraSelection';
import ProcessingOverlay from './components/ProcessingOverlay';
import ResultView from './components/ResultView';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.LANDING);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startJourney = () => setPhase(AppPhase.CAPTURE);

  const handleCapture = async (base64: string) => {
    setUserPhoto(base64);
    setPhase(AppPhase.ANALYZING);
    setError(null);
    try {
      const result = await geminiService.analyzeUserPhoto(base64);
      setAnalysis(result);
      setPhase(AppPhase.ERA_SELECTION);
    } catch (err) {
      console.error(err);
      setError("The chronological link failed to analyze. Please try another photo.");
      setPhase(AppPhase.CAPTURE);
    }
  };

  const handleEraSelection = async (era: Era) => {
    if (!userPhoto || !analysis) return;
    setSelectedEra(era);
    setPhase(AppPhase.SYNTHESIZING);
    setError(null);
    try {
      const generated = await geminiService.transformImage(userPhoto, era.prompt, analysis);
      setResultImage(generated);
      setPhase(AppPhase.RESULT);
    } catch (err) {
      console.error(err);
      setError("Dimensional collapse detected. Unable to synthesize era.");
      setPhase(AppPhase.ERA_SELECTION);
    }
  };

  const reset = () => {
    setPhase(AppPhase.LANDING);
    setUserPhoto(null);
    setAnalysis(null);
    setSelectedEra(null);
    setResultImage(null);
    setError(null);
  };

  return (
    <Layout>
      {error && (
        <div className="max-w-xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center text-sm">
          {error}
        </div>
      )}

      {phase === AppPhase.LANDING && (
        <div className="max-w-3xl mx-auto text-center py-20 space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-header font-bold leading-tight">
              Beyond the <br />
              <span className="gradient-text italic font-serif">Horizon of Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-xl mx-auto font-light leading-relaxed">
              Synthesize your likeness into forgotten dynasties and neon futures through the power of multi-modal AI.
            </p>
          </div>

          <button 
            onClick={startJourney}
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-header font-bold text-xl rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            INITIALIZE PROJECTION
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3} />
            </svg>
          </button>

          <div className="grid grid-cols-3 gap-8 pt-20 border-t border-white/5">
            <div>
              <div className="text-3xl font-header text-amber-500 mb-2">01.</div>
              <div className="text-sm font-bold uppercase tracking-widest mb-1">Mirror</div>
              <div className="text-xs text-white/40">Analyze your features with Gemini 3 Pro.</div>
            </div>
            <div>
              <div className="text-3xl font-header text-amber-500 mb-2">02.</div>
              <div className="text-sm font-bold uppercase tracking-widest mb-1">Voyage</div>
              <div className="text-xs text-white/40">Select your era from across eons.</div>
            </div>
            <div>
              <div className="text-3xl font-header text-amber-500 mb-2">03.</div>
              <div className="text-sm font-bold uppercase tracking-widest mb-1">Behold</div>
              <div className="text-xs text-white/40">Witness your legacy in the new timeline.</div>
            </div>
          </div>
        </div>
      )}

      {phase === AppPhase.CAPTURE && (
        <CameraView onCapture={handleCapture} />
      )}

      {phase === AppPhase.ANALYZING && (
        <ProcessingOverlay 
          title="DECODING IDENTITY" 
          subtitle="Extracting biometric signals and historical resonance..."
        />
      )}

      {phase === AppPhase.ERA_SELECTION && (
        <EraSelection onSelect={handleEraSelection} />
      )}

      {phase === AppPhase.SYNTHESIZING && (
        <ProcessingOverlay 
          title="SYNTHESIZING REALITY" 
          subtitle={`Projecting your form into the ${selectedEra?.name || 'chosen era'}...`}
        />
      )}

      {phase === AppPhase.RESULT && resultImage && selectedEra && (
        <ResultView 
          imageUrl={resultImage} 
          era={selectedEra} 
          onRestart={reset}
          onImageUpdated={setResultImage}
        />
      )}
    </Layout>
  );
};

export default App;
