import { Router } from 'express';
import { UserController } from '../../application/interfaces/http/controllers/UserController';
import { ensureAdmin } from '../../application/middleware/ensureAdmin';
import { ensureAuthenticated } from '../../application/middleware/ensureAuthenticated';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   patch:
 *     summary: Update an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 *       400:
 *         description: Bad request
 */

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', ensureAuthenticated, userController.create);
userRoutes.get('/users', ensureAuthenticated, userController.list);
userRoutes.get('/users/:userId', ensureAuthenticated, userController.findById);
userRoutes.patch('/users/:userId', ensureAuthenticated, userController.update);
userRoutes.delete('/users/:userId', ensureAuthenticated, ensureAdmin, userController.delete);

export { userRoutes };
