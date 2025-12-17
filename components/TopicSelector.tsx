import React, { useState } from 'react';
import { ArrowRight, MessageSquarePlus, Star } from 'lucide-react';
import { LoadingState } from '../types';

interface TopicSelectorProps {
  suggestions: string[];
  onSelectTopic: (topic: string) => void;
  loadingState: LoadingState;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ suggestions, onSelectTopic, loadingState }) => {
  const [customTopic, setCustomTopic] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;
    onSelectTopic(customTopic);
  };

  const isGenerating = loadingState === LoadingState.GENERATING_SCRIPT;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8 animate-fade-in-up">
      
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">2</span>
          어떤 주제로 만들어볼까요?
        </h3>
        <p className="text-slate-500 text-sm ml-10">
          분석된 구조에 딱 맞는 주제들을 AI가 추천했습니다. 하나를 선택하거나 직접 입력하세요.
        </p>
      </div>

      {/* Suggested Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTopic(topic)}
            disabled={isGenerating}
            className="group relative p-4 text-left rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute top-4 right-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1 block">
              추천 {idx + 1}
            </span>
            <span className="text-slate-800 font-bold group-hover:text-indigo-700">
              {topic}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">또는 직접 입력</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      {/* Custom Topic Input */}
      <form onSubmit={handleCustomSubmit} className="relative">
        <div className="relative">
          <MessageSquarePlus className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" size={20} />
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            disabled={isGenerating}
            placeholder="원하는 다른 주제가 있다면 입력하세요..."
            className="w-full pl-12 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={!customTopic.trim() || isGenerating}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg font-medium text-sm transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isGenerating ? '생성 중...' : '생성하기'}
            {!isGenerating && <ArrowRight size={16} />}
          </button>
        </div>
      </form>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-slate-900">새로운 대본 생성 중...</h4>
              <p className="text-sm text-slate-500">선택한 주제로 구조를 재조립하고 있습니다.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicSelector;
