import { GoogleGenAI } from "@google/genai";

export const generateFinancialAdvice = async (question: string): Promise<string> => {
  // We access the API key here to ensure it is available at runtime.
  // This avoids issues where process.env might be undefined during module initialization.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work.");
    return "I cannot provide advice right now because the API configuration is missing. Please check your environment variables.";
  }

  try {
    // Create a new instance for every request to ensure the latest config/key is used.
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: "You are a helpful, knowledgeable, and cautious financial assistant. You explain tax concepts and financial planning principles clearly. Always include a disclaimer that you are an AI and this is not professional legal or financial advice.",
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};