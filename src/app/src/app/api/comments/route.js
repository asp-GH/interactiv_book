import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const grok = new OpenAI({
  apiKey: process.env.GROK_API_KEY!,
  baseURL: 'https://api.x.ai/v1'
});

export async function POST(req: NextRequest) {
  const { chapter, adult } = await req.json();

  const prompt = chapter >= 5
    ? `Читатель только что дочитал сцену убийства старухи в "Преступлении и наказании".
${adult ? 'Режим 18+: без цензуры, жёстко, честно.' : ''}
Напиши 3–4 короткие реплики от Раскольникова, Сони, Порфирия или старухи — в первом лице, как будто они говорят прямо читателю сейчас.`
    : `Читатель на главе ${chapter + 1}. Напиши 2–3 реплики от персонажей, которые уже появились. ${adult ? 'Без цензуры.' : ''}`;

  const completion = await grok.chat.completions.create({
    model: 'grok-2-1212',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.9,
    max_tokens: 300
  });

  const text = completion.choices[0].message.content || '';
  const comments = text.split('\n').filter(line => line.trim().length > 10);

  return Response.json({ comments });
}
