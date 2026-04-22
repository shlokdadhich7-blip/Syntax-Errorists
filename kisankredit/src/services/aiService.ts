import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface EligibilityResult {
  eligibility: "High" | "Medium" | "Low";
  estimatedAmount: number;
  explanation: string;
}

export const estimateEligibility = async (
  landOwned: number,
  annualIncome: number,
  existingLoans: number
): Promise<EligibilityResult> => {
  try {
    const prompt = `Assess loan eligibility for a farmer with the following details:
    - Land Owned: ${landOwned} acres
    - Annual Income: ₹${annualIncome}
    - Existing Loans: ₹${existingLoans}
    
    Return the result in JSON format with exactly these fields:
    - eligibility: "High", "Medium", or "Low"
    - estimatedAmount: a suggested numerical loan amount in ₹
    - explanation: exactly 2 sentences explaining the reasoning.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eligibility: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            estimatedAmount: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
          },
          required: ["eligibility", "estimatedAmount", "explanation"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as EligibilityResult;
  } catch (error) {
    console.error("AI Estimation failed", error);
    // Fallback logic
    return {
      eligibility: "Medium",
      estimatedAmount: (landOwned * 50000) + (annualIncome * 0.3),
      explanation: "Estimation based on standard agricultural credit norms. Your land ownership and income levels suggest a moderate credit capacity."
    };
  }
};
