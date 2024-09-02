const axios = require('axios');

async function sendQuestionsRequest() {
    const config = {
        method: 'post',
        url: 'http://localhost:7777/summarized_questions',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            questions: [
                // French
                "C'est quoi les signes de dépression chez les jeunes ?",
                "Comment on aide un pote qui est trop déprimé ?",
                "Les bienfaits du sport sur la santé mentale, ça donne quoi ?",
                "La méditation, ça marche vraiment pour le stress ou c'est du bla-bla ?",
                "Pourquoi je me sens toujours fatigué ?",
                "Les réseaux sociaux, c'est vraiment mauvais pour la santé mentale ?",
                "Comment gérer le stress de l'école ? Je suis trop stressé.",
                "Mes problèmes de sommeil, c'est grave ?",
                "Comment gérer les disputes avec les parents ? Je pète un plomb.",
                "C'est quoi le burn-out ? Ça me fait peur.",
                "Comment mieux dormir ? Je suis toujours crevé.",
                "Quand je suis stressé, je mange tout le temps, c'est normal ?",
                "J'ai peur de parler en public, comment je surmonte ça ?",
                "Les médicaments pour l'anxiété, c'est dangereux ou pas ?",
                "Pourquoi je stresse avant les exams ?",
                "Les jeux vidéo, ça rend accro ?",
                "Je suis souvent triste sans raison, c'est normal ?",
                "Comment équilibrer étude et vie perso ?",
                "Les parents comprennent pas mon stress, comment leur expliquer ?",
                "Pourquoi je suis tout le temps de mauvaise humeur ?",
                "Les amis influencent vraiment notre santé mentale ?",
                "Comment gérer la tristesse sans raison ?",
                "Les relations toxiques, c'est comment on s'en sort ?",
                "J'ai peur du futur, que faire ?",
                "Comment savoir si j'ai besoin de voir un psy ?",
                "Je n'aime pas parler de mes problèmes, c'est grave ?",
                "Pourquoi j'ai du mal à me concentrer en cours ?",
                "Les réseaux sociaux, ça rend dépressif ?",
                "Quand aller chercher de l'aide psychologique ?",

                // Arabic
                "ما هي علامات الاكتئاب عند الشباب؟",
                "كيف أساعد صديق مكتئب؟",
                "فوايد الرياضة على الصحة النفسية، شو هي؟",
                "هل التأمل مفيد للتخفيف من التوتر؟",
                "ليش أشعر بالتعب طوال الوقت؟",
                "هل وسائل التواصل الاجتماعي تؤثر سلباً على الصحة النفسية؟",
                "كيف أتعامل مع ضغط الدراسة؟",
                "مشاكل النوم عندي بتأثر على صحتي، هل هذا طبيعي؟",
                "كيف أتعامل مع المشاكل مع الوالدين؟",
                "الخوف من الاحتراق الوظيفي، كيف أتعامل معه؟",
                "كيف أتحسن في النوم؟",
                "لما أكون مضغوط أكل كتير، هل هذا طبيعي؟",
                "عندي خوف من التحدث أمام الناس، كيف أواجه هذا؟",
                "هل أدوية القلق خطيرة؟",
                "الخجل يؤثر على حياتي الاجتماعية، ماذا أفعل؟",
                "لماذا أكون متوتر قبل الامتحانات؟",
                "الألعاب الإلكترونية، هل تسبب الإدمان؟",
                "بعاني من الأرق، شو الحل؟",
                "أنا حزين بدون سبب، هل هذا طبيعي؟",
                "كيف أوازن بين الدراسة والحياة الشخصية؟",
                "كيف أشرح للوالدين ضغطي؟",
                "لماذا أنا دائمًا عابس؟",
                "هل الأصدقاء يؤثرون على صحتنا النفسية؟",
                "كيف أتعامل مع الحزن الغير مسبب؟",
                "كيف أخرج من العلاقات السامة؟",
                "الخوف من المستقبل، كيف أتعامل معه؟",
                "كيف أقرر إذا كنت بحاجة لاستشارة طبيب نفسي؟",
                "أنا مش بحب أحكي عن مشاكلي، هل هذا خطأ؟",
                "لماذا أجد صعوبة في التركيز في الدروس؟",
                "وسائل التواصل الاجتماعي، هل تسبب الاكتئاب؟",
                "متى يجب عليّ طلب المساعد"
            ]
        }
    };

    try {
        const response = await axios(config);
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

sendQuestionsRequest();
