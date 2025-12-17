export interface ScriptSection {
  heading: string;
  visualCue: string;
  audioScript: string;
}

export interface ViralAnalysis {
  hookStrategy: string;
  retentionTechniques: string[];
  emotionalArc: string;
  pacingStructure: string;
  callToActionType: string;
  suggestedTopics: string[]; // New field for AI suggestions
}

export interface ScriptResult {
  title: string;
  thumbnailIdea: string;
  sections: ScriptSection[];
}

export interface GeneratedResult {
  analysis: ViralAnalysis;
  newScript: ScriptResult;
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  AWAITING_TOPIC = 'AWAITING_TOPIC', // New state
  GENERATING_SCRIPT = 'GENERATING_SCRIPT', // New state
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
