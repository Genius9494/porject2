// pages/api/comments/[gameId].ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  const { gameId } = req.query;

  const comments = await prisma.comment.findMany({
    where: { gameId: String(gameId), parentId: null },
    include: {
      user: true,
      replies: {
        include: { user: true },
      },
    },
  });

  res.json(comments);
}
