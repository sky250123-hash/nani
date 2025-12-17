import React from 'react';
import { ViralAnalysis } from '../types';
import { Zap, HeartPulse, Timer, MousePointer2 } from 'lucide-react';

interface AnalysisResultProps {
  analysis: ViralAnalysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Zap className="text-amber-500" size={20} />
          떡상 포인트 분석 (Viral Formula)
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Hook */}
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2 text-indigo-800 font-semibold text-sm uppercase tracking-wider">
            <MousePointer2 size={16} />
            초반 훅 (Hook)
          </div>
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            "{analysis.hookStrategy}"
          </p>
        </div>

        {/* Pacing */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <div className="flex items-center gap-2 mb-2 text-emerald-800 font-semibold text-sm uppercase tracking-wider">
            <Timer size={16} />
            호흡 및 편집 박자
          </div>
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            "{analysis.pacingStructure}"
          </p>
        </div>

        {/* Emotional Arc */}
        <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 md:col-span-2">
          <div className="flex items-center gap-2 mb-2 text-rose-800 font-semibold text-sm uppercase tracking-wider">
            <HeartPulse size={16} />
            감정선 흐름
          </div>
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            {analysis.emotionalArc}
          </p>
        </div>

        {/* Retention Techniques */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 md:col-span-2">
          <div className="mb-3 text-slate-500 font-semibold text-sm uppercase tracking-wider">
            이탈 방지 장치 (Retention)
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.retentionTechniques.map((tech, idx) => (
              <span key={idx} className="bg-white border border-slate-300 px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                #{tech}
              </span>
            ))}
            <span className="bg-white border border-slate-300 px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm">
              CTA: {analysis.callToActionType}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisResult;
