import React, { useState } from 'react';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import { LoadingState } from '../types';

interface InputSectionProps {
  onAnalyze: (transcript: string) => void;
  loadingState: LoadingState;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, loadingState }) => {
  const [transcript, setTranscript] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;
    onAnalyze(transcript);
  };

  const isProcessing = loadingState === LoadingState.ANALYZING;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-base font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">1</span>
            떡상한 영상의 대본을 붙여넣으세요
          </label>
          <div className="relative group">
            <FileText className="absolute top-4 left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <textarea
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none h-48 custom-scrollbar text-sm leading-relaxed text-slate-800 placeholder:text-slate-400"
              placeholder="여기에 벤치마킹할 유튜브 영상의 전체 스크립트를 붙여넣으세요 (Ctrl+V)..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !transcript.trim()}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]
            ${isProcessing || !transcript.trim()
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30'
            }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              구조 분석 및 주제 추천받기...
            </>
          ) : (
            <>
              <Sparkles size={20} className="text-yellow-300" />
              분석하고 주제 추천받기 <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputSection;
