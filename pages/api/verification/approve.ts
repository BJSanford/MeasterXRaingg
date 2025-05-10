import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { discordId } = req.body;
  await prisma.userVerification.update({
    where: { discordId },
    data: { verified: true },
  });
  res.status(200).json({ success: true });
}
