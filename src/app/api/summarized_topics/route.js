import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { run } from '../utils/genAI';

const topics_summarizer_prompt = `
        You are given a list of proposed topics in various languages for future health live streams. Your task is to categorize these topics into semantically related categories for the admin to see. Each category should contain topics that are closely related to each other.

        ### Instructions:

        1. **Input**: You will receive a list of topics proposed for future health live streams. The input format is:
        Topic1 - Topic2 - Topic3 - ...

        2. **Output**: Provide a categorized list of topics. Each category should have a title in FRENCH ONLY and include topics in FRENCH ONLY that are semantically related to each other, formatted as a JSON structure, all in FRENCH ONLY.

        3. **Example Input**:
        Understanding Nutrition Labels - Healthy Eating on a Budget - Healthy Eating for Busy Schedules - The Impact of Sleep on Health - Managing Stress and Anxiety - Building Resilience - Understanding Mental Health Disorders - The Connection Between Mental and Physical Health - The Benefits of Regular Exercise - The Importance of Hydration - The Effects of Caffeine on Health - Importance of Regular Check-Ups - Digital Detox - Preventing Substance Abuse - Understanding Food Allergies and Intolerances - The Effects of Sedentary Lifestyle - Healthy Relationships - Safe Internet Use and Online Safety - Understanding and Preventing Eating Disorders - The Impact of Peer Pressure on Health - The Importance of Work-Life Balance - How to Build a Support Network - Tips for a Healthy School-Life Balance - Healthy Cooking Tips and Tricks

        4. **Example Output**:
        json
        [
            {
                "category": "...",
                "topics": [
                    "...",
                    "...",
                    "..."
                ]
            },
            {
                "category": "...",
                "topics": [
                    "...",
                    "...",
                    "...",
                    "...",
                    "..."
                ]
            },
            ...
        ]
        Additional Notes:
        Ensure the categorized topics are representative of the diverse set of original propositions and are relevant for future health live streams.
        Do not include any header sentences or introductions; provide the categories and topics directly.
        If the provided topics are unclear, incomplete, or do not provide enough information to categorize, state "Propositions insuffisantes" instead of attempting to categorize.`;


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

        const { topics } = await req.json();

        if (!topics || !Array.isArray(topics) || topics.length === 0) {
            return NextResponse.json({ error: 'Invalid or empty topics array' }, { status: 400 });
        }

        const input = topics.join(" - ");
        const summary = await run(topics_summarizer_prompt, input);

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Error in summarized_topics:', error);
        return NextResponse.json({ error: 'Failed to generate summarized topics' }, { status: 500 });
    }
}
