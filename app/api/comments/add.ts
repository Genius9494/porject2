// pages/api/comments/add.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { content, userId, gameId, parentId } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        user: { connect: { id: userId } },
        game: { connect: { id: gameId } },
        ...(parentId && { parent: { connect: { id: parentId } } }),
      },
    });

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطأ أثناء إضافة التعليق" });
  }
}
