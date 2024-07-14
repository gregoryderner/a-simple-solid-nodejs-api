import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { ensureAuthenticated } from '../application/middleware/ensureAuthenticated';
import { authRoutes } from '../presentation/routes/authRoutes';
import { userRoutes } from '../presentation/routes/userRoutes';
import { swaggerDocs } from './config/swagger';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/api', authRoutes);
app.use('/api', ensureAuthenticated, userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
