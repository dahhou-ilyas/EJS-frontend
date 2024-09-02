const express = require('express');
const app = express();
const port = 7777;

app.use(express.json());


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("API_KEY");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 0
    }
});

async function run(prompt, input) {
    const result = await model.generateContent(prompt + ` Here is your input: ${input}`);
    const response = result.response;
    const text = response.text();
    return text;
}

// QUESTIONS SUMMARIZER
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
            - {INDEX}. {QUESTION}?

        Additional Notes:
        - Ensure the summarized questions are representative of the diverse set of original queries and are relevant for a doctor to address.
        - Do not include any header sentences or introductions; provide the questions directly.
        - If the provided questions are unclear, incomplete, or do not provide enough information, state "Questions insuffisants" instead of attempting to summarize.`;


// LONG COMMENTS SUMMARIZER
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


// TOPICS SUMMARIZER
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



app.post('/summarized_questions', async (req, res) => {
    res.send(await run(questions_summarizer_prompt, req.body.questions.join(" - ")));
});


app.post('/summarized_long_comments', async (req, res) => {
    res.send(await run(long_comments_summarizer_prompt, req.body.long_comments.join(" - ")));
});


app.post('/summarized_topics', async (req, res) => {
    res.send(await run(topics_summarizer_prompt, req.body.topics.join(" - ")));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});