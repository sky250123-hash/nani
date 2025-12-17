import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { Copy, Check, Video, Camera, Mic } from 'lucide-react';

interface ScriptOutputProps {
  data: GeneratedResult['newScript'];
}

const ScriptOutput: React.FC<ScriptOutputProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = data.sections.map(s => `[${s.heading}]\n(Visual: ${s.visualCue})\nAudio: ${s.audioScript}\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Script Header */}
      <div className="bg-slate-900 text-white px-6 py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Video size={120} />
        </div>
        <div className="relative z-10">
          <div className="inline-block px-2 py-1 bg-indigo-500 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
            Generated Script
          </div>
          <h2 className="text-2xl font-bold leading-tight mb-2">{data.title}</h2>
          <p className="text-indigo-200 text-sm flex items-start gap-2">
            <Camera size={16} className="mt-0.5 shrink-0" />
            <span className="font-medium">Thumbnail Idea:</span> {data.thumbnailIdea}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-slate-200 px-6 py-3 flex justify-between items-center bg-slate-50">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Script Content
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-200 text-slate-600"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>

      {/* Script Body */}
      <div className="p-6 space-y-8 overflow-y-auto max-h-[800px] custom-scrollbar bg-white">
        {data.sections.map((section, idx) => (
          <div key={idx} className="relative pl-8 border-l-2 border-indigo-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-100 border-2 border-indigo-500"></div>
            
            <div className="mb-4">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-1">
                {section.heading}
              </h3>
              
              {/* Visual Cue Box */}
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mb-3">
                <div className="flex items-start gap-2">
                  <Camera size={14} className="text-slate-400 mt-1 shrink-0" />
                  <p className="text-xs text-slate-500 font-medium italic">
                    {section.visualCue}
                  </p>
                </div>
              </div>

              {/* Audio Script */}
              <div className="flex gap-3">
                <div className="mt-1 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Mic size={16} />
                  </div>
                </div>
                <p className="text-slate-800 text-base leading-7 font-medium whitespace-pre-line">
                  {section.audioScript}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* End of Script Marker */}
        <div className="flex justify-center py-4 opacity-50">
          <div className="w-16 h-1 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ScriptOutput;
