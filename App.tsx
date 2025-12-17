import React, { useState, useRef } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import TopicSelector from './components/TopicSelector';
import AnalysisResult from './components/AnalysisResult';
import ScriptOutput from './components/ScriptOutput';
import { analyzeTranscript, generateScript } from './services/geminiService';
import { ViralAnalysis, ScriptResult, LoadingState } from './types';
import { AlertCircle, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  
  // State for Step 1
  const [originalTranscript, setOriginalTranscript] = useState<string>('');
  const [analysisData, setAnalysisData] = useState<ViralAnalysis | null>(null);
  
  // State for Step 2
  const [finalScript, setFinalScript] = useState<ScriptResult | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  
  const analysisRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);

  // Step 1: Analyze
  const handleAnalyze = async (transcript: string) => {
    setLoadingState(LoadingState.ANALYZING);
    setError(null);
    setOriginalTranscript(transcript);
    setAnalysisData(null);
    setFinalScript(null);

    try {
      const result = await analyzeTranscript(transcript);
      setAnalysisData(result);
      setLoadingState(LoadingState.AWAITING_TOPIC);
      
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("대본 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  // Step 2: Generate Script
  const handleSelectTopic = async (topic: string) => {
    if (!originalTranscript || !analysisData) return;

    setLoadingState(LoadingState.GENERATING_SCRIPT);
    setError(null);

    try {
      const result = await generateScript(originalTranscript, topic, analysisData);
      setFinalScript(result);
      setLoadingState(LoadingState.COMPLETE);
      
      setTimeout(() => {
        scriptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("대본 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setLoadingState(LoadingState.AWAITING_TOPIC); // Go back to topic selection on error
    }
  };

  const handleReset = () => {
    setLoadingState(LoadingState.IDLE);
    setOriginalTranscript('');
    setAnalysisData(null);
    setFinalScript(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro */}
        {loadingState === LoadingState.IDLE && (
          <div className="text-center max-w-2xl mx-auto py-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              떡상한 영상의 <span className="text-indigo-600">DNA</span>를 복제하세요
            </h2>
            <p className="text-lg text-slate-600">
              잘 터진 영상의 구조를 분석하고, AI가 제안하는 새로운 주제로 다시 태어납니다.
            </p>
          </div>
        )}

        {/* Step 1: Input Section (Always visible until reset, but maybe collapsed or read-only later? Let's keep it simple) */}
        {loadingState === LoadingState.IDLE || loadingState === LoadingState.ANALYZING || loadingState === LoadingState.ERROR ? (
          <div className="max-w-3xl mx-auto">
            <InputSection onAnalyze={handleAnalyze} loadingState={loadingState} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">✓</div>
                <span className="text-slate-700 font-medium truncate max-w-[200px] sm:max-w-md">
                   원본 대본 분석 완료
                </span>
             </div>
             <button onClick={handleReset} className="text-sm text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1">
               <RefreshCcw size={14} /> 처음으로
             </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Step 2 Area: Analysis + Topic Selection */}
        {analysisData && (
          <div ref={analysisRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
            
            {/* Left: Analysis Result */}
            <div className="lg:col-span-5 space-y-6">
              <AnalysisResult analysis={analysisData} />
            </div>

            {/* Right: Topic Selector or Final Script */}
            <div className="lg:col-span-7 space-y-6">
              {/* Show Topic Selector if we haven't generated the script yet OR if we are regenerating */}
              {loadingState !== LoadingState.COMPLETE && (
                <TopicSelector 
                  suggestions={analysisData.suggestedTopics} 
                  onSelectTopic={handleSelectTopic}
                  loadingState={loadingState}
                />
              )}

              {/* Show Final Script once complete */}
              {finalScript && (
                <div ref={scriptRef}>
                  <ScriptOutput data={finalScript} />
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => {
                        setFinalScript(null);
                        setLoadingState(LoadingState.AWAITING_TOPIC);
                        setTimeout(() => {
                          analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline underline-offset-4"
                    >
                      다른 주제로 다시 만들기
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Viral Script Remixer. Built with Gemini 2.5 Flash & React.
        </div>
      </footer>
    </div>
  );
};

export default App;
