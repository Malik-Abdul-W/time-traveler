
export enum AppPhase {
  LANDING = 'LANDING',
  CAPTURE = 'CAPTURE',
  ANALYZING = 'ANALYZING',
  ERA_SELECTION = 'ERA_SELECTION',
  SYNTHESIZING = 'SYNTHESIZING',
  RESULT = 'RESULT'
}

export interface Era {
  id: string;
  name: string;
  description: string;
  prompt: string;
  thumbnail: string;
}

export interface AnalysisResult {
  features: string;
  style: string;
  genderEstimate: string;
  hairDescription: string;
}

export interface HistoryItem {
  id: string;
  imageUrl: string;
  era: string;
  timestamp: number;
}
