import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  sub: string;
  role: string;
}

const prisma = new PrismaClient();

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'JWT token is missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    const { sub, role } = decoded;

    req.userId = sub;
    req.userRole = role;

    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid JWT token' });
  }
}
