
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAssistantResponse = async (query: string, products: Product[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Query: "${query}"\n\nAvailable Products Context:\n${JSON.tsxifyProducts(products)}\n\nYou are a helpful shopping assistant for Gemini Commerce Hub. Help the user find products, explain their benefits, or compare them. Keep your answers concise and friendly.`,
      config: {
        systemInstruction: "You are a professional retail consultant. If a user asks for something we don't have, politely suggest the closest match or explain we don't stock it yet."
      }
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently unavailable. Please try again later.";
  }
};

export const getDetailedProductReview = async (product: Product) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, persuasive marketing pitch for this product: ${product.name}. Description: ${product.description}. Price: $${product.price}. Use bullet points for key selling features.`,
    });
    return response.text || "No AI pitch available.";
  } catch (error) {
    return "Error fetching AI highlights.";
  }
};

const JSON = {
  tsxifyProducts: (products: Product[]) => {
    return products.map(p => `- ${p.name} ($${p.price}): ${p.description}`).join('\n');
  }
};
