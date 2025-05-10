import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const pending = await prisma.userVerification.findMany({
    where: { verified: false },
    select: { discordId: true, discordUsername: true, rainUsername: true },
  });
  res.status(200).json(pending);
}
