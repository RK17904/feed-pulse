import {GoogleGenAI} from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

//gemini SDk from .env
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY as string});

export interface AIAnalysisResult{
    category: string;
    sentiment: 'Positive'|'Neutral'|'Negative';
    priority_score:number;
    summary:string;
    tags:string[];
}

export const analyzeFeedbackWithAI = async (title:string, description:string): Promise<AIAnalysisResult | null> =>{
    try{
        //prompt structure
        const prompt = `
            Analyse this product feedback. Return ONLY valid JSON with these exact fields:
            - "category": (Choose one: "Bug", "Feature Request", "Improvement", "Other")
            - "sentiment": (Choose one: "Positive", "Neutral", "Negative")
            - "priority_score": (Integer from 1 to 10)
            - "summary": (A concise 1-sentence summary)
            - "tags": (Array of 2-4 short string tags)

            Feedback Title: "${title}"
            Feedback Description: "${description}"
        `;
        const response = await ai.models.generateContent({
            model:'gemini-1.5-flash',
            contents:prompt,
            config:{
                //model return clean json string
                responseMimeType:'application/json',
            
            }
        });
        const textResponse = response.text;        
        if(!textResponse){
            throw new Error('No text returned from GEmini');
        }
        //parse json string
        //to ts interface
        const parsedData: AIAnalysisResult= JSON.parse(textResponse);
        return parsedData;

        }catch(error){
        console.error('Gemini AI analysis failed:', error);
        return null;
    }
};
