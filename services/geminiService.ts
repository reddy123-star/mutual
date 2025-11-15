
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI Assistant will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = `You are an expert financial educator specializing in mutual funds. Your goal is to provide clear, accurate, and unbiased information to help users understand complex financial topics.

- Explain concepts in simple terms.
- Use analogies to clarify difficult ideas.
- When asked about a specific type of fund, explain its general characteristics, potential risks, and who it might be suitable for.
- **IMPORTANT**: Do not provide personalized financial advice, recommend specific funds, or predict market performance. Always include a disclaimer that users should consult with a qualified financial advisor before making any investment decisions.
- Structure your answers for readability with headings, lists, and bold text.`;

export const analyzeInvestmentQuery = async (query: string): Promise<string> => {
  if (!API_KEY) {
    return "The AI assistant is currently unavailable. Please check the API key configuration.";
  }
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: query,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
            topP: 0.95,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};
