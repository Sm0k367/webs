import { useEffect, useState } from "react";
import { usePortalSocket } from "../hooks/usePortalSocket";

const QUESTIONS = [
{
q: "Which programming language was the first to use curly braces?",
a: "C",
choices: ["Python", "C", "Lisp", "Ruby"],
},
{
q: "Who created the World Wide Web?",
a: "Tim Berners-Lee",
choices: ["Linus Torvalds", "Elon Musk", "Tim Berners-Lee", "Ada Lovelace"],
},
{
q: "What planet is known as the Red Planet?",
a: "Mars",
choices: ["Venus", "Mars", "Jupiter", "Saturn"],
},
];

export default function MicroTrivia({ portalId, user }) {
const { sendAction, action } = usePortalSocket(portalId, user);
const [current, setCurrent] = useState(0);
const [answer, setAnswer] = useState("");
const [lock, setLock] = useState(false);
const [scores, setScores] = useState({});

// Broadcast and sync answers/scores
useEffect(() => {
if (action && action.type === "trivia-answer") {
setScores((prev) => ({
...prev,
[action.from]: (prev[action.from] || 0) + (action.correct ? 1 : 0),
}));
setLock(true);
setTimeout(() => {
setCurrent((idx) => (idx + 1) % QUESTIONS.length);
setLock(false);
setAnswer("");
}, 1600);
}
}, [action]);

function submit(choice) {
if (lock) return;
setAnswer(choice);
const correct = choice === QUESTIONS[current].a;
sendAction({
type: "trivia-answer",
from: user.name,
answer: choice,
correct,
});
}

return (
<div className="p-4 bg-yellow-950 bg-opacity-70 rounded-lg border-2 border-yellow-400 mb-2">
<h4 className="text-xl font-bold mb-2 text-yellow-300">MicroTrivia 🧠</h4>
<div className="text-yellow-100 mb-2 font-mono">{QUESTIONS[current].q}</div>
<div className="flex flex-col gap-1 mb-3">
{QUESTIONS[current].choices.map((c) => (
<button
key={c}
disabled={lock}
className={`btn ${answer === c ? "bg-yellow-500" : "bg-yellow-700"}`}
onClick={() => submit(c)}
>
{c}
</button>
))}
</div>
<div className="text-yellow-200 mt-2 font-mono">Scores:</div>
<div className="flex gap-2 flex-wrap">
{Object.entries(scores).map(([name, score]) => (
<span key={name} className="bg-yellow-600 rounded px-2">{name}: {score}</span>
))}
</div>
</div>
);
}
