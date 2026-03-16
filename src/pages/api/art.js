import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
// GET: List art jams/canvases
if (req.method === "GET") {
const jams = await prisma.jam.findMany({
where: { type: "art" },
orderBy: { createdAt: "desc" },
take: 25,
});
return res.status(200).json(jams);
}

// POST: Create a new art canvas/jam
if (req.method === "POST") {
const { userId, data } = req.body;
if (!userId) return res.status(400).json({ error: "Missing userId." });

const jam = await prisma.jam.create({
data: {
type: "art",
userId,
data,
},
});
return res.status(201).json(jam);
}

res.setHeader("Allow", ["GET", "POST"]);
res.status(405).end(`Method ${req.method} Not Allowed`);
}
