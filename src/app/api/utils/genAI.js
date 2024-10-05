import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 0,
    },
});

export async function run(prompt, input) {
    const result = await model.generateContent(`${prompt} Here is your input: ${input}`);
    const response = result.response;
    const text = response.text();
    return text;
}