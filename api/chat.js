export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const keys = [
    process.env.GROQ_KEY_1,
    process.env.GROQ_KEY_2,
    process.env.GROQ_KEY_3,
    process.env.GROQ_KEY_4,
  ];

  const { messages, model } = req.body;

  for (const key of keys) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({ model, messages, max_tokens: 1500, temperature: 0.7 })
      });
      if (response.status === 429) continue;
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) { continue; }
  }

  res.status(429).json({ error: 'All keys rate limited' });
}
