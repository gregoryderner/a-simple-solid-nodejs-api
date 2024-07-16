import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  return next();
}
