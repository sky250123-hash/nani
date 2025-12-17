import React from 'react';
import { Sparkles, Youtube } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-red-600 to-red-500 p-2 rounded-lg text-white shadow-lg shadow-red-500/20">
            <Youtube size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Viral<span className="text-red-600">Remixer</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">떡상 영상 분석기</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          <Sparkles size={16} className="text-amber-500" />
          <span>Powered by Gemini 2.5</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
