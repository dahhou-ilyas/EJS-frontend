import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { run } from '../utils/genAI';

const into_n_questions = 10;
const questions_summarizer_prompt = `
        You are given a list of questions in various languages related to a specific medical or health topic. Each question seeks detailed information or advice from a doctor about the topic. The questions are provided in a single line, separated by dashes. Your task is to summarize these questions into AT MOST ${into_n_questions} representative questions in French that capture the essence of the original queries and are relevant for a doctor to address. You need to infer the language of each question from the content.
        
        Instructions:

        1. Input: You will receive questions in different languages in a single line, separated by dashes.The input format is:
        Question1 - Question2 - Question3 - ...

        2. Output: Provide AT MOST ${into_n_questions} summarized questions in FRENCH ONLY.Each question should:
        - Represent the core themes or concerns of the original questions about the specific medical or health topic.
        - Be clear, concise, and actionable for a medical professional.
        - Reflect the diversity of languages and topics.

        3. Example Input:
        What are the most effective treatments for anxiety ? - ¿Cuáles son las mejores prácticas para manejar el estrés ? - Quels sont les symptômes de la dépression et comment les traiter ? - Wie kann ich meine Gesundheit am besten pflegen ?

        4. Example Output:
            1. Quels sont les traitements les plus efficaces pour l'anxiété ?
            2. Quelles sont les meilleures pratiques pour gérer le stress ?
            3. Quels sont les symptômes de la dépression et comment peuvent - ils être traités ?
            4. Comment puis - je maintenir au mieux ma santé mentale ?

        5. Question Formatting:
            "{INDEX}. {QUESTION}? - {INDEX}. {QUESTION}? - {INDEX}. {QUESTION}? - ..."

        Additional Notes:
        - Ensure the summarized questions are representative of the diverse set of original queries and are relevant for a doctor to address.
        - Do not include any header sentences or introductions; provide the questions directly.
        - If the provided questions are unclear, incomplete, or do not provide enough information, state "Questions insuffisants" instead of attempting to summarize.`;


export async function POST(req) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
        }

        const { questions } = await req.json();

        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return NextResponse.json({ error: 'Invalid or empty questions array' }, { status: 400 });
        }

        const input = questions.join(" - ");
        const summary = await run(questions_summarizer_prompt, input);

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Error in summarized_questions:', error);
        return NextResponse.json({ error: 'Failed to generate summarized questions' }, { status: 500 });
    }
}