import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // WARNING: Remove or protect this endpoint in production!
  const users = await prisma.userVerification.findMany();
  res.status(200).json(users);
}
