import { Configuration, OpenAIApi } from "openai";

// Load API key from environment
const openai = new OpenAIApi(
new Configuration({
apiKey: process.env.OPENAI_API_KEY,
})
);

export default async function handler(req, res) {
if (req.method !== "POST") {
res.setHeader("Allow", ["POST"]);
return res.status(405).end(`Method ${req.method} Not Allowed`);
}

const { prompt, host = "SmokeStream" } = req.body;

try {
// TODO: Make persona/prompt more dynamic based on host/user
const completion = await openai.createChatCompletion({
model: "gpt-3.5-turbo",
messages: [
{ role: "system", content: `You are ${host}, an AI host for a digital lounge—your vibe and mood shape the response experience.` },
{ role: "user", content: prompt }
]
});
const reply = completion.data.choices[0].message.content.trim();
res.status(200).json({ reply });
} catch (error) {
res.status(500).json({ error: error.message || "AI host is… glitched out." });
}
}
