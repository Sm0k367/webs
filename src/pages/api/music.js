import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
// GET: List live music jams
if (req.method === "GET") {
const jams = await prisma.jam.findMany({
where: { type: "music" },
orderBy: { createdAt: "desc" },
take: 25,
});
return res.status(200).json(jams);
}

// POST: Create a new music jam session
if (req.method === "POST") {
const { userId, data } = req.body;
if (!userId) return res.status(400).json({ error: "Missing userId." });

const jam = await prisma.jam.create({
data: {
type: "music",
userId,
data,
},
});
return res.status(201).json(jam);
}

res.setHeader("Allow", ["GET", "POST"]);
res.status(405).end(`Method ${req.method} Not Allowed`);
}
