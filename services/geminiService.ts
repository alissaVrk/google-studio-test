import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY;

// Singleton instance to avoid re-creation
let ai: GoogleGenAI | null = null;

const getAIInstance = (): GoogleGenAI => {
  if (!ai) {
    if (!apiKey) {
      console.warn("API Key is missing. Chat functionality will not work.");
    }
    ai = new GoogleGenAI({ apiKey: apiKey || '' });
  }
  return ai;
};

export const createCatChat = (catName: string, personality: string): Chat => {
  const instance = getAIInstance();
  
  const systemInstruction = `
    You are acting as a cat named ${catName}. 
    Personality traits: ${personality}.
    
    Guidelines:
    1. Respond in character as a cat.
    2. Be slightly sassy but ultimately affectionate.
    3. Mention typical cat things like napping, chasing lasers, birds, and demanding food.
    4. Occasionally use "meow" or purring sounds in text (e.g., *purrr*).
    5. Keep responses concise (under 3-4 sentences usually) unless telling a story.
    6. If asked about technical things, pretend not to understand or relate it to cat logic.
  `;

  return instance.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
      temperature: 1.2, // Higher temperature for more creative/random cat behavior
    },
  });
};

export type StreamCallback = (chunkText: string) => void;

export const sendMessageToCat = async (
  chat: Chat, 
  message: string, 
  onStream: StreamCallback
): Promise<string> => {
  try {
    const result = await chat.sendMessageStream({ message });
    
    let fullText = '';
    
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        fullText += c.text;
        onStream(c.text);
      }
    }
    
    return fullText;
  } catch (error) {
    console.error("Error talking to the cat:", error);
    throw error;
  }
};
