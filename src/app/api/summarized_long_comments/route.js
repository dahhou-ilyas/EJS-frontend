import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { run } from '../utils/genAI';

const into_n_words = 200;
const long_comments_summarizer_prompt = `
        You are given a list of comments in various languages from youth expressing their thoughts about the previous live stream. Each comment provides feedback for the streamer doctor. The comments are provided in a single line, separated by dashes. Your task is to summarize these comments into a summary of AT MOST ${into_n_words} words that captures the essence of the original feedback and is relevant for the doctor to see.

        Instructions:

        1. **Input**: You will receive comments in different languages in a single line, separated by dashes. The input format
        the comments are either in french arabic or english the output is in french only

        2. **Output**: Provide a summary of the comments in FRENCH ONLY. The summary should:
        - Represent the core themes or concerns of the original feedback about the live stream.
        - Be clear, concise, and actionable for the streamer doctor.
        - Reflect the diversity of languages and topics.

        3. **Example Input**:
        J'ai adoré la manière dont le sujet a été traité! - أحببت الطريقة التي تناول بها الموضوع! - I loved how the topic was handled!

        4. **Example Output**:
        Les jeunes ont apprécié la manière dont le sujet a été traité.

        ### Additional Notes:

        - Ensure the summarized feedback is representative of the diverse set of original comments and is relevant for the doctor to address.
        - Do not include any header sentences or introductions; provide the summary directly.
        - If the provided comments are unclear, incomplete, or do not provide enough information, state "Informations insuffisantes" instead of attempting to summarize.`;



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
        
        const { long_comments } = await req.json();

        if (!long_comments || !Array.isArray(long_comments) || long_comments.length === 0) {
            return NextResponse.json({ error: 'Invalid or empty long_comments array' }, { status: 400 });
        }

        const input = long_comments.join(" - ");
        const summary = await run(long_comments_summarizer_prompt, input);

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Error in summarized_long_comments:', error);
        return NextResponse.json({ error: 'Failed to generate summarized long comments' }, { status: 500 });
    }
}
