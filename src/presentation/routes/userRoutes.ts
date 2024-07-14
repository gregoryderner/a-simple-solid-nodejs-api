import { Router } from 'express';
import { UserController } from '../../application/interfaces/http/controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', userController.create);

export { userRoutes };
