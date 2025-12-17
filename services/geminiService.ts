import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ViralAnalysis, ScriptResult } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

// Schema for Step 1: Analysis & Topic Suggestions
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hookStrategy: { type: Type.STRING, description: "The specific technique used in the first 15 seconds to grab attention." },
    retentionTechniques: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of 3-4 methods used to keep viewers watching." 
    },
    emotionalArc: { type: Type.STRING, description: "How the energy or emotion shifts throughout the video." },
    pacingStructure: { type: Type.STRING, description: "Description of the editing speed and structural rhythm." },
    callToActionType: { type: Type.STRING, description: "How and when the creator asks for engagement." },
    suggestedTopics: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5 creative and viral-worthy new topics/ideas that would fit this specific video structure perfectly. Output in Korean."
    }
  },
  required: ["hookStrategy", "retentionTechniques", "emotionalArc", "pacingStructure", "callToActionType", "suggestedTopics"]
};

// Schema for Step 2: Script Generation
const scriptSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A click-worthy title for the new video." },
    thumbnailIdea: { type: Type.STRING, description: "A concept for the thumbnail." },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          heading: { type: Type.STRING, description: "Section header." },
          visualCue: { type: Type.STRING, description: "Detailed visual instructions." },
          audioScript: { type: Type.STRING, description: "The spoken words." }
        },
        required: ["heading", "visualCue", "audioScript"]
      }
    }
  },
  required: ["title", "thumbnailIdea", "sections"]
};

// Step 1: Analyze Transcript
export const analyzeTranscript = async (originalTranscript: string): Promise<ViralAnalysis> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are an expert YouTube strategist.
    
    TASK:
    1. Analyze the provided "Original Viral Transcript" to identify its winning formula.
    2. Suggest 5 NEW, CREATIVE TOPICS that would work perfectly with this exact structure.
    
    INPUT:
    - Original Transcript: "${originalTranscript}"
    
    REQUIREMENTS:
    - The analysis and topics must be in KOREAN.
    - The suggested topics should be diverse (different niches or angles) but suitable for the transcript's format (e.g., if it's a storytelling format, suggest story topics).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7,
      }
    });

    if (!response.text) throw new Error("No response from Gemini");
    return JSON.parse(response.text) as ViralAnalysis;
  } catch (error) {
    console.error("Error analyzing transcript:", error);
    throw error;
  }
};

// Step 2: Generate Script
export const generateScript = async (originalTranscript: string, chosenTopic: string, analysis: ViralAnalysis): Promise<ScriptResult> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    You are an expert YouTube scriptwriter.
    
    TASK:
    Write a COMPLETELY NEW script about the "Chosen Topic" by strictly following the structural formula of the "Original Transcript".
    
    INPUTS:
    - Chosen Topic: "${chosenTopic}"
    - Original Transcript (Structure Reference): "${originalTranscript}"
    - Structural Analysis: ${JSON.stringify(analysis)}
    
    REQUIREMENTS:
    - Mimic the pacing, sentence length, and energy of the original.
    - If the original uses a specific hook style (e.g., a question, a shocking statement), use the same style for the new topic.
    - Output in KOREAN (Hangul).
    - Provide detailed visual cues for the editor.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: scriptSchema,
        temperature: 0.7,
      }
    });

    if (!response.text) throw new Error("No response from Gemini");
    return JSON.parse(response.text) as ScriptResult;
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};
